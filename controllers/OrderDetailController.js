import db from "../models"

export async function createOrderDetail(req, res) {
    const newOrderDetail = await db.OrderDetail.create(req.body)

    res.status(201).json({
        success: true,
        message: 'Tạo chi tiết đơn hàng thành công!',
        data: newOrderDetail,
    })
}

export async function getOrderDetails(req, res) {
    const orderDetails = await db.OrderDetail.findAll()
    res.status(200).json({
        success: true,
        message: 'Lấy danh sách chi tiết đơn hàng thành công!',
        data: orderDetails,
    })
}

export async function getOrderDetailById(req, res) {
    const { id } = req.params
    const orderDetail = await db.OrderDetail.findByPk(id)

    if (!orderDetail) {
        return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại!' })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy chi tiết đơn hàng theo ID thành công!',
        data: orderDetail,
    })
}

export async function updateOrderDetail(req, res) {
    const { id } = req.params

    const [affectedRows] = await db.OrderDetail.update(req.body, {
        where: { id },
    })

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại!' })
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật chi tiết đơn hàng thành công!',
    })
}

export async function deleteOrderDetail(req, res) {
    const { id } = req.params
    const deleted = await db.OrderDetail.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({ message: 'Chi tiết đơn hàng không tồn tại!' })
    }

    res.status(200).json({
        success: true,
        message: 'Xóa chi tiết đơn hàng thành công!',
    })
}
