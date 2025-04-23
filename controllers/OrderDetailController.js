export async function getOrderDetails(req, res) {
    const orderDetails = await db.OrderDetail.findAll()
    res.status(200).json({
        success: true,
        message: 'Get order details list successfully!',
        data: orderDetails,
    })
}

export async function getOrderDetailById(req, res) {
    const { id } = req.params
    const orderDetail = await db.OrderDetail.findByPk(id)

    if (!orderDetail) {
        return res.status(404).json({ message: 'Order detail not found!' })
    }

    res.status(200).json({
        success: true,
        message: 'Get order detail by id successfully!',
        data: orderDetail,
    })
}

export async function createOrderDetail(req, res) {
    const newOrderDetail = await db.OrderDetail.create(req.body)

    res.status(201).json({
        success: true,
        message: 'Created order detail successfully!',
        data: newOrderDetail,
    })
}

export async function deleteOrderDetail(req, res) {
    const { id } = req.params
    const deleted = await db.OrderDetail.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({ message: 'Order detail not found!' })
    }

    res.status(200).json({
        success: true,
        message: 'Deleted order detail successfully!',
    })
}

export async function updateOrderDetail(req, res) {
    const { id } = req.params

    const [affectedRows] = await db.OrderDetail.update(req.body, {
        where: { id },
    })

    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Order detail not found!' })
    }

    res.status(200).json({
        success: true,
        message: 'Updated order detail successfully!',
    })
}