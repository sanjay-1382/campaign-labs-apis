import { Router } from 'express';
const router = Router();

import {
    addNetworkDetails,
    getAllNetworkDetails,
    updateNetworkDetails,
    activeInactiveHeaders
} from '../../controllers/presets/network'

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/preset/network/create').post(addNetworkDetails);
router.route('/preset/network/details').get(getAllNetworkDetails);
router.route('/preset/network/update/:id').put(updateNetworkDetails);
router.route('/preset/network/active-inactive/:id').put(activeInactiveHeaders);
router.route('/preset/network/delete/:id').delete(activeInactiveHeaders);

export default router;
