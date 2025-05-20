import Joi from "joi"
import { OrderStatus } from "../../../constants/orderStatus"

class UpdateOrderRequest {
    constructor(data) {
        this.status = data.status
        this.note = data.note
        this.total = data.total
    }

    static validate(data) {
        const validateStatusValues = Object.values(OrderStatus)

        const schema = Joi.object({
            status: Joi.number().integer().valid(...validateStatusValues).required(),
            note: Joi.string().optional().allow("", null),
            total: Joi.number().min(0).required(),
        })

        return schema.validate(data)
    }
}

export default UpdateOrderRequest
