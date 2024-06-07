import { Router } from "express";
const router = Router();

import { addnetworkCompliance , getnetworkCompliance , getnetworkCompliancelist , updatenetworkCompliancelist } from "../../controllers/networkCompliance/networkCompliance.js";

router.post("/creative-compliance/network/add", addnetworkCompliance);
router.get("/creative-compliance/network/getdetails", getnetworkCompliance);
router.get("/creative-compliance/network/getlist", getnetworkCompliancelist);
router.put("/creative-compliance/network/update/:id", updatenetworkCompliancelist);
    
export default router;
