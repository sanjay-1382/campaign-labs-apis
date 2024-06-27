import { Router } from 'express';
const router = Router();

import {
    addNetworkDetails,
    getAllNetworkDetails,
    updateNetworkDetails,
    activeInactiveNetwork,
    deleteNetworkDetails
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
router.route('/preset/network/active-inactive/:id').put(activeInactiveNetwork);
router.route('/preset/network/delete/:id').delete(deleteNetworkDetails);

export default router;
