import db from "../models"
import ResponseUser from "../dtos/responses/user/ResponseUser"

import * as argon2 from "argon2";
import { UserRole } from "../constants";
import { Op } from "sequelize";

export async function registerUser(req, res) {
    const { email, phone } = req.body

    if (!phone && !email) {
        return res.status(400).json({
            success: false,
            message: 'Cần truyền vào email hoặc password!'
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

    const HashedPassword = await argon2.hash("password")
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
    res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công!'
    })
}

export async function updateUser(req, res) {
    const { id } = req.params

    const [affectedRows] = await db.User.update(req.body, { where: { id } })

    if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'Người dùng không tồn tại!',
        })
    }

    res.status(200).json({
        success: true,
        message: 'Cập nhật người dùng thành công!',
    })
}
