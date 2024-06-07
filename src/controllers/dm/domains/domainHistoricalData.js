import { executeQuery } from "../../helpers/mysql/mysqlConnection";
import { formatDateToYMDHIS } from "../../helpers/currentDate";
import logger from "../../Logger/logger";
export const domainHistoricalDataDetails = async (req, res) => {
  const sql = `SELECT email_domains.domain_id,email_domains.domain_name,domain_services.service_name,domain_providers.account_name,domain_providers.account_email,email_domains.purchased_date,email_domains.expiry_date,email_domains.renewal_date,email_domains.price FROM email_domains INNER JOIN domain_providers ON domain_providers.account_id=email_domains.account_id INNER JOIN domain_services ON domain_services.service_id=domain_providers.service_id WHERE email_domains.active=1 ORDER BY email_domains.domain_id DESC`;
  try {
    const results = await executeQuery(sql);
    return res.status(200).json({ status: "success", result: results });
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in domainServicesDetails part ${error}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong!" });
  }
};
