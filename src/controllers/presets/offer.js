import OfferDetails from "../../models/presets/offer";
import { create, findMany, findOne, updateOne } from "../../services/db/mongo-db-definition";

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
        offerDetails.everFlowAffiliates = JSON.stringify(offerDetails.everFlowAffiliates);
        try {
            const results = await create(OfferDetails, offerDetails)
            return  res.success({ data: { insertedId: results._id } });
        } catch (error) {
            console.error("Error executing query:", error);
        }
    } else {
        return res.found({ message: "Offer Name Already Exist,Please Type Diffrent Name" });
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

export async function updateOfferDetails(req, res){
    try{
        const { id } = req.params;
        const offerDetails = req.body;
        if(offerDetails){
            offerDetails.networkId = offerDetails.everFlowOffers.networkId;
            offerDetails.networkPortalList = JSON.stringify(offerDetails.networkPortalList);
            offerDetails.everFlowNetworks = JSON.stringify(offerDetails.everFlowNetworks);
            offerDetails.everFlowOffers = JSON.stringify(offerDetails.EverFlowOffers);
            offerDetails.everFlowAffiliates = JSON.stringify(offerDetails.everFlowAffiliates);
        }
        const result = await updateOne(OfferDetails, {_id: id}, offerDetails);
        if(!result){
          return res.notFound("data not found")
        }
        return res.success({ data: { insertedId: result._id },  message: "Offer Details Updated Successfully"});
    }catch(error){
        console.error(error);
        return res.internalServerError();
    }
}

export async function activeInactiveDatabaseDetails(req, res){
    try{
        const { id } = req.params;
        const {active} = req.body;
        const result = await findOne(OfferDetails, { _id: id})
      if(result){
       if(active === false){
        result.isActive = false;
        await updateOne(OfferDetails, {_id: id}, result);
        return res.success({data: { updatedId: result._id },  message: "Offer Active Status Updated Successfully"})
       }else{
        result.isActive = true;
        await updateOne(OfferDetails, {_id: id}, result);
        return res.success({data: { updatedId: result._id },  message: "Offer Active Status Updated Successfully"})
       }
      }else{
        return res.notFound("data not found")
      }
        
    }catch(error){
        console.error(error);
        return res.internalServerError();
    }
}

export async function softDeleteDatabaseDetails(req, res){
    try{
        const { id } = req.params;
        const {deletedBy, deletedId } = req.body;
        const result = await findOne(OfferDetails, { _id: id});
        if(result){
            if(result.isActive === true){
              return res.validationError({message: "Please inActive offer, Before delete"})
            }
            result.isDeleted = true;
            result.deletedId = deletedId;
            result.deletedBy = deletedBy;
            await updateOne(OfferDetails, {_id: id}, result);
            return res.success({data: { updatedId: result._id },  message: "Offer Data Deleted Successfully"})
        }else{
            return res.notFound("data not found")
        }
    }catch(error){
        console.error(error);
        return res.internalServerError();
    }
}


