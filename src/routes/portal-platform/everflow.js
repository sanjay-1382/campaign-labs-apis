import { Router } from 'express';
const router = Router();

import {
    storeEverflowAffiliatesDetails,
    getEverFlowAffiliateList,
    storeEverflowAdvertisersDetails,
    getEverFlowAdvertiserList,
    storeEverflowOffersDetails,
    getEverFlowOfferList
} from '../../controllers/portal-platform/everflow.js'

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/portal-platform/everflow/affiliate/store').get(storeEverflowAffiliatesDetails);
router.route('/portal-platform/everflow/affiliate-list').get(getEverFlowAffiliateList);
router.route('/portal-platform/everflow/advertiser/store').get(storeEverflowAdvertisersDetails);
router.route('/portal-platform/everflow/advertiser-list').get(getEverFlowAdvertiserList);
router.route('/portal-platform/everflow/offer/store').get(storeEverflowOffersDetails);
router.route('/portal-platform/everflow/offer-list').get(getEverFlowOfferList);

export default router;