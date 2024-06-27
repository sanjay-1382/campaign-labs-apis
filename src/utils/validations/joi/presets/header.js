import joi from '@hapi/joi';

const commonSchema = joi.object({
    associtedId: joi.number().integer().optional().error(new Error("Associated Id must be an Integer")),
    headerName: joi.string().trim().required().error(new Error("Header Name is  not allowed to be empty and it must be a string")),
    headerMessage: joi.string().trim().required().error(new Error("Header Message is  not allowed to be empty and it must be a string")),
    isActive: joi.boolean().required().error(new Error("Is Active must be an boolean and it is required")),
    isDeleted: joi.boolean().required().error(new Error("Is Deleted must be an boolean and it is required")),
})

const validator = (data, schema) => { return schema.validate(data) }

export const addHeaderValidation = (data) => validator(data, commonSchema);
export const updateHeaderValidation = (data) => validator(data, commonSchema);