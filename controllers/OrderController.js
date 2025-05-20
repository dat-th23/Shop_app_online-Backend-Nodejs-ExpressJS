import { Op } from "sequelize"
import db from "../models"

export async function createOrder(req, res) {
    const { user_id } = req.body
    const user = await db.User.findByPk(user_id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Người dùng không tồn tại!',
            data: user,
        })
    }

    const order = await db.Order.create(req.body)
    res.status(201).json({
        success: true,
        message: 'Tạo đơn hàng thành công!',
        data: order,
    })
}

export async function getAllOrders(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = { note: { [Op.like]: `%${search}%` } }

    const [total, orders] = await Promise.all([
        db.Order.count({ where: whereCondition }),
        db.Order.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['created_at', 'DESC']]
        })
    ])
    res.status(200).json({
        success: true,
        message: 'Lấy danh sách đơn hàng thành công!',
        data: orders,
        count: orders.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        }
    })
}

export async function getOrderById(req, res) {
    res.status(200).json({
        success: true,
        message: 'Lấy đơn hàng theo ID thành công!'
    })
}

export async function updateOrder(req, res) {
    const { id } = req.params;

    const [affectedRows] = await db.Order.update(req.body, { where: { id } });

    if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Đơn hàng không tồn tại!',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật đơn hàng thành công!',
    });
}

export async function deleteOrder(req, res) {
    const { id } = req.params
    const deleted = await db.Order.destroy({ where: { id } })
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Đơn hàng không tồn tại!',
        })
    }
    res.status(200).json({
        success: true,
        message: 'Xóa đơn hàng thành công!'
    })
}