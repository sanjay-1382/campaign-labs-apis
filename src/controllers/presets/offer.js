import OfferSchema from "../../models/presets/offer";
import { create, findMaxValue, findOne, findMany, populate, updateOne } from "../../services/db/mongo-db-definition";
import { addPoolValidator, updatePoolValidator } from "../../utils/validations/joi/presets/offer";
import moment from "moment";

export const addOfferDetails = async (req, res) => {
    try {
        const dataToCreate = { ...req.body.data, ...{ createdId: req.body.user.id, createdBy: req.body.user.name } };

        const { error } = addPoolValidator(req.body.data);
        if (error) { return res.validationError({ message: error.message }); }

        const existing = await findOne(OfferSchema, { $and: [{ offerName: dataToCreate.offerName }, { isDeleted: false }] });
        const maxId = await findMaxValue(OfferSchema, {}, {}, { sort: { offerId: -1 } });
        let newOfferId = 1;
        if (maxId[0]?.offerId) { newOfferId = maxId[0].offerId + 1; }
        dataToCreate.offerId = newOfferId;
        if (!existing) {
            const results = await create(OfferSchema, dataToCreate)
            return res.success({ data: results });
        } else {
            return res.found({ message: "Offer already exist" });
        }
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const getAllOffers = async (req, res) => {
    try {
        const result = await populate(OfferSchema, {}, {}, "portal network offer affiliate");
        const data = result.map(item => ({
            _id: item._id,
            offerId: item.offerId,
            offerName: item.offerName,
            portalName: item.portal.portalName,
            networkId: item.network.network_advertiser_id,
            networkName: item.network.name,
            affiliateId: item.affiliate.network_affiliate_id,
            affiliateName: item.affiliate.name,
            offerLink: item.offerLink,

            personalUnsub: item.personalUnsub,
            networkUnsub: item.networkUnsub,
            verticalId: item.verticalId,
            subVerticalId: item.subVerticalId,
            method: item.method,
            associatedId: item.associatedId,
            portalId: item.portal._id,

            createdAt: moment(item.createdAt).format('DD,MMMM,YYYY, h:mm:ss'),
            createdId: item.createdId,
            createdBy: item.createdBy,
            updatedAt: moment(item.updatedAt).format('DD,MMMM,YYYY, h:mm:ss'),
            updatedId: item.updatedId,
            updatedBy: item.updatedBy,
            deletedId: item.deletedId,
            deletedBy: item.deletedBy,
            isDeleted: item.isDeleted,
            isActive: item.isActive,
        }))
        if (!result) return res.notFound({ message: "Offer data not found" })
        const headers = [
            { fieldName: "Offer Name", field: "offerName", filter: true },
            { fieldName: "Portal Name", field: "portalName", filter: true },
            { fieldName: "Network Name", field: "networkName", filter: true },
            { fieldName: "Affiliate Name", field: "affiliateName", filter: true },
            { fieldName: "Offer Link", field: "offerLink", filter: true },
            { fieldName: "createdBy", field: "createdBy", filter: true },
            { fieldName: "updatedBy", field: "updatedBy", filter: true },
            { fieldName: "deletedBy", field: "deletedBy", filter: true },
            { fieldName: "status", field: "isActive", filter: true },
        ]
        return res.success({ data: { headers, data } })
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export const getOfferList = async (req, res) => {
    try{
        const result = await findMany(OfferSchema, { isDeleted: false, isActive: true }, {}, { sort: { createdAt: -1 } });
        if (!result) return res.notFound({ message: "Offer data not found" });

        const data = result.map(item => ({ label: item.offerName, value: item.offerId }));
        if (data) return res.success({ data: data })
    }catch(error){
        console.error(error);
        return res.internalServerError();
    }
}

export const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await findOne(OfferSchema, { _id: id });
        if (!result) { return res.notFound({ message: "Offer data not found" }) }
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export const updateOfferDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = { ...req.body.data, ...{ updatedId: req.body.user.id, updatedBy: req.body.user.name } };

        const { error } = updatePoolValidator(req.body.data);
        if (error) { return res.validationError({ message: error.message }); }
        const result = await updateOne(OfferSchema, { _id: id }, dataToUpdate);
        if (!result) {
            return res.notFound("Offer data not found")
        }
        return res.success({ data: result });
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}

export const activeInactiveOfferDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = { ...req.body.data, ...{ updatedId: req.body.user.id, updatedBy: req.body.user.name } };
        const existing = await findOne(OfferSchema, { _id: id });
        if (!existing) return res.notFound({ message: "Offer data not found" });

        existing.isActive === true ? existing.isActive = false : existing.isActive = true;
        existing.updatedId = dataToUpdate.updatedId;
        existing.updatedBy = dataToUpdate.updatedBy;

        const result = await updateOne(OfferSchema, { _id: id }, existing)
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}

export const softDeleteOfferDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToDelete = { deletedId: req.body.user.id, deletedBy: req.body.user.name }
        const existing = await findOne(OfferSchema, { _id: id });
        if (!existing) return res.notFound({ message: "Offer data not found" });
        if (existing.isActive === true) return res.failure({ message: "Please inActive offer, before delete" });

        existing.isDeleted = true;
        existing.deletedId = dataToDelete.deletedId;
        existing.deletedBy = dataToDelete.deletedBy;

        const result = await updateOne(OfferSchema, { _id: id }, existing)
        return res.success({ data: result })
    } catch (error) {
        console.error(error);
        return res.internalServerError()
    }
}


