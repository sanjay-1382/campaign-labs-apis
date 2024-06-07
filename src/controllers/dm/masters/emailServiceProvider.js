import logger from "../../Logger/logger";
import { executeQuery } from "../../helpers/mysql/mysqlConnection";
import { Sequelize, DataTypes } from "sequelize";

export async function getAll(req, res, next) {
  try {
    const sql =
      "SELECT esp_name, esp_id FROM email_service_providers WHERE active=1";
    const results = await executeQuery(sql);
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getAll part ${error}`);
  }
}

export async function getByID(req, res, next) {
  try {
    const id = req.params.id;
    if (id == " ") {
      res.json("ID is required");
    }
    const sql = `SELECT account_name,esp_account_id FROM email_service_provider_account WHERE active=1 AND esp_id = ${id}`;
    const results = await executeQuery(sql);
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getByID part ${error}`);
  }
}

export async function getByEspID(req, res, next) {
  try {
    const id = req.params.id;
    const espType = req.params.espType;
    if (id == " ") {
      res.json("ID is required");
    }

    if (espType == "smtp") {
      const sql = `SELECT * FROM email_server WHERE id= ${id} `;
      const results = await executeQuery(sql);
      const message = [
        {
          fromDomain: results[0].server_title,
          replyTo: "reply@" + results[0].server_title
        }
      ];
      res.json(message);
    } else if (espType == "gsmtp") {
      const sql = `SELECT email_pmta_server.fromDomain,email_pmta_server.server_name,email_pmta_server.main_ip,email_server.id FROM email_server RIGHT JOIN email_pmta_server ON email_pmta_server.id=email_server.pmta_server_id  WHERE server_type=2 AND email_pmta_server.installationprocess=1 AND email_server.id= ${id} LIMIT 1`;
      const results = await executeQuery(sql);
      const message = [
        {
          fromDomain: results[0].fromDomain,
          replyTo: "reply@" + results[0].fromDomain
        }
      ];
      res.json(message);
    } else if (espType == "esp") {
      const sql = `SELECT from_domain AS fromDomain,reply_to FROM email_service_provider_account WHERE esp_account_id= ${id} LIMIT 1`;
      const results = await executeQuery(sql);
      const message = [
        { fromDomain: results[0].fromDomain, replyTo: results[0].reply_to }
      ];
      res.json(message);
    } else {
      const message = [{ fromDomain: "", replyTo: "" }];
      res.json(message);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getByEspID part ${error}`);
  }
}

export async function getByDomainID(req, res, next) {
  try {
    res.json(1);
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getByDomainID part ${error}`);
  }
}
