import Joi from "@hapi/joi";

const commonSchema = Joi.object({
    templateName: Joi.string().trim().required().error(new Error('Template name is not allowed to be empty')),
    templateHtml: Joi.string().trim().allow(null).error(new Error('Template html is not allowed to be empty')),
    templateText: Joi.string().trim().allow(null).error(new Error('Template text is not allowed to be empty')),
    verticalId: Joi.array().allow(null).error(new Error('Vertical id is not allowed to be empty')),
    associatedId: Joi.number().integer().required().error(new Error('Associated id is not allowed to be empty')),
    journeyId: Joi.string().trim().allow(null).error(new Error('Journey id is not allowed to be empty')),
    templateType: Joi.string().trim().allow("general").error(new Error('Template html is not allowed to be empty')),
    isDeleted:Joi.boolean().allow(false).error(new Error('isDeleted id is not allowed to be empty')),
    isActive: Joi.boolean().allow(true).error(new Error('isActivate id is not allowed to be empty'))
})

const validator = (data, schema) => { return schema.validate(data)};
export const addPoolValidator = (data) => validator(data, commonSchema);
export const updatePoolValidator = (data) => validator(data, commonSchema);