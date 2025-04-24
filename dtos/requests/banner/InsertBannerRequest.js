import Joi from "joi"

class InsertBannerRequest {
    constructor(data) {
        this.name = data.name
        this.image = data.image
        this.status = data.status
        this.product_ids = data.product_ids // mảng số, ví dụ: [12, 20, 23]
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
            image: Joi.string().uri().allow('', null),
            status: Joi.number().integer().min(0).required(),
            product_ids: Joi.array().items(Joi.number().integer()).optional()
        })

        return schema.validate(data)
    }
}

export default InsertBannerRequest
