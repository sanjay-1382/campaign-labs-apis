import { Router } from "express";
import { getAll } from "../../controllers/masters/templates.js";
const routes = Router();

routes.get("/getTemplate", getAll);

export default routes;
