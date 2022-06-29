import Joi from "joi";

export default {
    createNew: {
        body: Joi.object().keys({
            userName: Joi.string().required(),
            password: Joi.string().required(),
        }),
    },
    smoke: {
        body: Joi.object().keys({
            x: Joi.string().required().default("0"),
            y: Joi.string().required().default("0"),
        }),
    }
}