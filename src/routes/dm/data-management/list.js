import { Router } from "express";
import { upload } from "../../middlewares/file-upload.js";
const routes = Router();

import {
  save,
  getRecordsById,
  updateListName,
  deleteListRecords,
  updateDataToList,
  allListDetails,
  checkListNameExistence,
  deleteList,
  getTotalRecordsCount,
  addDataByApi,
  getlistdemofile
} from "../../controllers/data-management/list.js";
import { slack } from "../../services/slack/slack.js";
import { currentFormatDateToYMDHIS } from "../../helpers/currentDate.js";
routes.get("/getRecordsById/:id", getRecordsById);
routes.get("/allListDetails/", allListDetails);
routes.post("/checkListNameExistence/", checkListNameExistence);
routes.post("/getTotalRecordsCount/:id", getTotalRecordsCount);
routes.put("/updateListName/:id", updateListName);
routes.put("/deleteList/:id", deleteList);
routes.delete("/deleteListRecords/:id", deleteListRecords);
routes.post(
  "/updateDataToList/:id",
  upload.single("csvFile"),
  updateDataToList
);
routes.post("/addList/", upload.single("csvFile"), save);
// routes.post("/addDataByApi/:id", addDataByApi);
routes.get("/listdemofile", getlistdemofile);
routes.get("/testFunction", async (req, res) => {
  // const postData = {
  //   message: "Segment Email Flush By Date Updated Successfully."
  // };
  // await slack(postData);
  const currentDateTime = currentFormatDateToYMDHIS();
  console.log(currentDateTime.currentDateTime);
});
export default routes;
