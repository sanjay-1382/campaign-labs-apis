import { Router } from "express";
const routes = Router();
import { domainHistoricalDataDetails } from "../../controllers/domains/domainHistoricalData";
routes.get("/domainHistoricalData/", domainHistoricalDataDetails);
export default routes;
