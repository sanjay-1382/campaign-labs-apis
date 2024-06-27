import { Router } from 'express';
const router = Router();

import { addTemplateDetails, getAllTemplates, getTemplateById, updateTemplateDetails, activeInactiveTemplateDetails, softDeleteTemplateDetails } from '../../controllers/presets/template';

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.internalServerError({ message: 'Something went wrong! Please try again.' });
    next();
});

router.route('/preset/template/create').post(addTemplateDetails);
router.route('/preset/template/details').get(getAllTemplates);
router.route('/preset/template/find-one/:id').get(getTemplateById);
router.route('/preset/template/update/:id').put(updateTemplateDetails);
router.route('/preset/template/active-inactive/:id').put(activeInactiveTemplateDetails);
router.route('/preset/template/delete/:id').delete(softDeleteTemplateDetails);

export default router;