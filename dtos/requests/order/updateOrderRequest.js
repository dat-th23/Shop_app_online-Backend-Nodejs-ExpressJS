import Joi from "joi"
import { OrderStatus } from "../../../constants"

class UpdateOrderRequest {
    constructor(data) {
        this.status = data.status
        this.note = data.note
        this.total = data.total
        this.phone = data.phone
        this.address = data.address
    }

    static validate(data) {
        const validateStatusValues = Object.values(OrderStatus)

        const schema = Joi.object({
            status: Joi.number().integer().valid(...validateStatusValues).optional(),
            note: Joi.string().optional().allow("", null),
            total: Joi.number().min(0).optional(),
            phone: Joi.string().pattern(/^[0-9+()\-\s]*$/).allow('', null),
            address: Joi.string().optional().allow('', null)
        })

        return schema.validate(data)
    }
}

export default UpdateOrderRequest
