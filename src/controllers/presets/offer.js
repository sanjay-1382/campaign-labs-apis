import OfferDetails from "../../models/presets/offer";
import { create, findMany, findOne } from "../../services/db/mongo-db-definition";

export async function addOfferDetails(req, res) {
    const offerDetails = req.body;
    if (!offerDetails.offerName || !offerDetails.verticalId || !offerDetails.categoryId || !offerDetails.offerLink) {
        return res.badRequest();
    }
    const result = await findOne(OfferDetails, { offerName: offerDetails.offerName })
    if (!result) {
        offerDetails.networkId = offerDetails.everFlowOffers.networkId;
        offerDetails.networkPortalList = JSON.stringify(offerDetails.networkPortalList);
        offerDetails.everFlowNetworks = JSON.stringify(offerDetails.everFlowNetworks);
        offerDetails.everFlowOffers = JSON.stringify(offerDetails.EverFlowOffers);

        try {
            const results = await create(OfferDetails, offerDetails)
            res.success({ data: { insertedId: results._id } });
        } catch (error) {
            console.error("Error executing query:", error);
        }
    } else {
        res.found({ message: "Offer Name Already Exist,Please Type Diffrent Name" });
    }
}

export async function getAllOffers(req, res) {
    try {
        const offerList = await findMany(OfferDetails, {}, {}, { sort: { createdAt: -1 } });
        return res.success({ data: offerList })
    } catch (error) {
        console.error(error);
        return res.internalServerError({ message: error.message });
    }
}

export async function getOfferById(req, res) {
    try {
        const { id } = req.params;
        const offer = await findOne(OfferDetails, { _id: id });
        if (!offer) { return res.notFound() }
        return res.success({ data: offer })
    } catch (error) {
        console.error(error);
        return res.internalServerError();
    }
}


