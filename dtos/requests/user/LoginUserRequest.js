import Joi from "joi"

class LoginUserRequest {
    constructor(data) {
        this.phone = data.phone
        this.email = data.email
        this.password = data.password
    }

    static validate(data) {
        const schema = Joi.object({
            phone: Joi.string().pattern(/^[0-9+()\-\s]*$/).allow('', null).optional(),
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).optional()
        })

        return schema.validate(data)
    }
}

export default LoginUserRequest