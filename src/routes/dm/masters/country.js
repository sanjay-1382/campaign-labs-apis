import { Router } from "express"
const routes = Router();

import {
    getAllCountries
} from "../../controllers/masters/country.js";
routes.get("/getAllCountries/",getAllCountries);
export default routes;
