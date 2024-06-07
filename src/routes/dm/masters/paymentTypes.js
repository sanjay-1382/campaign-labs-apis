import { Router } from "express"
const routes = Router();

import {
    getAllPaymentTypes,
    
} from "../../controllers/masters/paymentTypes.js";
routes.get("/getAllPaymentTypes/",getAllPaymentTypes);
export default routes;
