import NetworkSchema from '../../models/presets/network';
import { create, updateOne, findMany, findOne } from '../../services/db/mongo-db-definition'

export const addNetworkSchema = async (req, res) => {
    const dataToCreate = req.body;
    try {
        try {
            const result = await create(NetworkSchema, dataToCreate);
            res.success({ data: result })
        } catch (error) {
            console.error("Error inserting data: ", error);
            return res.found({ message: `Affiliates Name already exist` })
        }
    } catch (error) {
        return res.internalServerError();
    }
}

export const getAllNetworkDetails = async (req, res) => {
    const id = { isDeleted: false };
    try {
        const data = await findMany(NetworkSchema, id, {}, { sort: { createdAt: -1 } });
        const headers = [
            { headerName: "Portal Name", field: "portalName", filter: true, pinned: 'left', width: 400 },
            { headerName: "Prtal Id", field: "prtalId", filter: true },
            { headerName: "Affiliates Id", field: "affiliatesId", filter: true },
            { headerName: "Affiliates Name", field: "affiliatesName", filter: true },
            { headerName: "Advertiser Id", field: "advertiserId", filter: true },
            { headerName: "Advertiser Name", field: "advertiserName", filter: true },
            { headerName: "Created Id", field: "createdId", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Is Deleted", field: "isDeleted", filter: true },
            { headerName: "Is Active", field: "isActive", filter: true },
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
    const id = req.params.id;
    const updateData = req.body;
    try {
        const found = await findOne(NetworkSchema, { affiliatesName: updateData.affiliatesName });
        if (found) {
            return res.found({ message: "Header Name already exist" });
        }
        const result = await updateOne(NetworkSchema, { '_id': id }, { '$set': updateData });
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

export const activeInactiveHeaders = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const result = await updateOne(NetworkSchema, { '_id': id }, { '$set': updateData });
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

