import PoolSchema from "../../models/presets/pool";
import { findOne, create, findMany } from "../../services/db/mongo-db-definition";
import { addPoolValidator } from '../../utils/validations/joi/presets/pool';

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

export async function getAllPoolDetails(req, res) {
    try {
        const result = await findMany(PoolSchema, {}, { sort: { createdAt: -1 } });
        return res.success({ data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}