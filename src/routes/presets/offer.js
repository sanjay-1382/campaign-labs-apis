import { Router } from 'express';
const router = Router();
import {
    addOfferDetails,
    getAllOffers,
    getOfferById,
    updateOfferDetails,
    activeInactiveOfferDetails,
    softDeleteOfferDetails
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
router.route('/preset/offer/active-inactive/:id').put(activeInactiveOfferDetails);
router.route('/preset/offer/delete/:id').delete(softDeleteOfferDetails);

export default router;