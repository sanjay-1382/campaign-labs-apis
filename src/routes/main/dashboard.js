import { Router } from 'express';
const router = Router();
import {
    importCountDashboardReport,
    exportCountDashboardReport,
    emailVerificationCountReport
} from '../../controllers/dashboard';

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong! Please try again.');
});

// Dashboard Routes
router.route('/dashboard/import-count-report').get(importCountDashboardReport);
router.route('/dashboard/export-count-report').get(exportCountDashboardReport);
router.route('/dashboard/email-verified/count-report').get(emailVerificationCountReport);

export default router;