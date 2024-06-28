import TemplateSchema from "../../models/presets/template";
import { create, findMany, findMaxValue, findOne, updateOne } from "../../services/db/mongo-db-definition";
import { addPoolValidator, updatePoolValidator } from "../../utils/validations/joi/presets/template";
import moment from "moment";

export const addTemplateDetails = async (req, res) => {
    try {
        const dataToCreate = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } }
        const { error } = addPoolValidator(req.body.data)
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await findOne(TemplateSchema, { $and: [{ templateName: dataToCreate.templateName }, { isDeleted: false }] });
        if (existing) return res.found({ message: "Template already exist" });

        const maxId = await findMaxValue(TemplateSchema, {}, {}, { sort: { templateId: -1 } });
        let newTemplateId = 1;
        if (maxId[0]?.templateId) { newTemplateId = maxId[0].templateId + 1 }
        dataToCreate.templateId = newTemplateId;
        const result = await create(TemplateSchema, dataToCreate);
        if (result) return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const getAllTemplates = async (req, res) => {
    try {
        const result = await findMany(TemplateSchema, {}, {}, { sort: { createdAt: -1 } });
        if (!result) return res.notFound({ message: "Template data not found" });

        const data = result.map(item => ({
            _id: item._id,
            templateId: item.templateId,
            templateName: item.templateName,
            templateHtml: item.templateHtml,
            templateText: item.templateText,
            verticalId: item.verticalId,
            associatedId: item.associatedId,
            journeyId: item.journeyId,
            templateType: item.templateType,
            createdAt: moment(item.createdAt).format('DD,MMMM,YYYY, h:mm:ss'),
            createdId: item.createdId,
            createdBy: item.createdBy,
            updatedAt: moment(item.updatedAt).format('DD,MMMM,YYYY, h:mm:ss'),
            updatedId: item.updatedId,
            updatedBy: item.updatedBy,
            deletedId: item.deletedId,
            deletedBy: item.deletedBy,
            isDeleted: item.isDeleted,
            isActive: item.isActive,
        }))

        const headers = [
            { fieldName: "Template Id", field: "templateId", filter: true },
            { fieldName: "Template Name", field: "templateName", filter: true },
            { fieldName: "Template Html", field: "templateHtml", filter: true },
            { fieldName: "Template Text", field: "templateText", filter: true },
            { fieldName: "Template Type", field: "templateType", filter: true },
            { fieldName: "Created By", field: "createdBy", filter: true },
            { fieldName: "Updated By", field: "updatedBy", filter: true },
            { fieldName: "Deleted By", field: "deletedBy", filter: true },
            { fieldName: "Status", field: "isActive", filter: true },
        ];

        return res.success({ data: { headers, data } });
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const getTemplateList = async (req, res) => {
    try {
        const result = await findMany(TemplateSchema, { isDeleted: false, isActive: true }, {}, { sort: { createdAt: -1 } });
        if (!result) return res.notFound({ message: "Template data not found" });

        const data = result.map(item => ({ label: item.templateName, value: item.templateId }));
        if (data) return res.success({ data: data })

    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.notFound({ message: "Template id required" });
        const result = await findOne(TemplateSchema, { _id: id, isDeleted: false });
        if (!result) return res.notFound({ message: "Template data not found" });
        return res.success({ data: result });
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const updateTemplateDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = { ...req.body.data, ...{ updatedId: req.body.user.id, updatedBy: req.body.user.name } };
        if (!id) return res.badRequest({ message: "Template id is required" });

        const { error } = updatePoolValidator(req.body.data)
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await updateOne(TemplateSchema, { _id: id, isDeleted: false }, dataToUpdate);
        if (!existing) return res.notFound({ message: "Template data not found" })
        return res.success({ data: existing })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const activeInactiveTemplateDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = { updatedId: req.body.user.id, updatedBy: req.body.user.name }
        const existing = await findOne(TemplateSchema, { _id: id });
        if (!existing) return res.notFound({ message: "Template data not found" });

        existing.isActive === true ? existing.isActive = false : existing.isActive = true;
        existing.updatedId = dataToUpdate.updatedId;
        existing.updatedBy = dataToUpdate.updatedBy;

        const result = await updateOne(TemplateSchema, { _id: id }, existing)
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const softDeleteTemplateDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToDelete = { deletedId: req.body.user.id, deletedBy: req.body.user.name }

        const existing = await findOne(TemplateSchema, { _id: id });
        if (!existing) return res.notFound({ message: "Template data not found" });
        if (existing.isActive === true) return res.failure({ message: "Please in-active template, before delete" });

        existing.isDeleted = true;
        existing.deletedId = dataToDelete.deletedId;
        existing.deletedBy = dataToDelete.deletedBy;

        const result = await updateOne(TemplateSchema, { _id: id }, existing)
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}