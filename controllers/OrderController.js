import db from "../models"

export async function getAllOrders(req, res) {
    res.status(200).json({
        success: true,
        message: 'Get order list successfully'
    })
}

export async function getOrderById(req, res) {
    res.status(200).json({
        success: true,
        message: 'Get order by id successfully'
    })
}

export async function createOrder(req, res) {
    const order = await ab.Order.create(req.body)
    res.status(201).json({
        success: true,
        message: 'Created order successfully',
        data: order,
    })
}

export async function deleteOrder(req, res) {
    const { id } = req.params
    const deleted = await db.Order.destroy({ where: { id } })
    if (!deleted) {
        return res.status(404).json({
            message: 'Not Found!',
        })
    }
    res.status(200).json({
        success: true,
        message: 'Deleted order successfully'
    })
}
export async function updateOrder(req, res) {
    const { id } = req.params;

    const [affectedRows] = await db.Order.update(req.body, { where: { id } });

    if (affectedRows === 0) {
        return res.status(404).json({
            message: 'Not Found!',
        });
    }

    const updatedOrder = await db.Order.findByPk(id);

    res.status(200).json({
        success: true,
        message: 'Updated order successfully',
        data: updatedOrder,
    });
}
