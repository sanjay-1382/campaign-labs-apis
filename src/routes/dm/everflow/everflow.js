import { Router } from "express";
import {
  getAllNetworkEverFlow,
  getAllOffersEverFlow,
  NetWorkEverFlow,
  OffersEverFlow
} from "../../controllers/everflow/everflow.js";

// import {getNetworks,getOffers} from '../../services/espServices/everflow'
const routes = Router();
routes.get("/EverFlowNetworks", getAllNetworkEverFlow);
routes.get("/EverFlowOffers", getAllOffersEverFlow);

// These routes user for add everflow data in to db
routes.get("/SaveEverFlowNetworks", NetWorkEverFlow);
routes.get("/SaveEverFlowOffers", OffersEverFlow);
export default routes;
