import OfferDetails from "../../models/presets/offer";

export const addOfferDetails = async (req, res) => {
    try {
        const { data, user } = req.body;
        const dataToCreate = { ...data, createdId: user.id, createdBy: user.name };
        const existing = await findOne(OfferDetails, { name: dataToCreate.name });
        if (existing) { return res.found({ message: "Offer name already exists, please select/take a different name." }); }
        const result = await create(OfferDetails, new OfferDetails(dataToCreate));
        return res.success({ data: result });
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
}

export async function getAllOffers(req, res) {
    try {
        const offerList = await offer.find().sort({ createdAt: -1 });
        return res.status(200).json({ status: 200, message: "Data fetched successfully", data: offerList });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export async function getOfferById(req, res) {
    try {
        const { id } = req.params;
        const offer = await offer.findById(id);

        if (!offer) { return res.status(404).json({ status: 404, message: "Offer not found" }); }

        return res.status(200).json({ status: 200, message: "Offer fetched successfully", data: offer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: "Internal server error" });
    }
}

export async function addOffer(req, res) {
    const offer = req.body;

    if (offer.offerName || offer.verticalId || offer.EverFlowOffers.network_id || offer.categoryId || offer.offerLink) {
        return res.status(400).json({ status: 400, message: "Please enter offer details which is required!" })
    }

    const existOffer = await offer.findOne({ offerName: offer.offer_name });

    if (existOffer) {
        return res.status(409).json({ status: 409, message: "Offer name already exist,Please type different name" })
    }

    //    const offerData = new offer({
    //     offerName: offer.offer_name,
    //     networkPortalList: JSON.stringify(offer.networkPortalList),
    //     offerLink: offer.offer_link,
    //     personalUnsub: ,
    //     networkUnsub: ,
    //     payout: ,
    //     paymentType: ,
    //     trackerId: ,
    //     networkId: ,
    //     categoryId: ,
    //     createdBy: ,
    //     verticalId: ,
    //     networkAdvertiserId: ,
    //     name: ,
    //     networkOfferId: ,
    //     everFlowNetworks: JSON.stringify(offer.EverFlowNetworks),
    //     everFlowOffers: JSON.stringify(offer.EverFlowOffers),
    //     creatorName: ,

    //    })


}