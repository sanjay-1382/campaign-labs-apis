import { executeQuery } from "../../helpers/mysql/mysqlConnection";

export async function getAll(req, res, next) {
  try {
    // Example query
    const sql =
      "SELECT offer_id,offer_name FROM offer WHERE active=1 ORDER BY offer_id DESC";
    const results = await executeQuery(sql);
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

export async function getOfferById(id) {
  try {
    // Example query
    const sql =
      "SELECT offer_link,personal_unsub,network_unsub FROM offer WHERE active=1 AND offer_id IN (" +
      id +
      ") ";
    const results = await executeQuery(sql);
    return {
      offerLink: results[0].offer_link,
      personal_unsub: results[0].personal_unsub,
      network_unsub: results[0].network_unsub
    };
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

export async function getById(req, res, next) {
  try {
    // Example query
    const Id = req.params.id;
    const sql = `SELECT offer_link,personal_unsub,network_unsub FROM offer WHERE active=1 AND offer_id IN (${Id}) AND associated_id=157 ORDER BY offer_id DESC`;
    const results = await executeQuery(sql);
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
