import { Op } from "sequelize"
import db from "../models"
import { getImageUrl } from "../../../helper/imageHelper"

export async function getAllBannerDetails(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const [total, bannerDetails] = await Promise.all([
        db.BannerDetail.count(),
        db.BannerDetail.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['banner_id', 'ASC']],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'image', 'price'],
                },
                {
                    model: db.Banner,
                    attributes: ['id', 'name', 'image', 'status'],
                }
            ]
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Lấy danh sách chi tiết banner thành công!',
        data: bannerDetails,
        count: bannerDetails.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getBannerDetailById(req, res) {
    const { id } = req.params;

    const bannerDetail = await db.BannerDetail.findByPk(id, {
        include: [
            {
                model: db.Product,
                attributes: ['id', 'name', 'image', 'price'],
            },
            {
                model: db.Banner,
                attributes: ['id', 'name', 'image', 'status'],
            }
        ]
    });

    if (!bannerDetail) {
        return res.status(404).json({
            success: false,
            message: 'Chi tiết banner không tồn tại!',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: 'Lấy chi tiết banner theo ID thành công!',
        data: bannerDetail
    });
}

export async function createBannerDetail(req, res) {
    const { product_id, banner_id } = req.body

    const product = await db.Product.findByPk(product_id)
    if (!product) {
        return res.status(400).json({
            success: false,
            message: 'Sản phẩm không tồn tại!'
        });
    }

    const banner = await db.Banner.findByPk(banner_id)
    if (!banner) {
        return res.status(400).json({
            success: false,
            message: 'Banner không tồn tại!'
        });
    }

    const existing = await db.BannerDetail.findOne({
        where: {
            product_id,
            banner_id,
        },
    })

    if (existing) {
        return res.status(409).json({
            success: false,
            message: 'Mối quan hệ giữa sản phẩm và banner đã tồn tại!'
        });
    }

    const bannerDetail = await db.BannerDetail.create({ product_id, banner_id })

    res.status(200).json({
        success: true,
        message: 'Tạo chi tiết banner thành công!',
        data: bannerDetail,
    })
}

export async function updateBannerDetail(req, res) {
    const { id } = req.params
    const { product_id, banner_id } = req.body

    const product = await db.Product.findByPk(product_id)
    if (!product) {
        return res.status(400).json({
            success: false,
            message: 'Sản phẩm không tồn tại!'
        });
    }

    const banner = await db.Banner.findByPk(banner_id)
    if (!banner) {
        return res.status(400).json({
            success: false,
            message: 'Banner không tồn tại!'
        });
    }

    const existing = await db.BannerDetail.findOne({
        where: {
            product_id,
            banner_id,
            id: { [Op.ne]: id }
        }
    })

    if (existing) {
        return res.status(400).json({
            success: false,
            message: 'Mối quan hệ giữa sản phẩm và banner đã tồn tại.',
        })
    }

    const [affectedRows] = await db.BannerDetail.update({ product_id, banner_id }, {
        where: { id }
    })

    if (affectedRows === 0) {
        return res.status(404).json({
            message: 'Chi tiết banner không tồn tại!'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật chi tiết banner thành công!',
    })
}

export async function deleteBannerDetail(req, res) {
    const { id } = req.params

    const deleted = await db.BannerDetail.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            message: 'Chi tiết banner không tồn tại!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Xóa chi tiết banner thành công!',
    })
}
