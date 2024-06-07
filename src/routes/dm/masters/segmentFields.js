import { Router } from "express";
const routes = Router();

import {
  getAllSegmentFields,
  getListFields,
  getSysSlots,
  getAbsolutes,
  getRelatives,
  getAbsRadios,
  getSlots,
  getConditions,
  getBehaviours,
  getOperators,
  getSegmentCategory,
  numberOfTimes
} from "../../controllers/masters/segmentFields.js";
routes.get("/getAllSegmentFields/", getAllSegmentFields);
routes.get("/getListFields/", getListFields);
routes.get("/getSysSlots/", getSysSlots);
routes.get("/getAbsolutes/", getAbsolutes);
routes.get("/getRelatives/", getRelatives);
routes.get("/getAbsRadios/", getAbsRadios);
routes.get("/getSlots/", getSlots);
routes.get("/getConditions/", getConditions);
routes.get("/getBehaviours/", getBehaviours);
routes.get("/getOperators/", getOperators);
routes.get("/getSegmentCategory/", getSegmentCategory);
routes.get("/getNumberOfTimes/", numberOfTimes);
export default routes;
