import joi from '@hapi/joi';

const commonSchema = joi.object({
    name: joi.string().trim().required().error(new Error('name is not allowed to be empty')),
    sourceId: joi.string().trim().allow(null).allow('').error(new Error('sourceId is not allowed to be empty')),
    threadId: joi.optional().allow('').error(new Error('threadId is not allowed to be empty')),
    refreshDuration: joi.string().trim().required().error(new Error('refreshDuration is not allowed to be empty')),
    dataSendCount: joi.string().trim().required().error(new Error('dataSendCount is not allowed to be empty')),
    dataSendHourlyCount: joi.string().trim().required().error(new Error('dataSendHourlyCount is not allowed to be empty')),
    dataDelay: joi.string().trim().required().error(new Error('dataDelay is not allowed to be empty')),
    dataKey: joi.string().trim().required().error(new Error('dataKey is not allowed to be empty')),
    recordImportDate: joi.string().trim().required().error(new Error('recordImportDate is not allowed to be empty')),
    monday: joi.boolean().optional().allow('').error(new Error('monday is not allowed to be empty')),
    tuesday: joi.boolean().optional().allow('').error(new Error('tuesday is not allowed to be empty')),
    wednesday: joi.boolean().optional().allow('').error(new Error('wednesday is not allowed to be empty')),
    thursday: joi.boolean().optional().allow('').error(new Error('thursday is not allowed to be empty')),
    friday: joi.boolean().optional().allow('').error(new Error('friday is not allowed to be empty')),
    saturday: joi.boolean().optional().allow('').error(new Error('saturday is not allowed to be empty')),
    sunday: joi.boolean().optional().allow('').error(new Error('sunday is not allowed to be empty')),
    exportType: joi.string().trim().required().error(new Error('exportType is not allowed to be empty')),
    exportMinDay: joi.optional().allow('').error(new Error('exportMinDay is not allowed to be empty')),
    exportMaxDay: joi.optional().allow('').error(new Error('exportMaxDay is not allowed to be empty')),
    dataSourceId: joi.string().trim().required().error(new Error('dataSourceId is not allowed to be empty')),
    conditionA: joi.optional().allow('').error(new Error('conditionA is not allowed to be empty')),
    conditionB: joi.optional().allow('').error(new Error('conditionB is not allowed to be empty')),
    description: joi.string().trim().required().error(new Error('description is not allowed to be empty')),
    remark: joi.optional().allow('').error(new Error('remark is not allowed to be empty')),
});

const remarkSchema = joi.object({
    remark: joi.optional().allow('').error(new Error('remark is not allowed to be empty')),
});

const validator = (data, schema) => { return schema.validate(data); };
export const addExportDataSourceConfigValidator = (data) => {
    const addExportDataSourceConfig = commonSchema();
    addExportDataSourceConfig.id = optional().allow('').error(() => ({ message: 'ObjectId is not allowed to be empty' }));
    return validator(data, addExportDataSourceConfig);
};
export const editExportDataSourceConfigValidator = (data) => validator(data, commonSchema);
export const softDeleteExportDataSourceConfigValidator = (data) => validator(data, remarkSchema);
export const deleteExportDataSourceConfigValidator = (data) => validator(data, remarkSchema);