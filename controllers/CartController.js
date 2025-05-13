import { Op, Sequelize } from "sequelize";
import db from "../models";

export async function getOrCreateCart(req, res) {
    const { user_id, session_id } = req.body;

    if (!user_id && !session_id) {
        return res.status(400).json({
            success: false,
            message: "Cần cung cấp user_id hoặc session_id để xác định giỏ hàng",
        });
    }

    let cart = await db.Cart.findOne({
        where: {
            [Op.or]: [
                { user_id: user_id || null },
                { session_id: session_id || null },
            ],
        },
    });

    if (!cart) {
        cart = await db.Cart.create({ user_id: user_id || null, session_id: session_id || null });
    }

    res.status(200).json({
        success: true,
        message: "Lấy hoặc tạo giỏ hàng thành công",
        data: cart,
    });
}


export async function getAllCarts(req, res) {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereCondition = {
        [Op.or]: [
            { user_id: { [Op.like]: `%${search}%` } },
            { session_id: { [Op.like]: `%${search}%` } },
        ],
    };

    const [total, carts] = await Promise.all([
        db.Cart.count({ where: whereCondition }),
        db.Cart.findAll({
            where: whereCondition,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']],
            include: [{ model: db.CartItem }],
        }),
    ]);

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
    });
}

export async function getCartById(req, res) {
    const { id } = req.params;

    const cart = await db.Cart.findByPk(id, {
        include: [{ model: db.CartItem }],
    });

    if (!cart) {
        return res.status(404).json({
            success: false,
            message: "Giỏ hàng không tồn tại",
        });
    }

    res.status(200).json({
        success: true,
        message: "Lấy giỏ hàng thành công",
        data: cart,
    });
}

export async function updateCart(req, res) {
    const { id } = req.params;
    const { user_id, session_id } = req.body;

    const [affectedRows] = await db.Cart.update(
        { user_id, session_id },
        { where: { id } }
    );

    if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: "Giỏ hàng không tồn tại",
        });
    }

    res.status(200).json({
        success: true,
        message: "Cập nhật giỏ hàng thành công",
    });
}

export async function deleteCart(req, res) {
    const { id } = req.params;

    await db.CartItem.destroy({ where: { cart_id: id } });

    const deleted = await db.Cart.destroy({ where: { id } });

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Giỏ hàng không tồn tại",
        });
    }

    res.status(200).json({
        success: true,
        message: "Xóa giỏ hàng thành công",
    });
}
