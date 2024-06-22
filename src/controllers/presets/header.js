
import Header from '../../models/presets/header'
import { create, findMany, findOne, updateOne } from '../../services/db/mongo-db-definition'

export const addHeaderkDetails = async (req, res) => {
    try {
        const headerDetails = req.body;
        if (!headerDetails.headerName || !headerDetails.headerMessage) {
            return res.badRequest({ message: "Header Name And Header Message are required" });
        }
        try {
            const result = await create(Header, headerDetails);
            res.success({ data: result });
        } catch (error) {
            console.log(error);
            return res.found({ message: "Header Name already exist" })
        }
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const getAllHeaderkDetails = async (req, res) => {
    const id = { isDeleted: false };
    try {
        const result = await findMany(Header, id, {}, { sort: { createdAt: -1 } });
        const header = [
            { headerName: "Id", field: "_id", filter: true, pinned: 'left', width: 400 },
            { headerName: "Header Name", field: "headerName", filter: true },
            { headerName: "Header Message", field: "headerMessage", filter: true },
            { headerName: "Associted Id", field: "associtedId", filter: true },
            { headerName: "Created Id", field: "createdId", filter: true },
            { headerName: "Created By", field: "createdBy", filter: true },
            { headerName: "Is Active", field: "isActive", filter: true },
            { headerName: "Is Deleted", field: "isDeleted", filter: true },
            { headerName: "Created At", field: "createdAt", filter: true },
            { headerName: "Updated At", field: "updatedAt", filter: true },
        ]
        res.success({ data: { header, result } })
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const updateHeaderkDetails = async (req, res) => {
    const id = req.params.id;
    const headerDetails = req.body;
    if (!headerDetails.headerName || !headerDetails.headerMessage) {
        return res.badRequest({ message: "Header Name And Header Message are required" });
    }
    try {
        const found = await findOne(Header, { headerName: headerDetails.headerName });
        if (found) {
            return res.found({ message: "Header Name already exist" });
        }
        const result = await updateOne(Header, { '_id': id }, { '$set': headerDetails });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError()
    }
}

export const activeInactiveHeaders = async (req, res) => {
    const id = req.params.id;
    const headerDetails = req.body;
    if (!headerDetails.headerName || !headerDetails.headerMessage) {
        return res.badRequest({ message: "Header Name And Header Message are required" });
    }
    try {
        const result = await updateOne(Header, { '_id': id }, { '$set': headerDetails });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}