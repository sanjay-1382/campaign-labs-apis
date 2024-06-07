import { Router } from "express";
import {
  getAll,
  getByListId,
  getEventOccurs
} from "../../controllers/masters/list.js";
const routes = Router();

routes.get("/list", getAll);
routes.get("/segment/:id", getByListId);
routes.get("/eventOccurs", getEventOccurs);

export default routes;
