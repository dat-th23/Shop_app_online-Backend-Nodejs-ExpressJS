import Joi from 'joi'
import { UserRole } from '../../../constants'

class InsertUserRequest {
    constructor(data) {
        this.email = data.email
        this.password = data.password // cần mã hóa trước khi gán
        this.name = data.name
        this.role = data.role
        this.avatar = data.avatar
        this.phone = data.phone
    }

    static validate(data) {
        const schema = Joi.object({
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).optional(),
            name: Joi.string().required(),
            role: Joi.number().integer().min(UserRole.USER),
            avatar: Joi.string().uri().allow('', null).optional(),
            phone: Joi.string().pattern(/^[0-9+()\-\s]*$/).allow('', null).optional(),
        })

        return schema.validate(data)
    }
}

export default InsertUserRequest
