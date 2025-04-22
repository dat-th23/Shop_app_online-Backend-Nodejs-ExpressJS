import { Op } from "sequelize"
import db from "../models"

// Get all NewsDetail records with optional pagination and search
export async function getAllNewsDetails(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const [total, newsDetails] = await Promise.all([
        db.NewsDetail.count(),
        db.NewsDetail.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['news_id', 'ASC']],
            include: [
                {
                    model: db.Product,
                    attributes: ['id', 'name', 'image', 'price'], // chọn trường cần lấy
                },
                {
                    model: db.News,
                    attributes: ['id', 'title', 'content'],
                }
            ]
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Get news detail list successfully!',
        data: newsDetails,
        count: newsDetails.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

// Get a NewsDetail by its ID (composite key not supported by default, this assumes an auto-incremented ID exists)
export async function getNewsDetailById(req, res) {
    const { id } = req.params;

    const newsDetail = await db.NewsDetail.findByPk(id, {
        include: [
            {
                model: db.Product,
                attributes: ['id', 'name', 'image', 'price'], // chọn trường cần lấy
            },
            {
                model: db.News,
                attributes: ['id', 'title', 'content'],
            }
        ]
    });

    if (!newsDetail) {
        return res.status(404).json({
            success: false,
            message: 'News detail not found!',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: 'Get news detail by id successfully!',
        data: newsDetail
    });
}


// Create a NewsDetail
export async function createNewsDetail(req, res) {
    const { product_id, news_id } = req.body
    // Check if product exists
    const product = await db.Product.findByPk(product_id);
    if (!product) {
        return res.status(400).json({
            success: false,
            message: `Product does not exist!`
        });
    }

    // Check if news article exists
    const news = await db.News.findByPk(news_id);
    if (!news) {
        return res.status(400).json({
            success: false,
            message: `News article does not exist!`
        });
    }

    // Check for duplicate entry
    const existingDetail = await db.NewsDetail.findOne({
        where: {
            product_id,
            news_id,
        },
    });

    if (existingDetail) {
        return res.status(409).json({
            success: false,
            message: `The relationship between product and news already exists!`
        });
    }

    // Create NewsDetail entry
    const newsDetail = await db.NewsDetail.create({ product_id, news_id });

    res.status(200).json({
        success: true,
        message: 'Created news detail successfully!',
        data: newsDetail,
    });
}

// Delete a NewsDetail (id)
export async function deleteNewsDetail(req, res) {
    const { id } = req.params
    const deleted = await db.NewsDetail.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            message: 'News detail not found!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Deleted news detail successfully!',
    });
}

export async function updateNewsDetail(req, res) {
    const { id } = req.params
    const { product_id, news_id } = req.body

    // Check if product exists
    const product = await db.Product.findByPk(product_id);
    if (!product) {
        return res.status(400).json({
            success: false,
            message: `Product does not exist!`
        });
    }

    // Check if news article exists
    const news = await db.News.findByPk(news_id);
    if (!news) {
        return res.status(400).json({
            success: false,
            message: `News article does not exist!`
        });
    }

    // check for existing duplicate that is not the current record  
    const existing = await db.NewsDetail.findOne({
        where: {
            product_id,
            news_id,
            id: { [Op.ne]: id },
        }
    })

    if (existing) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate product_id and news_id combination already exists.',
        })
    }

    const [affectedRows] = await db.NewsDetail.update({ product_id, news_id }, {
        where: { id }
    })

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'News detail not found!' });
    }

    res.status(200).json({
        success: true,
        message: 'Updated news detail successfully!',
    })
}
