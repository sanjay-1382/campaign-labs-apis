import { Router } from "express"
const routes = Router();

import {
    addNetworkDetails,
    getAllNetworkDetails,
    updateNetworkDetails
} from '../../controllers/presets/network'

routes.post("/preset/network/create", addNetworkDetails);
routes.get("/preset/network/details", getAllNetworkDetails);
routes.put("/preset/network/edit/:id", updateNetworkDetails);
routes.put("/preset/network/active-inactive/:id", updateNetworkDetails);
routes.delete("/preset/network/delete/:id", updateNetworkDetails);

export default routes;
