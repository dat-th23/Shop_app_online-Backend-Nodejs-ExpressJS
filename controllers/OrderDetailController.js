export async function getAllOrderDetails(req, res) {
    res.status(200).json({
        message: 'Get order details list successfully'
    })
}

export async function getOrderDetailById(req, res) {
    res.status(200).json({
        message: 'Get order detail by id successfully'
    })
}

export async function createOrderDetail(req, res) {
    res.status(200).json({
        message: 'Created order detail successfully'
    })
}

export async function deleteOrderDetail(req, res) {
    res.status(200).json({
        message: 'Deleted order detail successfully'
    })
}

export async function updateOrderDetail(req, res) {
    res.status(200).json({
        message: 'Updated order detail successfully'
    })
}
