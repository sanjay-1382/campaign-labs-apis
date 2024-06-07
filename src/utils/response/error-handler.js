import responseBody from './index';
import { responseCode } from './error-code';

const responseHandler = (req, res, next) => {
    const responseMethods = ['success', 'found', 'badRequest', 'unAuthorized', 'notFound', 'failure', 'validationError', 'internalServerError'];
    responseMethods.forEach(method => {
        res[method] = (data = {}) => {
            res.status(responseCode[method]).json(responseBody[method](data));
        };
    });
    next();
};

export default responseHandler;