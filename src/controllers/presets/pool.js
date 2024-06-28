import PoolSchema from "../../models/presets/pool";
import { findOne, create, findMany, deleteOne, updateOne } from "../../services/db/mongo-db-definition";
import { addPoolValidator } from '../../utils/validations/joi/presets/pool';
import { ObjectId } from 'mongodb';
import moment from 'moment';

export const addPoolDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name };
        const { error } = addPoolValidator(dataToCreate);
        if (error) { return res.validationError({ message: error.message }); }
        const existing = await findOne(PoolSchema, { name: dataToCreate.poolName });
        if (existing) { return res.found({ message: "Pool name already exists, please take a different name." }); }
        const result = await create(PoolSchema, dataToCreate);
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export const getPoolDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) { return res.validationError({ message: 'Invalid objectId! Please check again.' }); }
        const query = { _id: id };
        const options = {};
        const result = await findOne(PoolSchema, query, options);
        if (!result) { return res.notFound({ message: "No data found" }); }
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export async function getAllPoolDetails(req, res) {
    try {
        const result = await findMany(PoolSchema, {}, {}, { sort: { createdAt: -1 } });
        if (!result?.length) { return res.notFound({ message: "No data found" }); }
        const data = result.map(item => ({
            _id: item._id,
            associtedId: item.associtedId,
            poolName: item.poolName,
            poolType: item.poolType,
            poolValue: item.poolValue,
            journeyType: item.journeyType,
            active: item.active,
            status: item.status,
            createdAt: moment.utc(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            createdBy: item.createdBy,
            updatedAt: moment.utc(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
            updatedBy: item.updatedBy,
            isActive: item.isActive,
            deletedBy: item.deletedBy,
        }));
        const header = [
            { headerName: "Name", field: "poolName", filter: true, },
            { headerName: "Pool Type", field: "poolType", filter: true, },
            { headerName: "Pool Value", field: "poolValue", filter: true, },
            { headerName: "Journey Type", field: "journeyType", filter: true, },
            { headerName: "Pool Active", field: "active", filter: true, },
            { headerName: "Pool Status", field: "tatus", filter: true, },
            { headerName: "Associted Id", field: "associtedId", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Updated By", field: "updatedBy", filter: true },
            { headerName: "Deleted By", field: "deletedBy", filter: true },
            { headerName: "Status", field: "isActive", filter: true },
            { headerName: "Is Deleted", field: "isDeleted", filter: true },
            { headerName: "Created At", field: "createdAt", filter: true },
            { headerName: "Updated At", field: "updatedAt", filter: true },
        ]
        return res.success({ data: { data, header } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export const poolDetailsList = async (req, res) => {
    try {
        const result = await findMany(PoolSchema);
        if (!result?.length) { return res.notFound({ message: "No data found" }); }
        const data = result.map(item => ({ label: item.poolName, value: item._id }));
        return res.success({ data });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export const updatePoolDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name };
        // const { error } = editPoolDetailsValidator(dataToUpdate);
        // if (error) { return res.validationError({ message: error.message }); }
        const query = { _id: req.params.id };
        const existing = await findOne(PoolSchema, { name: dataToUpdate.name });
        if (existing && dataToUpdate.name !== data.name) { return res.found({ message: `Pool ${existing.name} name already exists. Please choose a different name.` }); }
        // If the name is unique or unchanged, update the data
        const updateFields = { $set: { ...dataToUpdate, name: dataToUpdate.name } };
        const options = { new: true }; // Return the updated document
        const result = await updateOne(PoolSchema, query, updateFields, options);
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export const activeInactivePoolDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { isActive, remark } = req.body.data;
        const updateBody = { isActive, remark };
        const result = await updateOne(PoolSchema, query, updateBody);
        if (!result) { return res.notFound({ message: "No data found" }); }
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }

}

export const softDeletePoolDetails = async (req, res) => {
    try {
        const { id, name } = req.body.user;
        const query = { _id: req.params.id };
        const updateBody = { deletedId: id, deletedBy: name, isActive: false, isDeleted: true };
        const result = await updateOne(PoolSchema, query, updateBody);
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export const deletePoolDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const result = await deleteOne(PoolSchema, query);
        if (!result) { return res.notFound({ message: "No data found" }); }
        return res.success({ data: result });
    }
    catch (error) {
        return res.internalServerError({ message: error.message });
    }
}