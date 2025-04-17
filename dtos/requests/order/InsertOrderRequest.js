import Joi from "joi"

class InsertOrderRequest {
    constructor(data) {
        this.user_id = data.user_id
        this.status = data.status
        this.note = data.note
        this.total = data.total
    }

    static validate(data) {
        const schema = Joi.object({
            user_id: Joi.number().integer().required(),
            status: Joi.number().integer().min(1).required(), // status must be > 0
            note: Joi.string().optional().allow(""),
            total: Joi.number().min(0).required(), // total >= 0
        })

        return schema.validate(data)
    }
}

export default InsertOrderRequest
