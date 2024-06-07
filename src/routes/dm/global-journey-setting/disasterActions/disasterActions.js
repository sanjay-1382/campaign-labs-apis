import { Router } from "express";
import {
  save,
  getAll,
  getById,
  updateById,
  actionTypeDropDown,
  disasterDropDown,
  addDiasterDropDown,
  addActionTypeDropDown,
  changeDisasterStatus
} from "../../../controllers/globalJourneySettings/disasterActions/disasterActions.js";
const routes = Router();
routes.post("/createdisaster", save);
routes.get("/getdisasterbyid/:id", getById);
routes.put("/updatedisasterbyid/:id", updateById);
routes.get("/getalldisaster", getAll);
routes.get("/actiontype", actionTypeDropDown);
routes.get("/disasterdropdown", disasterDropDown);
routes.post("/changestatus/:id", changeDisasterStatus);

routes.post("/adddisasterdropdown", addDiasterDropDown);
routes.post("/addactiontypedropdown", addActionTypeDropDown);
export default routes;