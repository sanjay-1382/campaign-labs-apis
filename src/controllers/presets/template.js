import TemplateSchema from "../../models/presets/template"
import { create, findMany, findMaxValue, findOne, updateOne } from "../../services/db/mongo-db-definition"
import { getDateAsDDMMMYYYY } from "../../utils/utility"
import { addPoolValidator, updatePoolValidator } from "../../utils/validations/joi/presets/template"

export async function addTemplateDetails(req, res) {
    try {
        const addToData = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } }
        const { error } = addPoolValidator(req.body.data)
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await findOne(TemplateSchema, { $and: [{ templateName: addToData.templateName }, { isDeleted: false }] });
        if (existing) return res.found({ message: "template name already exist" });

        const maxId = await findMaxValue(TemplateSchema, {}, {}, { sort: { templateId: -1 } });
        let newTemplateId = 1;
        if (maxId[0]?.templateId) {
            newTemplateId = maxId[0].templateId + 1;
        }
        addToData.templateId = newTemplateId;
        const result = await create(TemplateSchema, addToData);
        if (result) return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function getAllTemplates(req, res) {
    try {
        const result = await findMany(TemplateSchema, { isDeleted: false }, {}, { sort: { createdAt: -1 } });
        if (!result) return res.notFound({ message: "template data not found" });

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
            createdAt: getDateAsDDMMMYYYY(item.createdAt),
            createdId: item.createdId,
            createdBy: item.createdBy,
            updatedAt: getDateAsDDMMMYYYY(item.updatedAt),
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
            { fieldName: "Created At", field: "createdAt", filter: true },
        ]

        return res.success({ data: { headers, data } });
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function getTemplateById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.notFound({ message: "template id required" });
        const result = await findOne(TemplateSchema, { _id: id, isDeleted: false });
        if (!result) return res.notFound({ message: "template data not found" });
        return res.success({ data: result });
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function updateTemplateDetails(req, res) {
    try {
        const { id } = req.params;
        const updateToData = { ...req.body.data, ...{ updatedId: req.body.user.id, updatedBy: req.body.user.name } };
        if (!id) return res.badRequest({ message: "template id is required" });

        const { error } = updatePoolValidator(req.body.data)
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await updateOne(TemplateSchema, { _id: id, isDeleted: false }, updateToData);
        if (!existing) return res.notFound({ message: "template data not found" })
        return res.success({ data: existing })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function activeInactiveTemplateDetails(req, res) {
    try {
        const { id } = req.params;
        const updateToData = { updatedId: req.body.user.id, updatedBy: req.body.user.name }
        const existing = await findOne(TemplateSchema, { _id: id });
        if (!existing) return res.notFound({ message: "template data not found" });

        existing.isActive === true ? existing.isActive = false : existing.isActive = true;
        existing.updatedId = updateToData.updatedId;
        existing.updatedBy = updateToData.updatedBy;

        const result = await updateOne(TemplateSchema, { _id: id }, existing)
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function softDeleteTemplateDetails(req, res) {
    try {
        const { id } = req.params;
        const deleteToData = { deletedId: req.body.user.id, deletedBy: req.body.user.name }

        const existing = await findOne(TemplateSchema, { _id: id });
        if (!existing) return res.notFound({ message: "template data not found" });
        if (existing.isActive === true) return res.failure({ message: "please in-active template, before delete" });

        existing.isDeleted = true;
        existing.deletedId = deleteToData.deletedId;
        existing.deletedBy = deleteToData.deletedBy;

        const result = await updateOne(TemplateSchema, { _id: id }, existing)
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}