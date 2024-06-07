import { Router } from "express";
import {
  save,
  getAllEspCommitment,
  updateById,
  getById,
  changeEspStatus,
  periodValuesDropDown
} from "../../../controllers/globalJourneySettings/espCommitment/espCommitment.js";
const routes = Router();
routes.post("/saveEspCommitment", save);
routes.get("/EspCommitment", getAllEspCommitment);
routes.get("/EspCommitment/:id", getById);
routes.put("/EspCommitment/:id", updateById);
routes.put("/EspCommitmentStatus/:id", changeEspStatus);
routes.get("/periodValuesDropDown", periodValuesDropDown);
export default routes;
