import { Router } from "express";
import {
  save,
  getAllBounce,
  getById,
  updateById,
  bounceStatus,
  bounceBehaviour
} from "../../../controllers/globalJourneySettings/bounceTreatment/bounceTreatment";
const routes = Router();
routes.post("/createBounce", save);
routes.get("/getAllBounce", getAllBounce);
routes.get("/getBounceById/:id", getById);
routes.put("/updateBounceById/:id", updateById);
routes.put("/bounceStatusChange/:id", bounceStatus);
routes.get("/bounceBehaviourDropDown", bounceBehaviour);
export default routes;





