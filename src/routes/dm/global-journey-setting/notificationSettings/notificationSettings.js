import {Router} from 'express'
import {save,getContactDetails,getById,updateById,changeNotificationSettingsStatus} from '../../../controllers/globalJourneySettings/notificationSettings/notificationSettings'
const routes = Router();
routes.post("/saveNotificationDetails",save);
routes.get("/notificationSettings",getContactDetails);
routes.get("/notificationSettings/:id",getById);
// routes.put("/updateContactDetails/:id",updateById);
routes.put("/notificationSettingsStatus/:id", changeNotificationSettingsStatus);

export default routes;