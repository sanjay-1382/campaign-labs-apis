import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "volume/uploads/csv" });

import {
    addDomainIpDetails,
    getDomainIpDetails,
    updateDomainIpDetails
} from "../../../controllers/domain-ip-historical-data/ip-historical-data/ip-historical-data";

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route("/ipHistoricalData/create", upload.single("csvFile")).post(addDomainIpDetails);
router.route("/ipHistoricalData/details").get(getDomainIpDetails);
router.route("/ipHistoricalData/update/:id").put(updateDomainIpDetails);

export default router;