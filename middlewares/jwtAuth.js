import { verifyToken } from "../helper/jwtHelper"
import db from "../models"

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Không có token được cung cấp!'
        })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
        return res.status(403).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn!'
        })
    }

    const user = await db.User.findByPk(decoded.userId)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn'
        })
    }

    if (user.is_locked) {
        return res.status(403).json({
            success: false,
            message: 'Tài khoản đã bị khoá'
        })
    }

    if (user.password_changed_at) {
        const passwordChangedTimestamp = Math.floor(
            new Date(user.password_changed_at).getTime() / 1000
        )

        if (decoded.iat < passwordChangedTimestamp) {
            return res.status(401).json({
                success: false,
                message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!'
            })
        }
    }

    req.user = user
    next()
}

export function requireRole(allowedRoles = []) {
    return (req, res, next) => {
        const userRole = req.user.role

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền truy cập tài nguyên này'
            })
        }

        next()
    }
}