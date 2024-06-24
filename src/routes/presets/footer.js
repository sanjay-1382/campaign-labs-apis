import { Router } from "express";
const router = Router();

import {
    addFooterDetails,
    getAllFooterDetails,
    updateFooterDetails,
    activeInactiveFooter,
    deleteFooterDetails
} from "../../controllers/presets/footer";

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route("/preset/footer/create").post(addFooterDetails);
router.route("/preset/footer/details").get(getAllFooterDetails);
router.route("/preset/footer/update/:id").put(updateFooterDetails);
router.route("/preset/footer/active-inactive/:id").put(activeInactiveFooter);
router.route("/preset/footer/delete/:id").delete(deleteFooterDetails);

export default router;
