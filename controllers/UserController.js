import db from "../models"
import ResponseUser from "../dtos/responses/user/ResponseUser"

import * as argon2 from "argon2";

export async function createUser(req, res) {
    const { email } = req.body

    const existingUser = await db.User.findOne({ where: { email } })

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Email đã tồn tại. Vui lòng sử dụng email khác!'
        })
    }

    const HashedPassword = await argon2.hash("password")
    const user = await db.User.create({ ...req.body, password: HashedPassword })

    res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công!',
        data: new ResponseUser(user),
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
