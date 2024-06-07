import { Router } from "express";
import {
  saveSegmentEmailFlush,
  getSegmentEmailFlushById,
  updateSegmentEmailFlushById,
  getFlushingSegmentNow
} from "../../controllers/data-management/segmentEmailFlush.js";
const routes = Router();

routes.post("/saveSegmentEmailFlush", saveSegmentEmailFlush);
routes.get("/getSegmentFlushById/:id", getSegmentEmailFlushById);
routes.put("/updateSegmentEmailFlushById/:id", updateSegmentEmailFlushById);

routes.put("/getFlushingSegmentNow/:id", getFlushingSegmentNow);
export default routes;
