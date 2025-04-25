import multer from "multer"
import path from 'path'

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const destinationPath = path.join(__dirname, '../uploads')
        callback(null, destinationPath)
    },
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        callback(null, uniqueName)
    }
})

// check file type
const fileFilter = function (req, file, callback) {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Chỉ cho phép các tệp hình ảnh (jpeg, jpg, png, webp, gif)'))
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // < 5MB 
        files: 5
    },
    fileFilter
})

export default upload