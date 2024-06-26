import { populate } from "dotenv";
import OfferSchema from "../../models/presets/offer";
import { create, findMany, findOne, updateOne, populate } from "../../services/db/mongo-db-definition";
import { addPoolValidator, updatePoolValidator } from "../../utils/validations/joi/offer";
import PortalSchema from "../../models/portal-platform/portal";

export async function addOfferDetails(req, res) {
    try {
        const addToData = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } };

        const { error } = addPoolValidator(req.body.data);
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await findOne(OfferSchema, { $and: [{ offerName: addToData.offerName }, { isDeleted: false }] });
        const maxID = await OfferSchema.findOne().sort('-offerID').select('offerID');
        let newOfferID = 1;
        if (maxID && maxID.offerID) {
            newOfferID = maxID.offerID + 1;
        }
        addToData.offerID = newOfferID;
        if (!existing) {
            const results = await create(OfferSchema, addToData)
            return res.success({ data: { insertedId: results._id }, message: "offer data added successfully" });
        } else {
            return res.found({ message: "offer already exist" });
        }
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

// export async function getAllOffers(req, res) {
//     try {
//         const result = await findMany(OfferSchema, { isDeleted: false }, {}, { sort: { createdAt: -1 } });
//         const data = result.map(item => ({
//             offerName: item.offerName,
//             offerLink: item.offerLink,
//             personalUnsub: item.personalUnsub,
//             networkUnsub: item.networkUnsub,
//             verticalId: item.verticalId,
//             subVerticalId: item.subVerticalId,
//             method: item.method,
//             associatedId: item.associatedId,
//             portal: item.portal,
//             network: item.network,
//             offer: item.offer,
//             affiliate: item.affiliate,
//             createdAt: item.createdAt,
//             createdId: item.createdId,
//             createdBy: item.createdBy,
//             updatedAt: item.updatedAt,
//             updatedId: item.updatedId,
//             updatedBy: item.updatedBy,
//             deletedId: item.deletedId,
//             deletedBy: item.deletedBy,
//             isDeleted: item.isDeleted,
//             isActive: item.isActive,
//         }))
//         if (!result) return res.notFound({ message: "offer data not found" })
//         const headers = [
//             { fieldName: "Offer Name", field: "offerName", filter: true},
//             { fieldName: "Offer Id", field: "offerId", filter: true },
//             { fieldName: "Portal Name", field: "networkPortalList.networkPortalName", filter: true },
//             { fieldName: "Advertiser Id", field: "network.network_advertiser_id", filter: true },
//             { fieldName: "Advertiser Name", field: "network.name", filter: true },
//             { fieldName: "Advertiser Name", field: "network.name", filter: true },
//             { fieldName: "Affiliate Id", field: "affiliate.network_affiliate_id", filter: true },
//             { fieldName: "Affiliate Name", field: "affiliate.name", filter: true },
//             { fieldName: "URL", field: "offerLink", filter: true },
//             { fieldName: "Payout", field: "payout", filter: true },
//             { fieldName: "Payment Term", field: "paymentType", filter: true },
//             { fieldName: "Created By", field: "createdBy", filter: true },
//             { fieldName: "Created At", field: "createdAt", filter: true },
//         ]
//         return res.success({ data: { headers, data }, message: "offer data get successfully" })
//     } catch (error) {
//         console.error(error);
//         return res.internalServerError();
//     }
// }

export async function getAllOffers(req, res) {
    try {
        const result = await populate(OfferSchema, { isDeleted: false }, {}, "portal");
        const data = result.map(item => ({
            offerName: item.offerName,
            offerLink: item.offerLink,
            personalUnsub: item.personalUnsub,
            networkUnsub: item.networkUnsub,
            verticalId: item.verticalId,
            subVerticalId: item.subVerticalId,
            method: item.method,
            associatedId: item.associatedId,
            portal: item.portal,
            network: item.network,
            offer: item.offer,
            affiliate: item.affiliate,
            createdAt: item.createdAt,
            createdId: item.createdId,
            createdBy: item.createdBy,
            updatedAt: item.updatedAt,
            updatedId: item.updatedId,
            updatedBy: item.updatedBy,
            deletedId: item.deletedId,
            deletedBy: item.deletedBy,
            isDeleted: item.isDeleted,
            isActive: item.isActive,
        }))
        if (!result) return res.notFound({ message: "offer data not found" })
        const headers = [
            { fieldName: "Offer Name", field: "offerName", filter: true},
            { fieldName: "Offer Id", field: "offerId", filter: true },
            { fieldName: "Portal Name", field: "networkPortalList.networkPortalName", filter: true },
            { fieldName: "Advertiser Id", field: "network.network_advertiser_id", filter: true },
            { fieldName: "Advertiser Name", field: "network.name", filter: true },
            { fieldName: "Advertiser Name", field: "network.name", filter: true },
            { fieldName: "Affiliate Id", field: "affiliate.network_affiliate_id", filter: true },
            { fieldName: "Affiliate Name", field: "affiliate.name", filter: true },
            { fieldName: "URL", field: "offerLink", filter: true },
            { fieldName: "Payout", field: "payout", filter: true },
            { fieldName: "Payment Term", field: "paymentType", filter: true },
            { fieldName: "Created By", field: "createdBy", filter: true },
            { fieldName: "Created At", field: "createdAt", filter: true },
        ]
        return res.success({ data: { headers, data }, message: "offer data get successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export async function getOfferById(req, res) {
    try {
        const { id } = req.params;
        const result = await findOne(OfferSchema, { _id: id });
        if (!result) { return res.notFound({ message: "offer data not found" }) }
        return res.success({ data: result, message: "offer data get successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export async function updateOfferDetails(req, res) {
    try {
        const { id } = req.params;
        const updateToData = { ...req.body.data, ...{ updatedId: req.body.user.id, updatedBy: req.body.user.name } };

        const { error } = updatePoolValidator(req.body.data);
        if (error) { return res.validationError({ message: error.message }); }
        const result = await updateOne(OfferSchema, { _id: id }, updateToData);
        if (!result) {
            return res.notFound("offer data not found")
        }
        return res.success({ data: { insertedId: result._id }, message: "offer details updated successfully" });
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export async function activeInactiveDatabaseDetails(req, res) {
    try {
        const { id } = req.params;
        const existing = await findOne(OfferSchema, { _id: id });
        if (!existing) return res.notFound({ message: "offer data not found" });

        existing.isActive === true ? existing.isActive = false : existing.isActive = true;

        const result = await updateOne(OfferSchema, { _id: id }, existing)
        return res.success({ data: { updatedId: result._id }, message: "offer active status updated successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export async function softDeleteDatabaseDetails(req, res) {
    try {
        const { id } = req.params;
        const deleteToData = { deletedId: req.body.user.id, deletedBy: req.body.user.name }
        const existing = await findOne(OfferSchema, { _id: id });
        if (!existing) return res.notFound({ message: "offer data not found" });
        if (existing.isActive === true) return res.failure({ message: "please inActive offer, before delete" });

        existing.isDeleted = true;
        existing.deletedId = deleteToData.deletedId;
        existing.deletedBy = deleteToData.deletedBy;

        const result = await updateOne(OfferSchema, { _id: id }, existing)
        return res.success({ data: { updatedId: result._id }, message: "offer data deleted successfully" })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}


