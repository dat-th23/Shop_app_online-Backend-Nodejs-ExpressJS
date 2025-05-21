import { Op } from "sequelize"
import db from "../models"
import { OrderStatus } from "../constants"

export async function createCart(req, res) {
    const { user_id, session_id } = req.body

    if ((user_id && session_id) || (!user_id && !session_id)) {
        return res.status(400).json({
            success: false,
            message: 'Không được phép truyền user_id và session_id cùng một lúc!'
        })
    }
    const whereCondition = user_id ? { user_id } : { session_id }

    const existingCart = await db.Cart.findOne({
        where: whereCondition
    })

    if (existingCart) {
        return res.status(409).json({
            success: false,
            message: 'Giỏ hàng đã tồn tại!'
        })
    }

    const cart = await db.Cart.create(req.body)

    res.status(200).json({
        success: true,
        message: "Tạo giỏ hàng thành công",
        data: cart,
    })
}

export async function getAllCarts(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {
        [Op.or]: [
            { user_id: { [Op.like]: `%${search}%` } },
            { session_id: { [Op.like]: `%${search}%` } },
        ],
    }

    const [total, carts] = await Promise.all([
        db.Cart.count({ where: whereCondition }),
        db.Cart.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
            include: [{ model: db.CartItem }],
        }),
    ])

    res.status(200).json({
        success: true,
        message: "Lấy danh sách giỏ hàng thành công!",
        data: carts,
        count: carts.length,
        pagination: {
            total: total,
            page: parseInt(page),
            limit: parseInt(limit),
        },
    })
}

export async function getCartById(req, res) {
    const { id } = req.params

    const cart = await db.Cart.findByPk(id, {
        include: [{ model: db.CartItem }],
    })

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Giỏ hàng không tồn tại",
        })
    }

    res.status(200).json({
        success: true,
        message: "Lấy giỏ hàng thành công",
        data: cart,
    })
}

export async function getCartBySessionIdOrUserId(req, res) {
    const { user_id, session_id } = req.query

    if ((user_id && session_id) || (!user_id && !session_id)) {
        return res.status(400).json({
            success: false,
            message: 'Không được phép truyền user_id và session_id cùng một lúc!'
        })
    }

    const whereCondition = user_id ? { user_id } : { session_id }

    const cart = await db.Cart.findOne({
        where: whereCondition
    })

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Giỏ hàng không tồn tại",
        })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy giỏ hàng thành công!',
        data: cart
    })
}

export async function checkoutCart(req, res) {
    const { cart_id, total, note } = req.body

    if (!cart_id) {
        return res.status(400).json({
            success: false,
            message: 'Thiếu cart_id!'
        })
    }
    const t = await db.sequelize.transaction()

    try {
        const cart = await db.Cart.findByPk(cart_id, {
            include: [{ model: db.CartItem, include: [db.Product] }],
            transaction: t
        })

        if (!cart) {
            await t.rollback()
            return res.status(404).json({
                success: false,
                message: 'Giỏ hàng không tồn tại!'
            })
        }

        if (!cart.CartItems || cart.CartItems.length === 0) {
            await t.rollback()
            return res.status(400).json({
                success: false,
                message: 'Giỏ hàng trống!'
            })
        }
        let finalTotal = total
        if (!finalTotal) {
            finalTotal = cart.CartItems.reduce((sum, item) => {
                return sum + item.quantity * item.Product.price
            }, 0)
        }

        const order = await db.Order.create({
            user_id: cart.user_id,
            session_id: cart.session_id,
            status: OrderStatus.PENDING,
            total: finalTotal,
            note
        }, { transaction: t })

        const orderDetailsData = cart.CartItems.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.Product.price
        }))

        await db.OrderDetail.bulkCreate(orderDetailsData, { transaction: t })

        await db.CartItem.destroy({ where: { cart_id }, transaction: t })
        await db.Cart.destroy({ where: { id: cart_id }, transaction: t })

        await t.commit()

        return res.status(200).json({
            success: true,
            message: "Đặt hàng thành công",
            data: { order_id: order.id }
        })
    } catch (error) {
        console.error(error)
        await t.rollback()
        return res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi thanh toán"
        })
    }
}

export async function deleteCart(req, res) {
    const { id } = req.params

    await db.CartItem.destroy({ where: { cart_id: id } })

    const deleted = await db.Cart.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Giỏ hàng không tồn tại",
        })
    }

    res.status(200).json({
        success: true,
        message: "Xóa giỏ hàng thành công",
    })
}
