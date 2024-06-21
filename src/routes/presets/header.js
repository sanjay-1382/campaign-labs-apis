import { Router } from "express";
const routes = Router();

import {
    addHeaderkDetails,
    getAllHeaderkDetails,
    updateHeaderkDetails,
    activeInactiveHeaders
} from "../../controllers/presets/header";

routes.route("/preset/header/create").post(addHeaderkDetails);
routes.route("/preset/header/details").get(getAllHeaderkDetails);
routes.route("/preset/header/edit/:id").put(updateHeaderkDetails);
routes.route("/preset/header/active-inactive/:id").put(activeInactiveHeaders);
routes.route("/preset/header/delete/:id").delete(activeInactiveHeaders);

export default routes;
