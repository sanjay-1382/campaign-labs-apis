import { Router } from "express";
const routes = Router();

import {
  addSegmentDetails,
  updateSegmentDetails,
  getSegmentDetails,
  deleteSegmentDetails,
  getSegmentTotalRecordsCount,
  copyAndCreateSegment,
  getFlushingSegmentTotalRecordsCount
} from "../../controllers/data-management/segment.js";
routes.get("/getSegmentDetails/:type", getSegmentDetails);
routes.get("/getSegmentTotalRecordsCount/:id", getSegmentTotalRecordsCount);
routes.post("/addSegmentDetails/", addSegmentDetails);
routes.post("/copyAndCreateSegment/", copyAndCreateSegment);
routes.put("/updateSegmentDetails/:id", updateSegmentDetails);
routes.put("/deleteSegmentDetails/:id", deleteSegmentDetails);

routes.get(
  "/getFlushingSegmentTotalRecordsCount/:id",
  getFlushingSegmentTotalRecordsCount
);
export default routes;
