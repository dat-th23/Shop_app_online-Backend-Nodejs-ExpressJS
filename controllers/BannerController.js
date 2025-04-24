import { Op } from "sequelize"
import db from "../models"

// Create a banner
export async function createBanner(req, res) {
    const transaction = await db.sequelize.transaction()

    try {
        // Tạo banner
        const banner = await db.Banner.create(req.body, { transaction })

        let product_ids = req.body.product_ids

        if (product_ids && product_ids.length) {
            // Lọc ra các product_id hợp lệ
            const validProducts = await db.Product.findAll({
                where: { id: product_ids },
                transaction
            })

            const validProductIds = validProducts.map(p => p.id)

            // Lọc các ID không tồn tại trong DB
            product_ids = product_ids.filter(id => validProductIds.includes(id))

            // Tạo các bản ghi liên kết trong BannerDetail
            const bannerDetailPromises = product_ids.map(product_id => {
                return db.BannerDetail.create({
                    product_id: product_id,
                    banner_id: banner.id
                }, { transaction })
            })

            await Promise.all(bannerDetailPromises)
        }

        await transaction.commit()

        res.status(201).json({
            success: true,
            message: 'Created banner successfully!',
            data: banner
        })
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({
            success: false,
            message: 'Failed to create banner!',
            error: error.message
        })
    }
}

// Get all banners with optional search and pagination
export async function getAllBanners(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
        ]
    }

    const [total, banners] = await Promise.all([
        db.Banner.count({ where: whereCondition }),
        db.Banner.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Get banner list successfully!',
        data: banners,
        count: banners.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

// Get banner by id
export async function getBannerById(req, res) {
    const { id } = req.params
    const banner = await db.Banner.findByPk(id)

    if (!banner) {
        return res.status(404).json({
            message: 'Banner not found!',
        })
    }

    res.status(200).json({
        success: true,
        message: 'Get banner by id successfully!',
        data: banner
    })
}

// Update banner
export async function updateBanner(req, res) {
    const { id } = req.params

    const [affectedRows] = await db.Banner.update(req.body, {
        where: { id }
    })

    if (affectedRows === 0) {
        return res.status(404).json({
            message: 'Banner not found!'
        })
    }

    const updatedBanner = await db.Banner.findByPk(id)

    res.status(200).json({
        success: true,
        message: 'Updated banner successfully!',
        data: updatedBanner
    })
}

// Delete banner
export async function deleteBanner(req, res) {
    const { id } = req.params
    const transaction = await db.sequelize.transaction()

    try {
        // Xoá các bản ghi liên quan trong bảng BannerDetail
        await db.BannerDetail.destroy({
            where: { banner_id: id },
            transaction
        })

        // Xoá banner chính
        const deleted = await db.Banner.destroy({
            where: { id },
            transaction
        })

        if (!deleted) {
            await transaction.rollback()
            return res.status(404).json({
                message: 'Banner not found!',
            })
        }

        await transaction.commit()

        res.status(200).json({
            success: true,
            message: 'Deleted banner successfully!',
        })
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({
            success: false,
            message: 'Failed to delete banner!',
            error: error.message
        })
    }
}

