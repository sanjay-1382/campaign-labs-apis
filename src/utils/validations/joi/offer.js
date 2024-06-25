import Joi from "@hapi/joi";
import { required } from "joi";

const commonSchema = Joi.object({
    offerName: Joi.string().trim().required().error(new Error('Offer name is not allowed to be empty')),
    offerGroupId: Joi.number().allow(null).error(new Error('Offer group id is not allowed to be empty')),
    offerGroupName: Joi.string().trim().allow(null).error(new Error('Offer group name is not allowed to be empty')),
    offerLink: Joi.string().trim().required().error(new Error('Offer link is not allowed to be empty')),
    personalUnsub: Joi.string().trim().allow(null).error(new Error('Personal unsub is not allowed to be empty')),
    networkUnsub: Joi.string().trim().allow(null).error(new Error('Network unsub is not allowed to be empty')),
    payout: Joi.number().allow(null).error(new Error('Payout is not allowed to be empty')),
    paymentType: Joi.string().trim().allow(null).error(new Error('Payment type is not allowed to be empty')),
    trackierId: Joi.optional().allow(null).error(new Error('Tracker id is not allowed to be empty')),
    categoryId: Joi.number().integer().required().error(new Error('Category id is not allowed to be empty')),
    method: Joi.number().allow(0).error(new Error('Method is not allowed to be empty')),
    verticalId: Joi.number().integer().required().error(new Error('Vertical id is not allowed to be empty')),
    associatedId: Joi.number().allow(1).error(new Error('Associated id is not allowed to be empty')),
    networkPortalList: Joi.optional().allow(null).error(new Error('Network portal list is not allowed to be empty')),
    network: Joi.optional().allow(null).error(new Error('Everflow networks is not allowed to be empty')),
    offer: Joi.optional().allow(null).error(new Error('Everflow offers is not allowed to be empty')),
    affiliate: Joi.optional().allow(null).error(new Error('Everflow affiliates is not allowed to be empty')),
    isDeleted: Joi.boolean().allow(false).error(new Error('isDeleted id is not allowed to be empty')),
    isActive: Joi.boolean().allow(true).error(new Error('isActivate id is not allowed to be empty')),
})

const validator = (data, schema) => { return schema.validate(data)};
export const addPoolValidator = (data) => validator(data, commonSchema);
export const updatePoolValidator = (data) => validator(data, commonSchema);