import { Router } from "express";
const routes = Router();
import {
  save,
  domainAccountsDetails,
  updateDomainAccountDetails,
  updateDomainAccountActiveStatus,
  addDomainDetails,
  updateDomainActiveStatus,
  domainDetails,
  updateDomainDetails
} from "../../controllers/domains/domainAccounts";
routes.get("/domainAccountsDetails/", domainAccountsDetails);
// routes.get("/domainDetails/", domainDetails);
routes.put("/domainDetails/:id", domainDetails);
routes.post("/addDomainAccountsDetails/", save);
routes.post("/addDomainDetails/", addDomainDetails);
routes.put("/updateDomainAccountsDetails/:id", updateDomainAccountDetails);
routes.put("/updateDomainDetails/:id", updateDomainDetails);
routes.put(
  "/updateDomainAccountActiveStatus/:id",
  updateDomainAccountActiveStatus
);
routes.put("/updateDomainActiveStatus/:id", updateDomainActiveStatus);
export default routes;
