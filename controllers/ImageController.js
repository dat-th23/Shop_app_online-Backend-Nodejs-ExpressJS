/*
    - Upload file local server
    - Upload image to Google Firebase(Filestore)
    - Cloudinary, AWS,...
*/

import path from 'path'
import fs from 'fs'
import db from '../models'

export async function uploadImages(req, res) {
    if (!req.files || req.files.length === 0) ({
        success: false,
        message: 'Không có tệp nào được tải lên.'
    })

    const uploadedImagePaths = req.files.map(file => path.basename(file.path))

    res.status(201).json({
        message: 'Tải ảnh lên thành công',
        files: uploadedImagePaths
    })
}

export async function viewImage(req, res) {
    const { filename } = req.params

    const filePath = path.join(__dirname, '../uploads', filename)

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            success: false,
            message: 'Ảnh không tồn tại!'
        })
    }
    res.sendFile(filePath)

}

async function isImageUsed(filename) {
    // const models = [db.Product, db.Category, db.Brand, db.News, db.Banner]
    const models = [
        { model: db.User, field: 'avatar', name: 'User' },
        { model: db.Product, field: 'image', name: 'Product' },
        { model: db.Category, field: 'image', name: 'Category' },
        { model: db.Brand, field: 'image', name: 'Brand' },
        { model: db.News, field: 'image', name: 'News' },
        { model: db.Banner, field: 'image', name: 'Banner' },
    ]

    for (const item of models) {
        const exists = await item.model.findOne({ where: { [item.field]: filename } })
        if (exists) {
            console.log(
                `Found in model: ${item.name},
                Field: ${item.field},
                Image Url: ${filename}`
            );

            return true
        }
    }

    return false
}

export async function deleteImage(req, res) {
    const { filename } = req.params
    const filePath = path.join(__dirname, '../uploads', filename)

    const isUsed = await isImageUsed(filename)
    if (isUsed) {
        return res.status(400).json({
            success: false,
            message: 'Không thể xoá ảnh vì đang được sử dụng trong hệ thống.'
        })
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({
            success: false,
            message: 'Ảnh không tồn tại!'
        })
    }

    fs.unlinkSync(filePath)
    return res.status(200).json({
        success: true,
        message: 'Xoá ảnh thành công!'
    })

}
