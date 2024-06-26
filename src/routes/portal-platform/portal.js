import { Router } from 'express';
const router = Router();

import { getPortalList } from '../../controllers/portal-platform/portal'

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/portal-platform/list').get(getPortalList);

export default router;