import { Op } from "sequelize"
import db from "../models"
import { getImageUrl } from "../../../helper/imageHelper"

export async function createNewsDetail(req, res) {
    const { product_id, news_id } = req.body
    const product = await db.Product.findByPk(product_id);
    if (!product) {
        return res.status(400).json({
            success: false,
            message: `Sản phẩm không tồn tại!`
        });
    }

    const news = await db.News.findByPk(news_id);
    if (!news) {
        return res.status(400).json({
            success: false,
            message: `Bài viết tin tức không tồn tại!`
        });
    }

    const existingDetail = await db.NewsDetail.findOne({
        where: {
            product_id,
            news_id,
        },
    });

    if (existingDetail) {
        return res.status(409).json({
            success: false,
            message: `Mối quan hệ giữa sản phẩm và tin tức đã tồn tại!`
        });
    }

    const newsDetail = await db.NewsDetail.create({ product_id, news_id });

    res.status(200).json({
        success: true,
        message: 'Tạo chi tiết tin tức thành công!',
        data: newsDetail,
    });
}

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
                    attributes: ['id', 'name', 'image', 'price'],
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
        message: 'Lấy danh sách chi tiết tin tức thành công!',
        data: newsDetails,
        count: newsDetails.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getNewsDetailById(req, res) {
    const { id } = req.params;

    const newsDetail = await db.NewsDetail.findByPk(id, {
        include: [
            {
                model: db.Product,
                attributes: ['id', 'name', 'image', 'price'],
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
            message: 'Chi tiết tin tức không tồn tại!',
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: 'Lấy chi tiết tin tức theo ID thành công!',
        data: newsDetail
    });
}

export async function updateNewsDetail(req, res) {
    const { id } = req.params
    const { product_id, news_id } = req.body

    const product = await db.Product.findByPk(product_id);
    if (!product) {
        return res.status(400).json({
            success: false,
            message: `Sản phẩm không tồn tại!`
        });
    }

    const news = await db.News.findByPk(news_id);
    if (!news) {
        return res.status(400).json({
            success: false,
            message: `Bài viết tin tức không tồn tại!`
        });
    }

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
            message: 'Mối quan hệ giữa sản phẩm và tin tức đã tồn tại.',
        })
    }

    const [affectedRows] = await db.NewsDetail.update({ product_id, news_id }, {
        where: { id }
    })

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Chi tiết tin tức không tồn tại!' });
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật chi tiết tin tức thành công!',
    })
}

export async function deleteNewsDetail(req, res) {
    const { id } = req.params
    const deleted = await db.NewsDetail.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            message: 'Chi tiết tin tức không tồn tại!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Xóa chi tiết tin tức thành công!',
    });
}
