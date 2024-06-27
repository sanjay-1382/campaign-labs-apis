import NetworkSchema from '../../models/presets/network';
import { create, updateOne, findOne, populate, findMaxValue } from '../../services/db/mongo-db-definition'
import { addNetworkValidation, updateNetworkValidation } from '../../utils/validations/joi/presets/network';
import moment from 'moment';


export const addNetworkDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name }
        const { error } = addNetworkValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const existing = await findOne(NetworkSchema, { $and: [{ networkName: dataToCreate.networkName }, { isDeleted: 'false' }] });
        if (existing) { return res.found({ message: "Network Name already exist" }); }
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
        const result = await populate(NetworkSchema, { isDeleted: false }, {}, 'portal', { sort: { createdAt: -1 } });
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
            createdAt: moment.utc(item.createdAt).format('DD MMMM YYYY, HH:mm:ss'),
            updatedId: item.updatedId,
            updatedBy: item.updatedBy,
            updatedAt: moment.utc(item.updatedAt).format('DD MMMM YYYY, HH:mm:ss'),
            deletedId: item.deletedId,
            deletedBy: item.deletedBy,
            isActive: item.isActive,
            isDeleted: item.isDeleted,
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
        res.success({ data: { data, headers } })
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateNetworkDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToUpdate = { ...data, updatedId: user.id, updatedBy: user.name }
        const { error } = updateNetworkValidation(data);
        if (error) { return res.validationError({ message: error.message }); }
        const existing = await findOne(NetworkSchema, { $and: [{ networkName: dataToUpdate.networkName }, { isDeleted: 'false' }] });
        if (existing) {
            return res.found({ message: "Network Name already exist" });
        }
        const result = await updateOne(NetworkSchema, query, dataToUpdate);
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

export const activeInactiveNetworkDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToactiveInactive = { ...data, updatedId: user.id, updatedBy: user.name }
        const result = await updateOne(NetworkSchema, query, dataToactiveInactive);
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

export const deleteNetworkDetails = async (req, res) => {
    try {
        const query = { _id: req.params.id };
        const { data, user } = req.body;
        const dataToDelete = { ...data, deletedId: user.id, deletedBy: user.name };
        const result = await updateOne(NetworkSchema, query, dataToDelete);
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

