import { Router } from 'express';
const router = Router();

// Import routes
import dashboard from './main/dashboard';

router.get('/', (req, res, next) => {
    res.render('index', { title: 'DataLabs' });
});

// Use an array for routes
const routes = [
    dashboard
];

// Use forEach to apply routes
routes.forEach(route => router.use(route));

export default router;