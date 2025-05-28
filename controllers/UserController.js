import db from "../models"
import * as argon2 from "argon2"
import { UserRole } from "../constants"
import { Op } from "sequelize"
import ResponseUser from "../dtos/responses/user/ResponseUser"
import { generateToken } from "../helper/jwtHelper"
import { getImageUrl } from "../helper/imageHelper"

export async function registerUser(req, res) {
    const { email, phone, password } = req.body

    if (!phone && !email) {
        return res.status(400).json({
            success: false,
            message: 'Cần truyền vào email hoặc số điện thoại!'
        })
    }

    const whereCondition = {
        [Op.or]: [
            { email: email },
            { phone: phone }
        ]
    }

    const existingUser = await db.User.findOne({ where: whereCondition })
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Email hoặc số điện thoại đã tồn tại.'
        })
    }

    const HashedPassword = await argon2.hash(password)
    const user = await db.User.create({
        ...req.body,
        email,
        phone,
        role: UserRole.USER,
        password: HashedPassword
    })

    res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công!',
        data: new ResponseUser(user),
    })
}

export async function login(req, res) {
    const { email, phone, password } = req.body

    if (!phone && !email) {
        return res.status(400).json({
            success: false,
            message: 'Cần truyền vào email hoặc số điện thoại!'
        })
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'Vui lòng nhập mật khẩu!'
        })
    }

    const whereCondition = {}
    if (email) whereCondition.email = email
    if (phone) whereCondition.phone = phone

    const user = await db.User.findOne({ where: whereCondition })
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Email hoặc mật khẩu không chính xác!'
        })
    }

    const validPassword = await argon2.verify(user.password, password)
    if (!validPassword) {
        return res.status(401).json({
            success: false,
            message: 'Email hoặc mật khẩu không chính xác!'
        })
    }

    const token = generateToken(user.id)

    res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công!',
        data: {
            user: new ResponseUser(user),
            token: token
        }
    })
}

export async function getUserById(req, res) {
    const { id } = req.params

    if (req.user.id != id) {
        return res.status(400).json({
            success: false,
            message: 'Chỉ có người dùng và quản trị viên mới có quyền xem thông tin này!'
        })
    }

    const user = await db.User.findByPk(id)
    if (!user) {
        return null
    }

    res.status(200).json({
        success: true,
        message: 'Lấy thông tin người dùng thành công!',
        data: {
            ...user.get({ plain: true }),
            avatar: getImageUrl(user.avatar)
        }
    })

}

export async function updateUser(req, res) {
    const { id } = req.params
    const { name, avatar, old_password, new_password } = req.body

    if (req.user.id != id) {
        return res.status(400).json({
            success: false,
            message: 'Bạn không có quyền cập nhật thông tin người dùng khác!'
        })
    }

    const user = await db.User.findByPk(id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Người dùng không tìm thấy!'
        })
    }

    if (old_password && new_password) {
        const validOldPassword = await argon2.verify(user.password, old_password)
        if (!validOldPassword) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu cũ không chính xác!'
            })
        }

        user.password = await argon2.hash(new_password)
        user.password_changed_at = new Date()
    }
    else if (old_password || new_password) {
        return res.status(400).json({
            success: false,
            message: 'Cần cả mật khẩu cũ và mật khẩu mới để cập nhật mật khẩu!'
        })
    }

    user.name = name || user.name
    user.avatar = avatar || user.avatar

    await user.save()

    res.status(200).json({
        success: true,
        message: 'Cập nhật người dùng thành công!',
        data: {
            ...user.get({ plain: true }),
            avatar: getImageUrl(user.avatar)
        }
    })
}
