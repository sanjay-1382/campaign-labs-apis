import joi from '@hapi/joi';

const commonSchema = joi.object({
    associatedId: joi.number().integer().optional().error(new Error("Associated Id must be an Integer")),
    networkName: joi.string().trim().required().error(new Error("Network Name is  not allowed to be empty and it must be a string")),
    countryId: joi.number().integer().optional().error(new Error("Country Id must be an integer")),
    countryName: joi.string().optional().error(new Error("Country Name must be an String and not empty")),
    trackierId: joi.number().integer().optional().error(new Error("Trackier Id must be an integer")),
    portalId: joi.number().integer().required().error(new Error("Prtal Id must be an integer and it is requored")),
    portalName: joi.string().trim().required().error(new Error("Portal Name is  not allowed to be empty and it must be a string")),
    isActive: joi.boolean().required().error(new Error("Is Active must be an boolean and it is required")),
    isDeleted: joi.boolean().required().error(new Error("Is Deleted must be an boolean and it is required")),
})

const validator = (data, schema) => { return schema.validate(data) }

export const addNetworkValidation = (data) => validator(data, commonSchema);
export const updateNetworkValidation = (data) => validator(data, commonSchema);