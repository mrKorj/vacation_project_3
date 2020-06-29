import Joi from "@hapi/joi";

export const vacationSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    description: Joi.string().min(5).max(200).required(),
    fromDate: Joi.date().min(new Date().toISOString().split("T")[0]).required(),
    toDate: Joi.date().min(new Date().toISOString().split("T")[0]).required(),
    picUrl: Joi.string().required(),
    price: Joi.number().required()
})
