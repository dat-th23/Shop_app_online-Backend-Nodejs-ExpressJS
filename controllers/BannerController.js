import { Op, Sequelize } from "sequelize"
import db from "../models"
import { BannerStatus } from "../constants"
import { getImageUrl } from "../helper/imageHelper"
import { formatPaginatedResponse } from "../helper/responseHelper"

export async function createBanner(req, res) {
    const { name } = req.body

    const existingBanner = await db.Banner.findOne(
        {
            where: {
                name: name.trim()
            }
        }
    )
    if (existingBanner) {
        return res.status(409).json({
            success: false,
            message: 'Tên banner đã tồn tại, vui lòng lựa chọn tên khác!'
        })
    }

    const bannerData = {
        ...req.body,
        status: BannerStatus.ACTIVE
    }

    const banner = await db.Banner.create(bannerData)

    res.status(201).json({
        success: true,
        message: 'Tạo mới banner thành công!',
        data: {
            ...banner.get({ plain: true }),
            image: getImageUrl(banner.image)
        }
    })
}

export async function getAllBanners(req, res) {
    const { search = '' } = req.query
    const page = parseInt(req.query.page ?? '1', 10)
    const limit = parseInt(req.query.limit ?? '10', 10)
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
        ]
    }

    const { count, rows } = await db.Banner.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: offset,
        order: [['created_at', 'desc']]
    })

    res.status(200).json(formatPaginatedResponse(page, limit, count, rows));
}

export async function getBannerById(req, res) {
    const { id } = req.params
    const banner = await db.Banner.findByPk(id)

    if (!banner) {
        return res.status(404).json({
            message: 'Không tìm thấy được banner!',
        })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy banner thành công!',
        data: {
            ...banner.get({ plain: true }),
            image: getImageUrl(banner.image)
        }
    })
}

export async function updateBanner(req, res) {
    const { id } = req.params
    const { name } = req.body

    const existingBanner = await db.Banner.findOne({
        where: {
            name: name,
            id: { [Sequelize.Op.ne]: id }
        }
    })

    if (existingBanner) {
        return res.status(409).json({
            success: false,
            message: 'Tên banner đã tồn tại, vui lòng lựa chọn tên khác!'
        })
    }

    const [affectedRows] = await db.Banner.update(req.body, {
        where: { id }
    })

    if (affectedRows === 0) {
        return res.status(404).json({
            message: 'Không tìm thấy được banner!',
        })
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật banner thành công!',
    })
}

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
                message: 'Không tìm thấy được banner!',
            })
        }

        await transaction.commit()

        res.status(200).json({
            success: true,
            message: 'Xoá banner thành công!',
        })
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xoá banner!',
            error: error.message
        })
    }
}

