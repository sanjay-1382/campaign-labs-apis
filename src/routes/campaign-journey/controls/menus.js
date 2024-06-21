import { Router } from 'express';
const router = Router();
import { addMenuDetails, findAllMenuDetails } from '../../../controllers/campaign-journey/controls/menus';

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/campaign-journey/control-menus/create').post(addMenuDetails);
router.route('/campaign-journey/control-menus/details').get(findAllMenuDetails);

export default router;
