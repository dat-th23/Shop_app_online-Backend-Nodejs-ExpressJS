import { Op } from "sequelize"
import db from "../models"
import { OrderStatus } from "../constants/orderStatus"
import { formatPaginatedResponse } from "../helper/responseHelper"

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
    const { search = '' } = req.query
    const page = parseInt(req.query.page ?? '1', 10)
    const limit = parseInt(req.query.limit ?? '10', 10)
    const offset = (page - 1) * limit

    const whereCondition = { note: { [Op.like]: `%${search}%` } }

    const { count, rows } = await db.Order.findAndCountAll({
        where: whereCondition,
        limit: limit,
        offset: offset,
        order: [['created_at', 'desc']]
    })

    res.status(200).json(formatPaginatedResponse(page, limit, count, rows))
}

export async function getOrderById(req, res) {
    const { id } = req.params

    const order = await db.Order.findByPk(id, {
        include: [{ model: db.OrderDetail, include: db.Product }]
    })

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Đơn hàng không tồn tại!'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy đơn hàng theo ID thành công!',
        data: order
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
    const updated = await db.Order.update({ status: OrderStatus.FAIL }, { where: { id } })

    if (!updated) {
        return res.status(404).json({
            success: false,
            message: 'Đơn hàng không tồn tại!',
        })
    }
    res.status(200).json({
        success: true,
        message: 'Đơn hàng đã được đánh dấu là Failed!'
    })
}