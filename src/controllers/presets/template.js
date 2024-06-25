import TemplateSchema from "../../models/presets/template"
import { create, findMany, findOne, updateOne } from "../../services/db/mongo-db-definition"
import { addPoolValidator, updatePoolValidator } from "../../utils/validations/joi/template"

export async function addTemplateDetails(req, res) {
    try {
        const addToData = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } }
        const {error} = addPoolValidator(req.body.data) 
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await findOne(TemplateSchema, { templateName: addToData.templateName });
        if (existing) return res.found({ message: "template already exist" });

        const result = await create(TemplateSchema, addToData);
        if (result) return res.success({ data: { insertdeId: result._id }, message: "template data added successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function getAllTemplates(req, res) {
    try {
        const result = await findMany(TemplateSchema);
        if (!result) return res.notFound({ message: "template data not found" });

        return res.success({ data: result, message: "template data get successfully" });
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function getTemplateById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.notFound({ message: "template id required" });
        const result = await findOne(TemplateSchema, { _id: id });
        if (!result) return res.notFound({ message: "template data not found" });
        return res.success({ data: result, message: "template data get successfully" });
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

        const {error} = updatePoolValidator(req.body.data) 
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await updateOne(TemplateSchema, { _id: id }, updateToData);
        if (!existing) return res.notFound({ message: "template data not found" })
        return res.success({ data: { updatedId: existing._id }, message: "template data updated successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function activeInactiveDatabaseDetails(req, res) {
    try {
        const { id } = req.params;
        const existing = await findOne(TemplateSchema, { _id: id });
        if (!existing) return res.notFound({ message: "template data not found" });

        existing.isActive === true ? existing.isActive = false : existing.isActive = true;

        const result = await updateOne(TemplateSchema, { _id: id }, existing)
        return res.success({ data: { updatedId: result._id }, message: "template active status updated successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function softDeleteDatabaseDetails(req, res) {
    try {
        const { id } = req.params;
        const existing = await findOne(TemplateSchema, { _id: id });
        if (!existing) return res.notFound({ message: "template data not found" });
        if (existing.isActive === true) return res.failure({ message: "please inActive template, before delete" });

        existing.isDeleted = true;

        const result = await updateOne(TemplateSchema, { _id: id }, existing)
        return res.success({ data: { updatedId: result._id }, message: "template data deleted successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}