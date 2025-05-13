import { Op, Sequelize } from "sequelize";
import db from "../models";

export async function addOrUpdateCartItem(req, res) {
    const { cart_id, product_id, quantity } = req.body;

    if (!cart_id || !product_id || !quantity || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Thiếu thông tin hoặc số lượng không hợp lệ",
        });
    }

    let cartItem = await db.CartItem.findOne({
        where: { cart_id, product_id },
    });

    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    } else {
        cartItem = await db.CartItem.create({ cart_id, product_id, quantity });
    }

    res.status(200).json({
        success: true,
        message: "Thêm hoặc cập nhật sản phẩm trong giỏ hàng thành công",
        data: cartItem,
    });
}

export async function getCartItems(req, res) {
    const { cart_id } = req.params;

    const cartItems = await db.CartItem.findAll({
        where: { cart_id },
        include: [{ model: db.Product }],
    });

    res.status(200).json({
        success: true,
        message: "Lấy danh sách sản phẩm trong giỏ hàng thành công",
        data: cartItems,
    });
}

export async function updateCartItem(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Số lượng phải lớn hơn 0",
        });
    }

    const [affectedRows] = await db.CartItem.update(
        { quantity },
        { where: { id } }
    );

    if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: "Sản phẩm trong giỏ hàng không tồn tại",
        });
    }

    res.status(200).json({
        success: true,
        message: "Cập nhật số lượng sản phẩm thành công",
    });
}

export async function deleteCartItem(req, res) {
    const { id } = req.params;

    const deleted = await db.CartItem.destroy({ where: { id } });

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: "Sản phẩm trong giỏ hàng không tồn tại",
        });
    }

    res.status(200).json({
        success: true,
        message: "Xóa sản phẩm khỏi giỏ hàng thành công",
    });
}
