import { Router } from 'express';
const router = Router();
import { } from '../../controllers/admin-console/domain-account';

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

// Admin Console Routes
// router.route('/admin-console/domain-account').get();

export default router;