import { Router } from "express";
import {
  save,
  getAllCaps,
  updateById,
  getById
} from "../../../controllers/globalJourneySettings/userLevelCap/userLevelCap.js";
const routes = Router();
routes.post("/saveuserlevelcap", save);
routes.get("/userlevelcap", getAllCaps);
routes.get("/userlevelcap/:id", getById);
// routes.post("/updateuserlevelcap/:id", updateById);

export default routes;
