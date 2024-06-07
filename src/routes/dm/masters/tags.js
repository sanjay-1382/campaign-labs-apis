import { Router } from "express";
import { getAll, callapi } from "../../controllers/masters/tags.js";
const routes = Router();

routes.get("/emailTags", getAll);
routes.get("/callapi", callapi);
export default routes;
