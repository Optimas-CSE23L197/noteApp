const joi = require('joi')

const signupValidation = (req,res,next) => {
    const schema = joi.object({
        username: joi.string()
        .min(3)
        .max(100)
        .required(),

        email: joi.string()
        .min(10)
        .max(100)
        .required(),

        password: joi.string()
        .min(4)
        .max(20)
        .required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: "invalid provided data"
        })
    }
    next();
}

const loginValidation = (req,res,next) => {
    const schema = joi.object({
        email: joi.string()
        .min(10)
        .max(100)
        .required(),

        password: joi.string()
        .min(4)
        .max(20)
        .required()
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: "invalid provided data"
        })
    }
    next();
}

module.exports = {
    signupValidation,loginValidation
}