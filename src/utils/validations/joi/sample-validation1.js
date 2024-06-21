import joi from '@hapi/joi';

const commonSchema = joi.object({
    name: joi.string().trim().required().error(new Error('name is not allowed to be empty')),
    sourceId: joi.number().integer().allow(null, '').error(new Error('sourceId is not allowed to be empty')),
    ownerId: joi.string().trim().required().error(new Error('ownerId is not allowed to be empty')),
    location: joi.string().trim().required().error(new Error('location is not allowed to be empty')),
    dbName: joi.string().trim().required().error(new Error('db name is not allowed to be empty')),
    connectToLakehouse: joi.boolean().required().error(new Error('connect to lake house is not allowed to be empty')),
    category: joi.string().trim().required().error(new Error('category is not allowed to be empty')),
    trustFactor: joi.number().integer().min(1).error((errors) => {
        return new Error(errors.map(error => {
            switch (error.type) {
                case 'number.base': return 'trust factor is not allowed to be empty';
                case 'number.min': return 'trust factor must be not less than 1';
                default: return error.message;
            }
        }).join('; '));
    }),
    dupeCheck: joi.boolean().required().error(new Error('duplicate check is not allowed to be empty')),
    badCheck: joi.boolean().required().error(new Error('bad check is not allowed to be empty')),
    emailVerification: joi.boolean().required().error(new Error('email verification is not allowed to be empty')),
    remark: joi.optional().allow('').error(new Error('remark is not allowed to be empty')),
});

const remarkSchema = joi.object({
    remark: joi.optional().allow('').error(new Error('remark is not allowed to be empty')),
});

const validator = (data, schema) => { return schema.validate(data); };
export const addImportDataSourceValidator = (data) => validator(data, commonSchema);
export const editImportDataSourceValidator = (data) => validator(data, commonSchema);
export const softDeleteImportDataSourceValidator = (data) => validator(data, remarkSchema);
export const deleteImportDataSourceValidator = (data) => validator(data, remarkSchema);