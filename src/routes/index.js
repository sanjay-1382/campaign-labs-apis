import { Router } from 'express';
const router = Router();

// Import routes
import adminConsole from './admin-console/domain-account';

router.get('/', (req, res, next) => {
    res.render('index', { title: 'CampaignLabs' });
});

// Use an array for routes
const routes = [
    adminConsole
];

// Use forEach to apply routes
routes.forEach(route => router.use(route));

export default router;