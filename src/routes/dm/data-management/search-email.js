import { Router } from "express";
const routes = Router();

import {
   searchRecordByEmails
} from "../../controllers/data-management/search-email.js";
routes.post("/searchRecordByEmails",searchRecordByEmails);

export default routes;