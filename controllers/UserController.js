import db from "../models"
import ResponseUser from "../dtos/responses/user/ResponseUser"

import * as argon2 from "argon2";

export async function createUser(req, res) {
    const { email } = req.body

    const existingUser = await db.User.findOne({ where: { email } })

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'Email already exists. Please use another email!'
        })
    }

    const HashedPassword = await argon2.hash("password")
    const user = await db.User.create({ ...req.body, password: HashedPassword })

    res.status(201).json({
        success: true,
        message: 'Created user successfully!',
        data: new ResponseUser(user),
    })
}

export async function updateUser(req, res) {
    const { id } = req.params

    const [affectedRows] = await db.User.update(req.body, { where: { id } })

    if (affectedRows === 0) {
        return res.status(404).json({
            success: false,
            message: 'User not found!',
        })
    }

    res.status(200).json({
        success: true,
        message: 'Updated user successfully!',
    })
}
