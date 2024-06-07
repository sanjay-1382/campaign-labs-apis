import { Router } from "express";
const router = Router();

import {
  addCreativeComplianceDetails,
  editCreativeComplianceDetails,
  getCreativeComplianceDetails,
  getNetworkList,
  searchNetworkList,
  getComplianceChecker
} from "../../controllers/creative-compliances/creative-compliances.js";

router.post("/creative-compliance/add", addCreativeComplianceDetails);
router.post("/creative-compliance/search-network-list", searchNetworkList);
router.post("/creative-compliance/checker", getComplianceChecker);
router.put("/creative-compliance/edit/:id", editCreativeComplianceDetails);
router.get("/creative-compliance/get-details", getCreativeComplianceDetails);
router.get("/creative-compliance/get-network-list", getNetworkList);

export default router;
