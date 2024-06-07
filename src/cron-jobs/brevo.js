import logger from "../Logger/logger";
import {
    formatDateToYMDHIS,
    formatDateToYMDWith0,
    formatDateToYMDWith59,
} from "../helpers/currentDate";
import { executeQuery } from "../helpers/mysql/mysqlConnection";
import brevoData from "../models/webHook/brevo";

export async function brevoDataStats() {
    console.log("brevoDataStats");
    try {
        const webhookData = await brevoData.find({ readFlag: 0 });

        // Process and update documents concurrently using Promise.all
        await Promise.all(
            webhookData.map(async (doc) => {
                const { response } = doc;
                if (!response) return;
                const { event, email, "message-id": messageId, date } = response;
                let sqlQuery = '';
                let sqlParams = [];

                const commonParams = [
                    email,
                    messageId,
                    formatDateToYMDWith0(new Date(date)),
                    formatDateToYMDWith59(new Date(date)),
                ];

                switch (event) {
                    case 'hard_bounce':
                    case 'soft_bounce':
                    case 'invalid_email':
                    case 'error':
                        console.log(`Bounce event: ${email}`);
                        sqlQuery = `UPDATE IGNORE cl_email_campaign_data SET bounce = ?, bounce_date = ? WHERE email = ? AND request_response = ? AND sent_date BETWEEN ? AND ?`;
                        sqlParams = [1, formatDateToYMDHIS(new Date()), ...commonParams];
                        break;
                    case 'deferred':
                    case 'unsubscribed':
                    case 'blocked':
                        console.log(`Unsubscribe event: ${email}`);
                        sqlQuery = `UPDATE IGNORE cl_email_campaign_data SET personal_unsub = ?, personal_unsub_date = ? WHERE email = ? AND request_response = ? AND sent_date BETWEEN ? AND ?`;
                        sqlParams = [1, formatDateToYMDHIS(new Date()), ...commonParams];
                        break;
                    default:
                        console.log(`Other event: ${email}`);
                        break;
                }

                if (sqlQuery) { await executeQuery(sqlQuery, sqlParams); }

                // Update the document's readFlag to 1
                await brevoData.findByIdAndUpdate(doc._id, { $set: { readFlag: 1 } }, { new: true, runValidators: true });
            })
        );
    } catch (error) {
        console.log(error);
        logger.error(`This error in brevoDataStats function: ${error}`);
    }
}