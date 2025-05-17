import Joi from "joi";

class InsertCartRequest {
    constructor(data) {
        this.user_id = data.user_id || null;
        this.session_id = data.session_id || null;
    }

    static validate(data) {
        const schema = Joi.object({
            user_id: Joi.number().integer().allow(null),
            session_id: Joi.string().allow(null, ''),
        })

        return schema.validate(data);
    }
}

export default InsertCartRequest;
