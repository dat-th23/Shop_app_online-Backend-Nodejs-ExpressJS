/*
    - Upload file local server
    - Upload image to Google Firebase(Filestore)
    - Cloudinary, AWS,...
*/

import path from 'path'
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