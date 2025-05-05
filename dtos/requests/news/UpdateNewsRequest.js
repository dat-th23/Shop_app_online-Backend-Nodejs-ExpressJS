import Joi from "joi"

class UpdateNewsRequest {
    constructor(data) {
        // These fields are optional, but if provided, they must be valid
        this.title = data.title
        this.image = data.image
        this.content = data.content
        this.product_ids = data.product_ids
    }

    static validate(data) {
        const schema = Joi.object({
            title: Joi.string().optional().allow(null, ''),
            image: Joi.string().optional().allow(null, ''),
            content: Joi.string().optional().allow(null, ''),
            product_ids: Joi.array().items(Joi.number().integer()).optional()
        })

        return schema.validate(data)
    }
}

export default UpdateNewsRequest
