import HeaderSchema from '../../models/presets/header'
import { create, findMany, findOne, updateOne } from '../../services/db/mongo-db-definition'
import { addHeaderValidation, updateHeaderValidation } from '../../utils/validations/joi/presets/header';
import moment from 'moment';

export const addHeaderkDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name };
        const { error } = addHeaderValidation(data);
        if (error) { return res.validationError({ message: error.message }) };
        const existing = await findOne(HeaderSchema, { $and: [{ headerName: dataToCreate.headerName }, { isDeleted: 'false' }] });
        if (existing) {
            return res.found({ message: "Header name already exist" });
        }
        const result = await create(HeaderSchema, dataToCreate);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const getAllHeaderkDetails = async (req, res) => {
    try {
        const result = await findMany(HeaderSchema, { isDeleted: false }, {}, { sort: { createdAt: -1 } });
        const data = result.map((item) => ({
            headerName: item.headerName,
            headerMessage: item.headerMessage,
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
        }))
        const header = [
            { headerName: "Name", field: "headerName", filter: true, },
            { headerName: "Message", field: "headerMessage", filter: true },
            { headerName: "Associted Id", field: "associtedId", filter: true },
            { headerName: "Created At", field: "createdAt", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Updated At", field: "updatedAt", filter: true },
            { headerName: "Updated By", field: "updatedBy", filter: true },
            { headerName: "Deleted By", field: "deletedBy", filter: true },
            { headerName: "Status", field: "isActive", filter: true },
            // { headerName: "Is Deleted", field: "isDeleted", filter: true },
        ]
        res.success({ data: { header, data } })
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateHeaderkDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name };
        const { error } = updateHeaderValidation(data);
        if (error) { return res.validationError({ message: error.message }) };
        const existing = await findOne(HeaderSchema, { $and: [{ headerName: dataToUpdate.headerName }, { isDeleted: 'false' }] });
        if (existing) {
            return res.found({ message: "Header Name already exist" });
        }
        const result = await updateOne(HeaderSchema, query, dataToUpdate);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const activeInactiveHeadersDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToactiveInactive = { ...data, updatedId: user.id, updatedBy: user.name };
        const result = await updateOne(HeaderSchema, query, dataToactiveInactive);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const deleteHeadersDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToactiveInactive = { ...data, deletedId: user.id, deletedBy: user.name };
        const result = await updateOne(HeaderSchema, query, dataToactiveInactive);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}