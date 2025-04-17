import Joi from 'joi'

class InsertUserRequest {
    constructor(data) {
        this.email = data.email
        this.password = data.password // cần mã hóa trước khi gán
        // this.password = this.encryptPassword(data.password) // cần mã hóa trước khi gán
        this.name = data.name
        this.role = data.role
        this.avatar = data.avatar
        this.phone = data.phone
    }

    encryptPassword(password) {
        //     // Encrypt the password before storing it 
        //     const salt = bcryt.genSaltSync(10)
        //     return bcrybt.hashSync(password, salt)
        return "faked hashed password"
    }

    static validate(data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            name: Joi.string().required(),
            role: Joi.number().integer().min(1).required(),
            avatar: Joi.string().uri().allow('', null),
            phone: Joi.string().pattern(/^[0-9+()\-\s]*$/).allow('', null),
        })

        return schema.validate(data)
    }
}

export default InsertUserRequest
