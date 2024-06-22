import { Router } from 'express';
const router = Router();
import {
    addOfferDetails,
    getAllOffers,
    getOfferById,
    updateOfferDetails,
    activeInactiveDatabaseDetails,
    softDeleteDatabaseDetails
} from '../../controllers/presets/offer';

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/preset/offer/create').post(addOfferDetails);
router.route('/preset/offer/details').get(getAllOffers);
router.route('/preset/offer/find-one/:id').get(getOfferById);
router.route('/preset/offer/update/:id').put(updateOfferDetails);
router.route('/preset/offer/active-inactive/:id').put(activeInactiveDatabaseDetails);
router.route('/preset/offer/delete/:id').delete(softDeleteDatabaseDetails);
// router.route('/preset/offer/find-one').post(getDatabaseDetails);
// router.route('/preset/offer/details').post(findAllDatabaseDetails);
// router.route('/preset/offer/list-items').post(databaseDetailsList);
// router.route('/preset/offer/update/:id').put(updateDatabaseDetails);
// router.route('/preset/offer/active-inactive/:id').put(activeInactiveDatabaseDetails);
// router.route('/preset/offer/delete/:id').delete(softDeleteDatabaseDetails);

export default router;