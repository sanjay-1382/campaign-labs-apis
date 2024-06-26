import { Router } from "express";
const router = Router();

import {
    addHeaderkDetails,
    getAllHeaderkDetails,
    updateHeaderkDetails,
    activeInactiveHeaders,
    deleteHeaders
} from "../../controllers/presets/header";

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route("/preset/header/create").post(addHeaderkDetails);
router.route("/preset/header/details").get(getAllHeaderkDetails);
router.route("/preset/header/edit/:id").put(updateHeaderkDetails);
router.route("/preset/header/active-inactive/:id").put(activeInactiveHeaders);
router.route("/preset/header/delete/:id").delete(deleteHeaders);

export default router;
