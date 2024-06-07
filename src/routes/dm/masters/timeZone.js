import { Router } from "express";
import { getAll, callapi } from "../../controllers/masters/timeZone.js";
const routes = Router();

routes.get("/timeZone", getAll);
export default routes;
