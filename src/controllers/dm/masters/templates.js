import { executeQuery } from "../../helpers/mysql/mysqlConnection";

export async function getAll(req, res, next) {
  try {
    // Example query
    const sql =
      "SELECT id,template_name FROM email_template WHERE active=1 AND associated_id=157 ORDER BY id DESC";
    const results = await executeQuery(sql);
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

export async function getEmailByTemplateId(id) {
  try {
    // Example query
    const sql =
      "SELECT id,template_name,template_html,template_text FROM email_template WHERE active=1 AND id=" +
      id +
      " ORDER BY id DESC";
    const results = await executeQuery(sql);
    return results[0].template_html;
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

export async function getEmailByTemplateId1(id) {
  try {
    // Example query
    const sql =
      "SELECT id,template_name,template_html,template_text FROM email_template WHERE active=1 AND id=" +
      id +
      " ORDER BY id DESC";
    const results = await executeQuery(sql);
    return results[0].template_text;
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
