import { Router } from "express";
const routes = Router();
import {
  save,
  domainServicesDetails,
  updateDomainServiceName,
  updateDomainServiceActiveStatus,
  getDomainServicesNames
} from "../../controllers/domains/domainServices";
routes.get("/domainServicesDetails/", domainServicesDetails);
routes.post("/addDomainServicesDetails/", save);
routes.put("/updateDomainServiceName/:id", updateDomainServiceName);
routes.put(
  "/updateDomainServiceActiveStatus/:id",
  updateDomainServiceActiveStatus
);
routes.get("/getDomainServicesNames/", getDomainServicesNames);
export default routes;
