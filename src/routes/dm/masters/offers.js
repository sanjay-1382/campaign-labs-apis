import { Router } from "express";
import { getAll, getById } from "../../controllers/masters/offers.js";
const routes = Router();

routes.get("/getOffers", getAll);
routes.get("/getOffersById/:id", getById);

export default routes;
