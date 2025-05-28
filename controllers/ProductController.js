import { Op, Sequelize } from "sequelize"
import db from "../models"
import { getImageUrl } from "../helper/imageHelper"
import { formatPaginatedResponse } from "../helper/responseHelper"

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
        data: {
            ...product.get({ plain: true }),
            image: getImageUrl(product.image)
        },
    })
}

export async function getAllProducts(req, res) {
    const { search = '' } = req.query
    const page = parseInt(req.query.page ?? '1', 10)
    const limit = parseInt(req.query.limit ?? '10', 10)
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { specification: { [Op.like]: `%${search}%` } },
        ]
    }

    const { count, rows } = await db.Product.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: offset,
        include: [
            {
                model: db.ProductImage,
                as: 'product_images'
            },
            { model: db.Brand },
            { model: db.Category }
        ],
        order: [['created_at', 'desc']]
    })

    res.status(200).json(formatPaginatedResponse(page, limit, count, rows))
}

export async function getProductById(req, res) {
    const { id } = req.params
    const product = await db.Product.findByPk(id, {
        include: [
            {
                model: db.ProductImage,
                as: 'product_images'
            },
            { model: db.Brand },
            { model: db.Category }
        ]
    });

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
        data: {
            ...product.get({ plain: true }),
            image: getImageUrl(product.image)
        },
    })
}

export async function updateProduct(req, res) {
    const { id } = req.params;
    const { name } = req.body
    if (name && name != undefined) {
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
