import OfferSchema from "../../models/presets/offer";
import { create, findMany, findOne, updateOne } from "../../services/db/mongo-db-definition";
import { addPoolValidator, updatePoolValidator } from "../../utils/validations/joi/offer";

export async function addOfferDetails(req, res) {
    try {
        const addToData = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } };
        
        const {error} = addPoolValidator(req.body.data);
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await findOne(OfferSchema, { offerName: addToData.offerName });
        if (!existing) {
            addToData.networkPortalList = JSON.stringify(addToData.networkPortalList);
            addToData.network = JSON.stringify(addToData.network);
            addToData.offer = JSON.stringify(addToData.offer);
            addToData.affiliate = JSON.stringify(addToData.affiliate);

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
        const headers = [
    {fieldName: "offerName", field:"offerName", filter:true, pinned: "left", width:"400" },
    {fieldName: "offerGroupId", field:"offerGroupId"},
  
        ]
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
        
        const {error} = updatePoolValidator(req.body.data);
        if (error) { return res.validationError({ message: error.message }); }

        if (updateToData) {
            updateToData.networkPortalList = JSON.stringify(updateToData.networkPortalList);
            updateToData.network = JSON.stringify(updateToData.network);
            updateToData.offer = JSON.stringify(updateToData.offer);
            updateToData.affiliate = JSON.stringify(updateToData.affiliate);
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


