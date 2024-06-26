import Joi from "@hapi/joi";
import { required } from "joi";

const commonSchema = Joi.object({
    offerName: Joi.string().trim().required().error(new Error('Offer name is not allowed to be empty')),
    offerLink: Joi.string().trim().required().error(new Error('Offer link is not allowed to be empty')),
    personalUnsub: Joi.string().trim().allow(null).error(new Error('Personal unsub is not allowed to be empty')),
    networkUnsub: Joi.string().trim().allow(null).error(new Error('Network unsub is not allowed to be empty')),
    method: Joi.number().allow(0).error(new Error('Method is not allowed to be empty')),
    verticalId: Joi.number().integer().required().error(new Error('Vertical id is not allowed to be empty')),
    subVerticalId: Joi.number().integer().required().error(new Error('Sub vertical id is not allowed to be empty')),
    associatedId: Joi.number().allow(1).error(new Error('Associated id is not allowed to be empty')),
    portal: Joi.string().required().error(new Error('Portal is not allowed to be empty')),
    network: Joi.string().required().error(new Error('network is not allowed to be empty')),
    offer: Joi.string().required().error(new Error('offer is not allowed to be empty')),
    affiliate: Joi.string().required().error(new Error('affiliate is not allowed to be empty')),
    isDeleted: Joi.boolean().allow(false).error(new Error('isDeleted id is not allowed to be empty')),
    isActive: Joi.boolean().allow(true).error(new Error('isActivate id is not allowed to be empty')),
})

const validator = (data, schema) => { return schema.validate(data)};
export const addPoolValidator = (data) => validator(data, commonSchema);
export const updatePoolValidator = (data) => validator(data, commonSchema);