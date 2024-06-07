import { Router } from "express";
import { getAll } from "../../controllers/masters/isp.js";
const routes = Router();

routes.get("/ispList", getAll);

export default routes;
