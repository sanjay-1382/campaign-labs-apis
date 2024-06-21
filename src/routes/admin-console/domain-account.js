import { Router } from 'express';
const router = Router();
import { } from '../../controllers/admin-console/domain-account';

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(500).send('Something went wrong! Please try again.');
});

// Admin Console Routes
// router.route('/admin-console/domain-account').get();

export default router;