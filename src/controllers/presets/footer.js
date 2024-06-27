import FooterSchema from '../../models/presets/footer';
import { create, findMany, findOne, updateOne } from '../../services/db/mongo-db-definition'
import { addFooterValidation, updateFooterValidation } from '../../utils/validations/joi/presets/footer';
import moment from 'moment';

export const addFooterDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name };
        const { error } = addFooterValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const existing = await findOne(FooterSchema, { $and: [{ footerName: dataToCreate.footerName }, { isDeleted: 'false' }] });
        if (existing) { return res.found({ message: "Footer Name already exist" }); }
        const result = await create(FooterSchema, dataToCreate);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const getAllFooterDetails = async (req, res) => {
    try {
        const result = await findMany(FooterSchema, { isDeleted: false }, {}, { sort: { createdAt: -1 } });
        const data = result.map((item) => ({
            _id: item._id,
            footerName: item.footerName,
            footerMessage: item.footerMessage,
            associtedId: item.associtedId,
            createdId: item.createdId,
            createdBy: item.createdBy,
            createdAt: moment(item.createdAt).format('DD MMMM YYYY, HH:mm:ss'),
            updatedId: item.updatedId,
            updatedBy: item.updatedBy,
            updatedAt: moment(item.updatedAt).format('DD MMMM YYYY, HH:mm:ss'),
            deletedId: item.deletedId,
            deletedBy: item.deletedBy,
            isActive: item.isActive,
            isDeleted: item.isDeleted,
        }));
        const header = [
            { headerName: "Footer Name", field: "footerName", filter: true, },
            { headerName: "Footer Message", field: "footerMessage", filter: true },
            { headerName: "Associted Id", field: "associtedId", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Updated By", field: "updatedBy", filter: true },
            { headerName: "Deleted By", field: "deletedBy", filter: true },
            { headerName: "Status", field: "isActive", filter: true },
            { headerName: "Is Deleted", field: "isDeleted", filter: true },
            { headerName: "Created At", field: "createdAt", filter: true },
            { headerName: "Updated At", field: "updatedAt", filter: true },
        ]
        res.success({ data: { data, header } });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateFooterDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name };
        const { error } = updateFooterValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const existing = await findOne(FooterSchema, { $and: [{ footerName: dataToUpdate.footerName }, { isDeleted: 'false' }] });
        if (existing) { return res.found({ message: "Footer Name already exist" }); }
        const result = await updateOne(FooterSchema, query, dataToUpdate);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError()
    }
}

export const activeInactiveFooterDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToActiveInactive = { ...data, updatedId: user.id, updatedBy: user.name };
        const result = await updateOne(FooterSchema, query, dataToActiveInactive);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const deleteFooterDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToDelete = { ...data, deletedId: user.id, deletedBy: user.name };
        const result = await updateOne(FooterSchema, query, dataToDelete);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}
