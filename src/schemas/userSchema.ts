import Joi from "@hapi/joi"

export const userSchema = Joi.object({
    firstName: Joi.string().min(1).max(20).required(),
    lastName: Joi.string().min(1).max(20).required(),
    userName: Joi.string().min(3).max(20).alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,70}$'))
})
