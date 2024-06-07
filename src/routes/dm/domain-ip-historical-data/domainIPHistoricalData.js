import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "volume/csvUploads/" });

import {
  addIP,
  getallIP,
  updateIP,
  findIPStartingWith
} from "../../controllers/domainIPHistoricalData/domainIPHistoricalData.js";

router.post("/domainIPHistoricalData/addIp", upload.single("csvFile"), addIP);

router.get("/domainIPHistoricalData/getallIp", getallIP);

// router.delete("/domainIPHistoricalData/deleteIp/:id", deleteIP);

router.put("/domainIPHistoricalData/updateIp/:id", updateIP);

router.post("/domainIPHistoricalData/findIPStartingWith/", findIPStartingWith);

export default router;
