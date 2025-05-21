import Joi from "joi"

class InsertBannerRequest {
    constructor(data) {
        this.name = data.name
        this.image = data.image
        this.status = data.status
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
            image: Joi.string().allow('', null),
            status: Joi.number().integer().min(0).optional(),
        })

        return schema.validate(data)
    }
}

export default InsertBannerRequest
