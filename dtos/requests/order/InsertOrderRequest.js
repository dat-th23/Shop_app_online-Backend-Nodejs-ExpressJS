import Joi from "joi"
import { OrderStatus } from "../../../constants"

class InsertOrderRequest {
    constructor(data) {
        this.user_id = data.user_id
        this.status = data.status
        this.note = data.note
        this.total = data.total
        this.phone = data.phone
        this.address = data.address
    }

    static validate(data) {
        const validateStatusValues = Object.values(OrderStatus)

        const schema = Joi.object({
            user_id: Joi.number().integer().optional(),
            status: Joi.number().integer().valid(...validateStatusValues).optional(),
            note: Joi.string().optional().allow('', null),
            total: Joi.number().min(0).optional(), // total >= 0
            phone: Joi.string().pattern(/^[0-9+()\-\s]*$/).allow('', null),
            address: Joi.string().optional().allow('', null)
        })

        return schema.validate(data)
    }
}

export default InsertOrderRequest
