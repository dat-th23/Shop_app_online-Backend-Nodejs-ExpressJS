/*
    - Upload file local server
    - Upload image to Google Firebase(Filestore)
    - Cloudinary, AWS,...
*/

import path from 'path'
import fs from 'fs'

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

    // Gộp đường dẫn tới đúng file ảnh
    const filePath = path.join(__dirname, '../uploads', filename)

    // Kiểm tra file có tồn tại
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            return res.status(404).json({
                success: false,
                message: 'Ảnh không tồn tại!'
            })
        }

        // Gửi file ảnh
        res.sendFile(filePath)
    })
}