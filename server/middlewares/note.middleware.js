const joi = require('joi')

const noteValidation = (req,res,next) => {
    const schema = joi.object({
        title: joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.empty': '"Title" is required',
            'string.min': '"Title" must have at least 1 character',
            'string.max': '"Title" must not exceed 100 characters'
        }),

        content: joi.string()
        .min(1)
        .max(1000)
        .required()
        .messages({
            'string.empty': '"Content" is required',
            'string.min': '"Content" must have at least 5 characters',
            'string.max': '"Content" must not exceed 1000 characters'
        }),

        isPinned: joi.boolean()
        .default(false),
    })

    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message).join(", "),
        })
    }
    next();
}

module.exports = noteValidation