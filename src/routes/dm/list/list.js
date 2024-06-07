import { Router } from "express";
const routes = Router();

import {
  getAll,
  getById,
  save,
  updateById,
  deleteById,
  getAllListRecords,
  getListRecordsById,
  getListRecordsListById,
  saveListRecords,
  saveListMultiRecords,
  updateListRecordsById,
  deleteListRecordsById
} from "../../controllers/list/list.js";
import { slack } from "../../services/slack/slack.js";
routes.get("/list/", getAll);
routes.get("/list/:id", getById);
routes.post("/list/", save);
routes.put("/list/:id", updateById);
routes.delete("/list/:id", deleteById);
/********** ListRecords Routes ************/
routes.get("/listRecords/", getAllListRecords);
routes.get("/listRecords/:id", getListRecordsById);
routes.get("/listRecordsByListId/:listId", getListRecordsListById);
routes.post("/listRecords/", saveListRecords);
routes.post("/listMultiRecords/", saveListMultiRecords);
routes.put("/listRecords/:id", updateListRecordsById);
routes.delete("/listRecords/:id", deleteListRecordsById);
export default routes;
