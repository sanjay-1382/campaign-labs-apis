import MenuDetails from "../../../models/campaign-journey/controls/menus";
import { create, findMany } from "../../../services/db/mongo-db-definition";

export const addMenuDetails = async (req, res) => {
    try {
        const { itemData } = req.body;
        const dataToCreate = { ...itemData };
        const result = await create(MenuDetails, dataToCreate);
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export const findAllMenuDetails = async (req, res) => {
    try {
        const result = await findMany(MenuDetails);
        return res.success({ data: result[0].itemData });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}