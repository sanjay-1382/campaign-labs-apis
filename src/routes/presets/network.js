import { Router } from "express"
const routes = Router();

import {
    addNetworkDetails,
    getAllNetworkDetails,
    updateNetworkDetails,
    activeInactiveHeaders,
} from '../../controllers/presets/network'

routes.route("/preset/network/create").post(addNetworkDetails);
routes.route("/preset/network/details").get(getAllNetworkDetails);
routes.route("/preset/network/edit/:id").put(updateNetworkDetails);
routes.route("/preset/network/active-inactive/:id").put(activeInactiveHeaders);
routes.route("/preset/network/delete/:id").delete(activeInactiveHeaders);

export default routes;
