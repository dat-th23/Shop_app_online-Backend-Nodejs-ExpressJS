import { Op } from "sequelize"
import db from "../models"

// Get all BannerDetail records with optional pagination and search
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
        message: 'Get banner detail list successfully!',
        data: bannerDetails,
        count: bannerDetails.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

// Get BannerDetail by ID
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
            message: 'Banner detail not found!',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: 'Get banner detail by id successfully!',
        data: bannerDetail
    });
}

// Create BannerDetail
export async function createBannerDetail(req, res) {
    const { product_id, banner_id } = req.body

    // Check if product exists
    const product = await db.Product.findByPk(product_id)
    if (!product) {
        return res.status(400).json({
            success: false,
            message: 'Product does not exist!'
        });
    }

    // Check if banner exists
    const banner = await db.Banner.findByPk(banner_id)
    if (!banner) {
        return res.status(400).json({
            success: false,
            message: 'Banner does not exist!'
        });
    }

    // Check for duplicate
    const existing = await db.BannerDetail.findOne({
        where: {
            product_id,
            banner_id,
        },
    })

    if (existing) {
        return res.status(409).json({
            success: false,
            message: 'This product-banner relationship already exists!'
        });
    }

    const bannerDetail = await db.BannerDetail.create({ product_id, banner_id })

    res.status(200).json({
        success: true,
        message: 'Created banner detail successfully!',
        data: bannerDetail,
    })
}

// Update BannerDetail
export async function updateBannerDetail(req, res) {
    const { id } = req.params
    const { product_id, banner_id } = req.body

    const product = await db.Product.findByPk(product_id)
    if (!product) {
        return res.status(400).json({
            success: false,
            message: 'Product does not exist!'
        });
    }

    const banner = await db.Banner.findByPk(banner_id)
    if (!banner) {
        return res.status(400).json({
            success: false,
            message: 'Banner does not exist!'
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
            message: 'Duplicate product_id and banner_id combination already exists.',
        })
    }

    const [affectedRows] = await db.BannerDetail.update({ product_id, banner_id }, {
        where: { id }
    })

    if (affectedRows === 0) {
        return res.status(404).json({
            message: 'Banner detail not found!'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Updated banner detail successfully!',
    })
}

// Delete BannerDetail
export async function deleteBannerDetail(req, res) {
    const { id } = req.params

    const deleted = await db.BannerDetail.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            message: 'Banner detail not found!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Deleted banner detail successfully!',
    })
}
