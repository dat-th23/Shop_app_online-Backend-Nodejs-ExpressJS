import { Op } from "sequelize"
import db from "../models"
import { getImageUrl } from "../helper/imageHelper"
import { formatPaginatedResponse } from "../helper/responseHelper"

export async function createNewsArticle(req, res) {
    const transaction = await db.sequelize.transaction()

    try {
        const { title } = req.body
        const existingNews = await db.News.findOne({
            where: {
                title: title.trim()
            }
        })

        if (existingNews) {
            return res.status(409).json({
                success: false,
                message: 'Tiêu đề bài báo đã tồn tại, vui lòng lựa chọn tiêu đề khác!'
            })
        }
        // Create the news article
        const newsArticle = await db.News.create(req.body, { transaction })

        let product_ids = req.body.product_ids

        if (product_ids && product_ids.length) {
            // Get all valid product IDs from the database
            const validProducts = await db.Product.findAll({
                where: { id: product_ids },
                transaction
            })

            const validProductIds = validProducts.map(p => p.id)

            // Filter out product_ids that don't exist
            product_ids = product_ids.filter(id => validProductIds.includes(id))

            // Create NewsDetail entries for only the valid product IDs
            const newsDetailPromises = product_ids.map(product_id => {
                return db.NewsDetail.create({
                    product_id: product_id,
                    news_id: newsArticle.id
                }, { transaction })
            })

            await Promise.all(newsDetailPromises)
        }

        await transaction.commit()

        res.status(201).json({
            success: true,
            message: 'Tạo bài báo thành công!',
            data: {
                ...newsArticle.get({ plain: true }),
                image: getImageUrl(newsArticle.image)
            }
        })
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({
            success: false,
            message: 'Không thể tạo bài báo!',
            error: error.message
        })
    }
}

export async function getAllNewsArticles(req, res) {
    const { search = '' } = req.query
    const page = parseInt(req.query.page ?? '1', 10)
    const limit = parseInt(req.query.limit ?? '10', 10)
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { content: { [Op.like]: `%${search}%` } },
        ]
    }

    const { count, rows } = await db.News.findAndCountAll({
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

export async function getNewsArticleById(req, res) {
    const { id } = req.params
    const newsArticle = await db.News.findByPk(id)

    if (!newsArticle) {
        return res.status(404).json({
            message: 'Bài báo không tồn tại!',
            data: newsArticle
        })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy bài báo theo ID thành công!',
        data: {
            ...newsArticle.get({ plain: true }),
            image: getImageUrl(newsArticle.image)
        }
    })
}

export async function updateNewsArticle(req, res) {
    const { id } = req.params
    const { title } = req.body
    const existingNews = await db.News.findOne({
        where: {
            title: title.trim()
        }
    })

    if (existingNews) {
        return res.status(409).json({
            success: false,
            message: 'Tiêu đề bài báo đã tồn tại, vui lòng lựa chọn tiêu đề khác!'
        })
    }

    const [affectedRows] = await db.News.update(req.body, { where: { id } })

    if (affectedRows === 0) {
        return res.status(404).json({
            message: 'Bài báo không tồn tại!'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật bài báo thành công!',
    })
}

export async function deleteNewsArticle(req, res) {
    const { id } = req.params
    const transaction = await db.sequelize.transaction()

    try {
        // deleted record relate to news_id before news 
        await db.NewsDetail.destroy({
            where: { news_id: id },
            transaction: transaction
        })

        const deleted = await db.News.destroy({
            where: { id },
            transaction: transaction
        })

        if (!deleted) {
            await transaction.rollback()
            return res.status(404).json({
                message: 'Bài báo không tồn tại!',
            })
        }

        await transaction.commit()

        res.status(200).json({
            success: true,
            message: 'Xóa bài báo thành công!',
        })
    } catch (error) {
        await transaction.rollback()
        res.status(500).json({
            success: false,
            message: 'Không thể xóa bài báo!',
            error: error.message
        })
    }
}
