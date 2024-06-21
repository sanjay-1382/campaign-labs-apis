import { Router } from 'express';
const router = Router();

// Import routes
import adminConsole from './admin-console/domain-account';
import menus from './campaign-journey/controls/menus';
import network from './presets/network';
import offers from './presets/offer';
import header from './presets/header';

router.get('/', (req, res, next) => {
    res.render('index', { title: 'CampaignLabs' });
});

const routes = [
    adminConsole,
    menus,
    network,
    offers,
    header,
];

// Use forEach to apply routes
routes.forEach(route => router.use(route));

export default router;