import { Router } from 'express';
const router = Router();

import {
    addPoolDetails,
    getAllPoolDetails
} from '../../controllers/presets/pool'

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/preset/pool/create').post(addPoolDetails);
router.route('/preset/pool/details').get(getAllPoolDetails);

export default router;