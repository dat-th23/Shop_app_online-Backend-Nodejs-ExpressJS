import { Op, Sequelize } from "sequelize"
import db from "../models"
// import { getImageUrl } from "../../../helper/imageHelper"

export async function createBrand(req, res) {
    const { name } = req.body
    const existingBrand = await db.Brand.findOne({
        where: {
            name: name.trim()
        }
    })

    if (existingBrand) {
        return res.status(409).json({
            success: false,
            message: 'Tên thương hiệu đã tồn tại, vui lòng lựa chọn tên khác!'
        })
    }

    const brand = await db.Brand.create(req.body)
    res.status(200).json({
        success: true,
        message: 'Tạo thương hiệu thành công!',
        data: brand,
    })
}

export async function getAllBrands(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
        ]
    }

    const [total, brands] = await Promise.all([
        db.Brand.count({ where: whereCondition }),
        db.Brand.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Lấy danh sách thương hiệu thành công!',
        data: brands,
        count: brands.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getBrandById(req, res) {
    const { id } = req.params
    const brand = await db.Brand.findByPk(id)
    if (!brand) {
        return res.status(404).json({
            message: 'Thương hiệu không tồn tại!',
            data: brand
        })
    }
    res.status(200).json({
        success: true,
        message: 'Lấy thương hiệu theo ID thành công!',
        data: brand
    })
}

export async function updateBrand(req, res) {
    const { id } = req.params;
    const { name } = req.body

    if (name && name != undefined) {
        const existingBrand = await db.Brand.findOne({
            where: {
                name: name,
                id: { [Sequelize.Op.ne]: id }
            }
        })

        if (existingBrand) {
            return res.status(409).json({
                success: false,
                message: 'Tên thương hiệu đã tồn tại, vui lòng lựa chọn tên khác!'
            })
        }
    }

    const [affectedRows] = await db.Brand.update(req.body, { where: { id } });

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Thương hiệu không tồn tại!' });
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật thương hiệu thành công!',
    });
}

export async function deleteBrand(req, res) {
    const { id } = req.params;
    const deleted = await db.Brand.destroy({ where: { id } });

    if (!deleted) {
        return res.status(404).json({
            message: 'Thương hiệu không tồn tại!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Xóa thương hiệu thành công!',
    });
}
