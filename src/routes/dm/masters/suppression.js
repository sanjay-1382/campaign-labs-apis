import { Router } from "express";
import {dataTypes,listTypes,suppressoinList,removeDataOptions } from "../../controllers/masters/suppression.js";
const routes = Router();

routes.get("/dataTypes/",dataTypes);
routes.get("/listTypes/",listTypes);
routes.get("/suppressoinList/",suppressoinList)
routes.get("/removeDataOptions/",removeDataOptions)
export default routes;
