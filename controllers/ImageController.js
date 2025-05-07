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
    const models = [db.Product, db.Category, db.Brand, db.News, db.Banner]

    for (const model of models) {
        const exists = await model.findOne({ where: { image: filename } })
        if (exists) return true
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
