import FooterDetails from '../../models/presets/footer';

import { create, findMany, findOne, updateOne } from '../../services/db/mongo-db-definition'

export const addFooterkDetails = async (req, res) => {
    try {
        const FooterData = req.body;
        if (!FooterData.footerName || !FooterData.footerMessage) {
            return res.badRequest({ message: "Footer Name And Footer Message are required" });
        }
        try {
            const result = await create(FooterDetails, FooterData);
            res.success({ data: result });
        } catch (error) {
            console.log(error);
            return res.found({ message: "Footer Name already exist" })
        }
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}

export const getAllFooterDetails = async (req, res) => {
    const id = { isDeleted: false };
    try {
        const result = await findMany(FooterDetails, id, {}, { sort: { createdAt: -1 } });
        const header = [
            { headerName: "Id", field: "_id", filter: true, pinned: 'left', width: 400 },
            { headerName: "Footer Name", field: "footerName", filter: true },
            { headerName: "Footer Message", field: "footerMessage", filter: true },
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

export const updateFooterkDetails = async (req, res) => {
    const id = req.params.id;
    const footerData = req.body;
    if (!footerData.footerName || !footerData.footerMessage) {
        return res.badRequest({ message: "Footer Name And Footer Message are required" });
    }
    try {
        const found = await findOne(FooterDetails, { footerName: footerData.footerName });
        if (found) {
            return res.found({ message: "Footer Name already exist" });
        }
        const result = await updateOne(FooterDetails, { '_id': id }, { '$set': footerData });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError()
    }
}

export const activeInactiveFooter = async (req, res) => {
    const id = req.params.id;
    const FooterData = req.body;
    if (!FooterData.footerName || !FooterData.footerMessage) {
        return res.badRequest({ message: "Footer Name And Footer Message are required" });
    }
    try {
        const result = await updateOne(FooterDetails, { '_id': id }, { '$set': FooterData });
        res.success({ data: result });
    } catch (error) {
        console.log(error);
        return res.internalServerError();
    }
}