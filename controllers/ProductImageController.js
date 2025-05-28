import { getImageUrl } from "../helper/imageHelper"
import { formatPaginatedResponse } from "../helper/responseHelper"
import db from "../models"

export async function createProductImage(req, res) {
    const { product_id, image_url } = req.body
    const existingProImg = await db.ProductImage.findOne({
        where: {
            product_id: product_id,
            image_url: image_url
        }
    })

    if (existingProImg) {
        return res.status(409).json({
            success: false,
            message: 'Mối quan hệ giữa sản phẩm và hình ảnh sản phẩm đã tồn tại!'
        })
    }

    const productImage = await db.ProductImage.create(req.body)

    res.status(200).json({
        success: true,
        message: 'Thêm ảnh sản phẩm thành công!',
        data: {
            ...productImage.get({ plain: true }),
            image_url: getImageUrl(productImage.image_url)
        }
    })
}

export async function getAllProductImages(req, res) {
    const { product_id } = req.query
    const page = parseInt(req.query.page ?? '1', 10)
    const limit = parseInt(req.query.limit ?? '10', 10)
    const offset = (page - 1) * limit

    const whereCondition = {}

    if (product_id) {
        whereCondition.product_id = product_id
    }

    const { count, rows } = await db.ProductImage.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: offset,
        order: [['created_at', 'desc']]
    })

    res.status(200).json(formatPaginatedResponse(page, limit, count, rows))
}

export async function getProductImageById(req, res) {
    const { id } = req.params
    const productImage = await db.ProductImage.findByPk(id)

    if (!productImage) {
        return res.status(404).json({
            message: 'Ảnh sản phẩm không tồn tại!',
            data: null
        })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy thông tin ảnh sản phẩm thành công!',
        data: {
            ...productImage.get({ plain: true }),
            image_url: getImageUrl(productImage.image_url)
        }
    })
}

export async function deleteProductImage(req, res) {
    const { id } = req.params
    const deleted = await db.ProductImage.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Ảnh không tồn tại!'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Xóa ảnh sản phẩm thành công!'
    })
}
