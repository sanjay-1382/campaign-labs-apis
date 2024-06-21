import joi from '@hapi/joi';

const commonSchema = joi.object({
    poolName: joi.string().trim().required().error(new Error('Pool name is not allowed to be empty')),
    poolType: joi.string().trim().required().error(new Error('Pool type is not allowed to be empty')),
    createdId: joi.number().integer().error(new Error('User Id is not allowed to be empty')),
    createdBy: joi.optional().allow('').error(new Error('User name is not allowed to be empty')),
    remark: joi.optional().allow('').error(new Error('remark is not allowed to be empty')),
});

const remarkSchema = joi.object({
    remark: joi.optional().allow('').error(new Error('remark is not allowed to be empty')),
});

const validator = (data, schema) => { return schema.validate(data); };
export const addPoolValidator = (data) => validator(data, commonSchema);
export const editPoolValidator = (data) => validator(data, commonSchema);
export const softDeletePoolValidator = (data) => validator(data, remarkSchema);
export const deletePoolValidator = (data) => validator(data, remarkSchema);