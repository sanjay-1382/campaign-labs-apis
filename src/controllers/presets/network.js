
import NetworkDetails from '../../models/presets/network';
import { create, updateOne, findMany } from '../../services/db/mongo-db-definition'

export const addNetworkDetails = async (req, res) => {
    const dataToCreate = req.body;
    try {
        try {
            const result = await create(NetworkDetails, dataToCreate);
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
    const val = false;
    try {
        const networkData = await findMany(NetworkDetails, { isDeleted: val }, {}, { sort: { createdAt: -1 } });
        res.success({ data: networkData })
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateNetworkDetails = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const result = await updateOne(NetworkDetails, { _id: id }, { $set: updateData });
        res.success({ data: result })
    } catch (error) {
        console.log(error);
        res.internalServerError();
    }
}

