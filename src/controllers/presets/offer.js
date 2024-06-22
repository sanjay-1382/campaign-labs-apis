import OfferSchema from "../../models/presets/offer";
import { create, findMany, findOne, updateOne } from "../../services/db/mongo-db-definition";

export async function addOfferDetails(req, res) {
    try {
        const addToData = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } };
        if (!addToData.offerName || !addToData.verticalId || !addToData.categoryId || !addToData.offerLink) {
            return res.badRequest({ message: "Please enter required details" });
        }
        const existing = await findOne(OfferSchema, { offerName: addToData.offerName });
        if (!existing) {
            addToData.networkId = addToData.everFlowOffers.networkId;
            addToData.networkPortalList = JSON.stringify(addToData.networkPortalList);
            addToData.everFlowNetworks = JSON.stringify(addToData.everFlowNetworks);
            addToData.everFlowOffers = JSON.stringify(addToData.everFlowOffers);
            addToData.everFlowAffiliates = JSON.stringify(addToData.everFlowAffiliates);

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

export async function getAllOffers(req, res) {
    try {
        const result = await findMany(OfferSchema, {}, {}, { sort: { createdAt: -1 } });
        if (!result) return res.notFound({ message: "offer data not found" })
        return res.success({ data: result, message: "offer data get successfully" })
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
        if (updateToData) {
            updateToData.networkId = updateToData.everFlowOffers.networkId;
            updateToData.networkPortalList = JSON.stringify(updateToData.networkPortalList);
            updateToData.everFlowNetworks = JSON.stringify(updateToData.everFlowNetworks);
            updateToData.everFlowOffers = JSON.stringify(updateToData.everFlowOffers);
            updateToData.everFlowAffiliates = JSON.stringify(updateToData.everFlowAffiliates);
        }
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


