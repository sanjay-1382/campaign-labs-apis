import { deleteMany, findMany } from "../../services/db/mongo-db-definition.js";
import { storeAffiliates, storeAdvertisers, storeOffers } from "../../services/portal-platform/everflow.js";
import EverFlowAffiliateSchema from "../../models/portal-platform/everflow/affiliates.js";
import EverFlowAdvertiserSchema from "../../models/portal-platform/everflow/advertisers.js";
import EverFlowOfferSchema from "../../models/portal-platform/everflow/offers.js";

export async function storeEverflowAffiliatesDetails(req, res) {
    try {
        await deleteMany(EverFlowAffiliateSchema);
        await storeAffiliates();
        res.success({ message: "Everflow affiliate data saved successfully!" });
    } catch (error) {
        return res.internalServerError();
    }
}

export async function getEverFlowAffiliateList(req, res) {
    try {
        const result = await findMany(EverFlowAffiliateSchema, { account_status: "active" });
        const data = result.map(item => ({ label: item.name, value: item.network_id }));
        res.success({ data: data });
    } catch (error) {
        return res.internalServerError();
    }
}

export async function storeEverflowAdvertisersDetails(req, res) {
    try {
        await deleteMany(EverFlowAdvertiserSchema);
        await storeAdvertisers();
        res.success({ message: "Everflow advertiser data saved successfully!" });
    } catch (error) {
        return res.internalServerError();
    }
}

export async function getEverFlowAdvertiserList(req, res) {
    try {
        const networkId = req.body.data.id == '' ? { account_status: "active" } : { account_status: "active", network_id: req.body.data.id };
        const result = await findMany(EverFlowAdvertiserSchema, networkId);
        const data = result.map(item => ({ label: item.name, value: item.network_advertiser_id }));
        res.success({ data: data });
    } catch (error) {
        return res.internalServerError();
    }
}

export async function storeEverflowOffersDetails(req, res) {
    try {
        await deleteMany(EverFlowOfferSchema);
        await storeOffers();
        res.success({ message: "Everflow offer data saved successfully!" });
    } catch (error) {
        return res.internalServerError();
    }
}

export async function getEverFlowOfferList(req, res) {
    try {
        const offerId = req.body.data.id == '' ? { offer_status: "active" } : { offer_status: "active", network_advertiser_id: req.body.data.id };
        const result = await findMany(EverFlowOfferSchema, offerId);
        const data = result.map(item => ({ label: item.name, value: item.network_offer_id }));
        res.success({ data: data });
    } catch (error) {
        return res.internalServerError();
    }
}