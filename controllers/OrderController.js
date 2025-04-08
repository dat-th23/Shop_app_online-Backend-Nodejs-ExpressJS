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
    res.status(200).json({
        success: true,
        message: 'Created order successfully'
    })
}

export async function deleteOrder(req, res) {
    res.status(200).json({
        success: true,
        message: 'Deleted order successfully'
    })
}

export async function updateOrder(req, res) {
    res.status(200).json({
        success: true,
        message: 'Updated order successfully'
    })
}
