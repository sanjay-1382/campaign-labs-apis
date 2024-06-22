import { Router } from 'express';
const router = Router();

import {
    storeEverflowAffiliatesDetails,
    storeEverflowAdvertisersDetails,
    storeEverflowOffersDetails
} from '../../controllers/portal-platform/everflow/everflow.js'

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/portal-platform/everflow/affiliate/store').get(storeEverflowAffiliatesDetails);
router.route('/portal-platform/everflow/advertiser/store').get(storeEverflowAdvertisersDetails);
router.route('/portal-platform/everflow/offer/store').get(storeEverflowOffersDetails);
// router.route('/preset/network/details').get(getAllNetworkDetails);
// router.route('/preset/network/update/:id').put(updateNetworkDetails);
// router.route('/preset/network/active-inactive/:id').put(updateNetworkDetails);
// router.route('/preset/network/delete/:id').delete(updateNetworkDetails);

export default router;