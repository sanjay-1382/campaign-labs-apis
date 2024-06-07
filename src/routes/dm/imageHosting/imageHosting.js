import { Router } from "express";
const routes = Router();
import {
  imgUploads,
  getAllUploadsImages,
  deleteById,
  deleteImgUploads
} from "../../controllers/imageHosting/imageHosting";
routes.get("/imageHosting/", getAllUploadsImages);
routes.post("/imageHosting/", imgUploads);
routes.put("/imageHosting/:id", deleteById);
routes.delete("/deleteImgUploads/", deleteImgUploads);
export default routes;
