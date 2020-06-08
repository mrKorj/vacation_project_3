import Joi from "@hapi/joi";

export const vacationSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    description: Joi.string().min(5).max(200).required(),
    beginDate: Joi.date().min(Date.now()).required(),
    expDate: Joi.date().min(Date.now()).required(),
    picUrl: Joi.string().required(),
    price: Joi.number().required()
})
