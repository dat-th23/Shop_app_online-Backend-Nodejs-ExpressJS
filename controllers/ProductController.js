import { Op, Sequelize } from "sequelize"
import db from "../models"

export async function createProduct(req, res) {
    const { name } = req.body
    const existingProduct = await db.Product.findOne({
        where: {
            name: name.trim()
        }
    })
    if (existingProduct) {
        return res.status(409).json({
            success: false,
            message: 'Tên sản phẩm đã tồn tại, vui lòng lựa chọn tên khác!'
        })
    }

    const product = await db.Product.create(req.body)
    res.status(201).json({
        success: true,
        message: 'Tạo sản phẩm thành công!',
        data: product,
    })
}

export async function getAllProducts(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { specification: { [Op.like]: `%${search}%` } },
        ]
    }

    const [total, products] = await Promise.all([
        db.Product.count({ where: whereCondition }),
        db.Product.findAll({
            where: whereCondition,
            include: ['Brand', 'Category'],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Lấy danh sách sản phẩm thành công!',
        data: products,
        count: products.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getProductById(req, res) {
    const { id } = req.params
    const product = await db.Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Sản phẩm không tồn tại!',
            data: product
        })
    }
    res.status(200).json({
        success: true,
        message: 'Lấy sản phẩm theo ID thành công!',
        data: product,
    })
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const { name } = req.body
    const existingProduct = await db.Product.findOne({
        where: {
            name: name,
            id: { [Sequelize.Op.ne]: id }
        }
    })
    if (existingProduct) {
        return res.status(409).json({
            success: false,
            message: 'Tên sản phẩm đã tồn tại, vui lòng lựa chọn tên khác!'
        })
    }

    const [affectedRows] = await db.Product.update(req.body, { where: { id } });

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật sản phẩm thành công!',
    });
}

export async function deleteProduct(req, res) {
    const { id } = req.params
    const deleted = await db.Product.destroy({ where: { id } })
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Sản phẩm không tồn tại!',
        })
    }
    res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm thành công!',
    })
}
