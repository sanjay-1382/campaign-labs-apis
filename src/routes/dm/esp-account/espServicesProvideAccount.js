import { Router } from "express";
import {
  saveEsp,
  editEsp,
  statusChangeToActiveInActiveDeleteEsp,
  getById,
  getAll
} from "../../controllers/espServiceProviderAccount/espServiceProviderAccount";
const routes = Router();
routes.post("/addEspAccount", saveEsp);
routes.post("/editEspAccount/:id", editEsp);
routes.put("/espStatus/:id", statusChangeToActiveInActiveDeleteEsp);
routes.get("/getEspProviderAccountById/:id", getById);
routes.get("/getAllEspProviderAccount", getAll);
export default routes;
