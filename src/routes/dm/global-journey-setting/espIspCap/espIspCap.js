import { Router } from "express";
import {
  save,
  getAllEspData,
  getCapById,
  updateById,
  changeEspIspStatus,
  getIsps,
  generlizeFunction,
  userLevelCapGerneralizeFunction
} from "../../../controllers/globalJourneySettings/espispCap/espispCap";
const routes = Router();
routes.post("/addCap", save);
routes.get("/allespinfo", getAllEspData);
routes.get("/getCapById/:id", getCapById);
routes.post("/updateCapById/:id", updateById);
routes.post("/changeEspIspStatus/:id", changeEspIspStatus);
routes.get("/getIsps", getIsps);
routes.post("/findespnumber", userLevelCapGerneralizeFunction);
export default routes;
