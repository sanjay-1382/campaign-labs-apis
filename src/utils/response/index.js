import { responseCode } from './error-code';

const createResponse = (code, severity, defaultMessage, data = {}) => ({
    product: { "name": "CamapignLabs", "version": "v1.0" },
    status: { "code": code, "severity": severity, "value": data.message || defaultMessage },
    data: data.data && Object.keys(data.data).length ? data.data : null,
    error: !(data.data && Object.keys(data.data).length),
});

export default {
    success: (data = {}) => createResponse(responseCode.success, "success", "Your request is successfully executed.", data),
    found: (data = {}) => createResponse(responseCode.found, "info", "Record(s) already exist with specified criteria.", data),
    badRequest: (data = {}) => createResponse(responseCode.badRequest, "warning", "Request parameters are invalid or missing.", data),
    unAuthorized: (data = {}) => createResponse(responseCode.unAuthorized, "warning", "You are not authorized to access the request.", data),
    notFound: (data = {}) => createResponse(responseCode.notFound, "info", "Record(s) not found with specified criteria.", data),
    failure: (data = {}) => createResponse(responseCode.failure, "error", "Some error occurred while performing action.", data),
    validationError: (data = {}) => createResponse(responseCode.validationError, "warning", "Invalid Data, Validation Failed.", data),
    internalServerError: (data = {}) => createResponse(responseCode.internalServerError, "error", "Internal server error.", data),
};