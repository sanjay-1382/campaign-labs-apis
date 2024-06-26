import PortalSchema from '../../models/portal-platform/portal';
import { findMany } from '../../services/db/mongo-db-definition';

export async function getPortalList(req, res) {
    try {
        const result = await findMany(PortalSchema, { $and: { isActive: true, isDeleted: false } });
        const data = result.map(item => ({ label: item.portalName, value: item._id }));
        res.success({ data: data });
    } catch (error) {
        return res.internalServerError();
    }
}