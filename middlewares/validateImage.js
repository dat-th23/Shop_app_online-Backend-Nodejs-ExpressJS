import path from 'path'
import fs from 'fs'

const validateImage = (req, res, next) => {
    const imageBanner = req.body.image

    // check if imageName does not start http:// or https:// 
    if (!imageBanner || /^https?:\/\//.test(imageBanner)) {
        return next()
    }

    const imagePath = path.join(__dirname, '../uploads', imageBanner)

    if (!fs.existsSync(imagePath)) {
        return res.status(404).json({
            success: false,
            message: 'Ảnh banner không tồn tại!'
        })
    }

    next()
}

export default validateImage