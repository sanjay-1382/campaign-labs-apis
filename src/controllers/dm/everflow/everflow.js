import logger from "../../Logger/logger.js";
import EverFlowNetworkSchema from "../../models/everflow/networkadvertisers.js";
import EverFlowOfferSchema from "../../models/everflow/networkoffers.js";
import { getNetworks, getOffers } from "../../services/espServices/everflow.js";
export async function getAllNetworkEverFlow(req, res, next) {
  try {
    const network = await EverFlowNetworkSchema.find({
      account_status: "active"
    });
    res.status(200).json({
      data: network
    });
  } catch (error) {
    logger.error(`This error in getAllNetworkEverFlow part ${error}`);
    return res.status(500).json({
      msg: error.message
    });
  }
}

export async function getAllOffersEverFlow(req, res, next) {
  try {
    const offers = await EverFlowOfferSchema.find({ offer_status: "active" });
    res.status(200).json({
      data: offers
    });
  } catch (error) {
    logger.error(`This error in getAllOffersEverFlow part ${error}`);
    return res.status(500).json({
      msg: error.message
    });
  }
}

export async function NetWorkEverFlow(req, res, next) {
  try {
    const result = await EverFlowNetworkSchema.deleteMany({});
    const network = await getNetworks();
    res.json({
      msg: "message saved"
    });
  } catch (error) {
    logger.error(`This error in NetWorkEverFlow part ${error}`);
    return res.status(500).json({
      msg: error.message
    });
  }
}

export async function OffersEverFlow(req, res, next) {
  try {
    const result = await EverFlowOfferSchema.deleteMany({});
    const offers = await getOffers();
    res.json({
      msg: "data saved successfully"
    });
  } catch (error) {
    logger.error(`This error in OffersEverFlow part ${error}`);
    return res.status(500).res.json({
      msg: error.message
    });
  }
}
