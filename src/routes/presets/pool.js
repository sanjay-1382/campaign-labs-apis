import { Router } from 'express';
const router = Router();

import {
    addPoolDetails,
    getPoolDetails,
    getAllPoolDetails,
    poolDetailsList,
    updatePoolDetails,
    activeInactivePoolDetails,
    softDeletePoolDetails
} from '../../controllers/presets/pool'

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/preset/pool/create').post(addPoolDetails);
router.route('/preset/pool/find-one/:id').get(getPoolDetails);
router.route('/preset/pool/details').get(getAllPoolDetails);
router.route('/preset/pool/list-items').get(poolDetailsList);
router.route('/preset/pool/update/:id').put(updatePoolDetails);
router.route('/preset/pool/active-inactive').put(activeInactivePoolDetails);
router.route('/preset/pool/delete').delete(softDeletePoolDetails);

export default router;