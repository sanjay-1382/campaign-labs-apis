import NetworkSchema from '../../models/presets/network';
import { create, updateOne, findMany, findOne, populate, findMaxValue } from '../../services/db/mongo-db-definition'
import { addNetworkValidation, updateNetworkValidation } from '../../utils/validations/joi/presets/network';
import { getDateAsDDMMMYYYY } from '../../utils/utility';

export const addNetworkDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        console.log(data);
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name }
        const { error } = addNetworkValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const found = await findOne(NetworkSchema, { $and: [{ networkName: dataToCreate.networkName }, { isDeleted: 'false' }] });
        if (found) { return res.found({ message: "Network Name already exist" }); }
        const maxId = await findMaxValue(NetworkSchema, {}, { sort: { networkId: -1 } });
        let newNetworkId = 1;
        if (maxId[0]?.networkId) { newNetworkId = maxId[0].networkId + 1; }
        dataToCreate.networkId = newNetworkId;
        const result = await create(NetworkSchema, dataToCreate);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const getAllNetworkDetails = async (req, res) => {
    try {
        const result = await populate(NetworkSchema, {}, 'portal');
        const data = result.map((item) => ({
            _id: item._id,
            associatedId: item.associatedId,
            networkId: item.networkId,
            networkName: item.networkName,
            countryId: item.countryId,
            countryName: item.countryName,
            portalId: item.portal._id,
            portalName: item.portal.portalName,
            createdId: item.createdId,
            createdBy: item.createdBy,
            isActive: item.isActive,
            isDeleted: item.isDeleted,
            createdAt: getDateAsDDMMMYYYY(item.createdAt),
            updatedAt: getDateAsDDMMMYYYY(item.updatedAt)
        }))
        const headers = [
            { headerName: "Network Id", field: "networkId", filter: true, pinned: 'left', width: 300 },
            { headerName: "Network Name", field: "networkName", filter: true },
            { headerName: "Portal Id", field: "portalId", filter: true },
            { headerName: "Portal Name", field: "portalName", filter: true },
            { headerName: "Associated Id", field: "associatedId", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Updated By", field: "updatedBy", filter: true },
            { headerName: "Deleted By", field: "deletedBy", filter: true },
            { headerName: "Is Active", field: "isActive", filter: true },
            { headerName: "Is Deleted", field: "isDeleted", filter: true },
            { headerName: "Created At", field: "createdAt", filter: true },
            { headerName: "Updated At", field: "updatedAt", filter: true },
        ];
        res.success({ data: { headers, data } })
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateNetworkDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name }
        const { error } = updateNetworkValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const found = await findOne(NetworkSchema, { networkName: dataToUpdate.networkName });
        if (found) {
            return res.found({ message: "Network Name already exist" });
        }
        const result = await updateOne(NetworkSchema, { '_id': id }, { '$set': dataToUpdate });
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

export const activeInactiveHeaders = async (req, res) => {
    try {
        const id = req.params.id;
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name }
        const { error } = updateNetworkValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const result = await updateOne(NetworkSchema, { '_id': id }, { '$set': dataToUpdate });
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

