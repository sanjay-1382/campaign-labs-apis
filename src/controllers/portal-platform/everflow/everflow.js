// import logger from "../../Logger/logger.js";
import EverFlowAffiliatesDetails from "../../../models/portal-platform/everflow/affiliates.js";
import EverFlowAdvertiserDetails from "../../../models/portal-platform/everflow/advertisers.js";
import EverFlowOfferDetails from "../../../models/portal-platform/everflow/offers.js";
import { storeAffiliates, storeAdvertisers, storeOffers } from "../../../services/portal-platform/everflow/everflow.js";

export async function storeEverflowAffiliatesDetails(req, res) {
    try {
        await EverFlowAffiliatesDetails.deleteMany({});
        await storeAffiliates();
        res.json({ msg: "message saved" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export async function storeEverflowAdvertisersDetails(req, res) {
    try {
        await EverFlowAdvertiserDetails.deleteMany({});
        await storeAdvertisers();
        res.json({ msg: "message saved" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export async function storeEverflowOffersDetails(req, res) {
    try {
        await EverFlowOfferDetails.deleteMany({});
        await storeOffers();
        res.json({ msg: "message saved" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

// export async function getAllPartnerEverFlow(req, res, next) {
//     try {
//         const network = await EverFlowPartnerSchema.find({
//             account_status: "active"
//         });
//         res.status(200).json({
//             data: network
//         });
//     } catch (error) {
//         logger.error(`This error in getAllPartnerEverFlow part ${error}`);
//         return res.status(500).json({
//             msg: error.message
//         });
//     }
// }

// export async function getAllNetworkEverFlow(req, res, next) {
//     try {
//         const network = await EverFlowNetworkSchema.find({
//             account_status: "active"
//         });
//         res.status(200).json({
//             data: network
//         });
//     } catch (error) {
//         logger.error(`This error in getAllNetworkEverFlow part ${error}`);
//         return res.status(500).json({
//             msg: error.message
//         });
//     }
// }

// export async function getAllOffersEverFlow(req, res, next) {
//     try {
//         const offers = await EverFlowOfferSchema.find({ offer_status: "active" });
//         res.status(200).json({
//             data: offers
//         });
//     } catch (error) {
//         logger.error(`This error in getAllOffersEverFlow part ${error}`);
//         return res.status(500).json({
//             msg: error.message
//         });
//     }
// }
