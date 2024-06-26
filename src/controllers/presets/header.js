
import HeaderSchema from '../../models/presets/header'
import { create, findMany, findOne, updateOne } from '../../services/db/mongo-db-definition'
import { addHeaderValidation ,updateHeaderValidation} from '../../utils/validations/joi/header';
import { getDateAsDDMMMYYYY } from '../../utils/utility';

export const addHeaderkDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name }
        const { error } = addHeaderValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const found = await findOne(HeaderSchema, { $and: [{ headerName: dataToCreate.headerName }, { isDeleted: 'false' }] });
        if (found) {
            return res.found({ message: "Header Name already exist" });
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
        const result = await findMany(HeaderSchema, { isDeleted: false }, { sort: { createdAt: -1 } });
        const data = result.map((item) => ({
            ...item._doc,
            createdAt: getDateAsDDMMMYYYY(item.createdAt),
            updatedAt: getDateAsDDMMMYYYY(item.updatedAt)
        }))
        const header = [
            { headerName: "Header Name", field: "headerName", filter: true, },
            { headerName: "Header Message", field: "headerMessage", filter: true },
            { headerName: "Associted Id", field: "associtedId", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Updated By", field: "updatedBy", filter: true },
            { headerName: "Is Active", field: "isActive", filter: true },
            { headerName: "Is Deleted", field: "isDeleted", filter: true },
            { headerName: "Created At", field: "createdAt", filter: true },
            { headerName: "Updated At", field: "updatedAt", filter: true },
        ]
        res.success({ data: { header, data } })
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateHeaderkDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name }
        const { error } = updateHeaderValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const found = await findOne(HeaderSchema, { $and: [{ headerName: dataToUpdate.headerName }, { isDeleted: 'false' }] });
        if (found) {
            return res.found({ message: "Header Name already exist" });
        }
        const result = await updateOne(HeaderSchema, { '_id': id }, { '$set': dataToUpdate });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError()
    }
}

export const activeInactiveHeaders = async (req, res) => {
    try {
        const id = req.params.id;
        const { data, user } = req.body;
        const dataToactiveInactive = { ...data,  updatedId: user.id, updatedBy: user.name };
        const { error } = updateHeaderValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const result = await updateOne(HeaderSchema, { '_id': id }, { '$set': dataToactiveInactive });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError()
    }
}

export const deleteHeaders = async (req, res) => {
    try {
        const id = req.params.id;
        const { data, user } = req.body;
        const dataToactiveInactive = { ...data,  deletedId: user.id, deletedBy: user.name };
        const { error } = updateHeaderValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const result = await updateOne(HeaderSchema, { '_id': id }, { '$set': dataToactiveInactive });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError()
    }
}