import { Router } from "express"
const routes = Router();

import {
    addNetworkDetails,
    getAllNetworkDetails,
    getAllNetworkNames,
    updateNetworkActiveStatus,
    updateNetworkDetails
} from '../../controllers/presets/network'

routes.post("/network/addNetworkDetails/", addNetworkDetails);
routes.get("/network/getAllNetworkDetails/", getAllNetworkDetails)
routes.get("/network/getAllNetworkNames/", getAllNetworkNames)
routes.put("/network/updateNetworkDetails/:id", updateNetworkDetails)
routes.put("/network/updateNetworkActiveStatus/:id", updateNetworkActiveStatus)

export default routes;
