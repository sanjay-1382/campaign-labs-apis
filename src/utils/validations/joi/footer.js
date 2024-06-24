import joi from '@hapi/joi';

const commonSchema = joi.object({
    footerName: joi.string().trim().required().error(new Error("Footer Name is  not allowed to be empty and it must be a string")),
    footerMessage: joi.string().trim().required().error(new Error("Footer Message is  not allowed to be empty and it must be a string")),
    associtedId:joi.number().integer().optional().error( new Error("Associted Id must be an integer")),
    isActive:joi.boolean().required().error( new Error("Is Active must be an boolean and it is required") ),
    isDeleted:joi.boolean().required().error( new Error("Is Deleted must be an boolean and it is required") ),
});

const validator = (data, schema) => { return schema.validate(data) };

export const addFooterValidation = (data) => validator(data, commonSchema);
export const updateFooterValidation = (data) => validator(data, commonSchema);
