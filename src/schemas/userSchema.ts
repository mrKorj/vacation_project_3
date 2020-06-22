import Joi from "@hapi/joi"

export const newUserSchema = Joi.object({
    firstName: Joi.string().min(1).max(20).required(),
    lastName: Joi.string().min(1).max(20).required(),
    userName: Joi.string().min(3).max(20).alphanum().required().not('admin', 'Admin', 'ADMIN'), // TODO: find a solution to RegEx for the "admin"
    password: Joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,70}$'))
})

export const logInSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})
