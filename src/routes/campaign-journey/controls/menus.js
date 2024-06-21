import { Router } from 'express';
const router = Router();
import { addMenuDetails, findAllMenuDetails } from '../../../controllers/campaign-journey/controls/menus';

// Error handling middleware
router.use((err, req, res) => {
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
});

router.route('/campaign-journey/control-menus/create').post(addMenuDetails);
router.route('/campaign-journey/control-menus/details').get(findAllMenuDetails);

export default router;
