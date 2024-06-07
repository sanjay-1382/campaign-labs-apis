import { executeQuery } from "../../helpers/mysql/mysqlConnection";

export async function getEspDetailsById(postData) {
  try {
    // Example query
    const sql =
      "SELECT * FROM `email_service_provider_account` WHERE `esp_account_id` = " +
      postData.espAccountId +
      " AND `esp_id`=" +
      postData.espId +
      " ";
    const results = await executeQuery(sql);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
