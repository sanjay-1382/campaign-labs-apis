import { Router } from 'express';
const router = Router();

// Import routes
import adminConsole from './admin-console/domain-account';
import menus from './campaign-journey/controls/menus';
import network from './presets/network';
import offers from './presets/offer';


router.get('/', (req, res, next) => {
    res.render('index', { title: 'CampaignLabs' });
});

// Use an array for routes
// router.use('/network',network);

const routes = [
    adminConsole,
    menus,
    network,
    offers,
];

// Use forEach to apply routes
routes.forEach(route => router.use(route));


export default router;