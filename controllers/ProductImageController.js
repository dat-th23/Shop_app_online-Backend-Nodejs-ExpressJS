import db from "../models"
// import { getImageUrl } from "../../../helper/imageHelper"

export async function createProductImage(req, res) {
    const { product_id, image_url } = req.body
    const existingProImg = await db.ProductImage.findOne({
        where: {
            product_id: product_id,
            image_url: image_url
        }
    })

    if (existingProImg) {
        return res.status(409).json({
            success: false,
            message: 'Mối quan hệ giữa sản phẩm và hình ảnh sản phẩm đã tồn tại!'
        })
    }

    const productImage = await db.ProductImage.create(req.body)

    res.status(200).json({
        success: true,
        message: 'Thêm ảnh sản phẩm thành công!',
        data: productImage
    })
}

export async function getAllProductImages(req, res) {
    // thêm trường hợp không truyền product_id 
    const { page = 1, limit = 10, product_id } = req.query
    const offset = (page - 1) * limit

    const whereCondition = {}

    if (product_id) {
        whereCondition.product_id = product_id
    }

    const [total, images] = await Promise.all([
        db.ProductImage.count({ where: whereCondition }),
        db.ProductImage.findAll({
            where: whereCondition,
            // include: ['Product'],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [['id', 'ASC']]
        })
    ])

    res.status(200).json({
        success: true,
        message: 'Lấy danh sách ảnh sản phẩm thành công!',
        data: images,
        count: images.length,
        pagination: {
            total,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    })
}

export async function getProductImageById(req, res) {
    const { id } = req.params
    const ProductImage = await db.ProductImage.findByPk(id)

    if (!ProductImage) {
        return res.status(404).json({
            message: 'Ảnh sản phẩm không tồn tại!',
            data: null
        })
    }

    res.status(200).json({
        success: true,
        message: 'Lấy thông tin ảnh sản phẩm thành công!',
        data: ProductImage
    })
}

// export async function updateProductImage(req, res) {
//     const { id } = req.params
//     const [affectedRows] = await db.ProductImage.update(req.body, { where: { id } })

//     if (affectedRows === 0) {
//         return res.status(404).json({
//             success: false,
//             message: 'Ảnh không tồn tại!'
//         })
//     }

//     res.status(200).json({
//         success: true,
//         message: 'Cập nhật ảnh sản phẩm thành công!'
//     })
// }

export async function deleteProductImage(req, res) {
    const { id } = req.params
    const deleted = await db.ProductImage.destroy({ where: { id } })

    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Ảnh không tồn tại!'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Xóa ảnh sản phẩm thành công!'
    })
}
