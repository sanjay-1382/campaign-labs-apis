import { Router } from "express";
import { upload } from "../../middlewares/file-upload.js";
const routes = Router();

import {
  save,
  addDataToSuppressionList,
  deleteSuppressionListRecords,
  updateSuppressionListName,
  checkSuppressionListNameExistence,
  allSuppressionListDetails,
  deleteSuppressionList,
  addGlobalSuppression
} from "../../controllers/data-management/suppression.js";
// routes.get("/listrecords/:id", getRecordsById);
routes.post(
  "/checkSuppressionListNameExistence/",
  checkSuppressionListNameExistence
);
routes.get("/allSuppressionListDetails/", allSuppressionListDetails);
routes.put("/updateSuppressionListName/:id", updateSuppressionListName);
routes.put("/deleteSuppressionList/:id", deleteSuppressionList);
routes.delete(
  "/deleteSuppressionListRecords/:id",
  deleteSuppressionListRecords
);
routes.post("/addSuppressionRecord/", upload.single("csvFile"), save);
routes.post(
  "/addDataToSuppressionList/:id",
  upload.single("csvFile"),
  addDataToSuppressionList
);
routes.post(
  "/addGlobalSuppression/",
  upload.single("csvFile"),
  addGlobalSuppression
);
export default routes;
