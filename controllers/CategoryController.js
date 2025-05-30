import { Op, Sequelize } from "sequelize"
import db from "../models"
import { getImageUrl } from "../helper/imageHelper"
import { formatPaginatedResponse } from "../helper/responseHelper"

export async function createCategory(req, res) {
    const { name } = req.body
    const existingCategory = await db.Category.findOne({
        where: {
            name: name.trim()
        }
    })

    if (existingCategory) {
        return res.status(409).json({
            success: false,
            message: 'Tên danh mục đã tồn tại, vui lòng lựa chọn tên khác!'
        })
    }

    const category = await db.Category.create(req.body)
    res.status(200).json({
        success: true,
        message: 'Tạo danh mục thành công!',
        data: {
            ...category.get({ plain: true }),
            image: getImageUrl(category.image)
        },
    })
}

export async function getAllCategories(req, res) {
    const { search = '' } = req.query
    const page = parseInt(req.query.page ?? '1', 10)
    const limit = parseInt(req.query.limit ?? '10', 10)
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
        ]
    }

    const { count, rows } = await db.Category.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: offset,
        order: [['created_at', 'desc']]
    })

    res.status(200).json(formatPaginatedResponse(
        page,
        limit,
        count,
        rows?.map(item => ({
            ...item.get({ plain: true }),
            image: getImageUrl(item.image)
        }))
    ))
}

export async function getCategoryById(req, res) {
    const { id } = req.params
    const category = await db.Category.findByPk(id)
    if (!category) {
        return res.status(404).json({
            message: 'Danh mục không tồn tại!',
            data: category
        })
    }
    res.status(200).json({
        success: true,
        message: 'Lấy danh mục theo ID thành công!',
        data: {
            ...category.get({ plain: true }),
            image: getImageUrl(category.image)
        },
    })
}

export async function updateCategory(req, res) {
    const { id } = req.params
    const { name } = req.body

    if (name && name != undefined) {
        const existingCategory = await db.Category.findOne({
            where: {
                name: name,
                id: { [Sequelize.Op.ne]: id }
            }
        })

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Tên danh mục đã tồn tại, vui lòng lựa chọn tên khác!'
            })
        }
    }

    console.log('req', req.body)

    const [affectedRows] = await db.Category.update(req.body, { where: { id } })

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Danh mục không tồn tại!' })
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật danh mục thành công!',
    })
}

export async function deleteCategory(req, res) {
    const { id } = req.params
    const deleted = await db.Category.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            message: 'Danh mục không tồn tại!',
        })
    }

    res.status(200).json({
        success: true,
        message: 'Xóa danh mục thành công!',
    })
}