import { executeQuery } from "../../helpers/mysql/mysqlConnection";
import { formatDateToYMDHIS } from "../../helpers/currentDate";
import logger from "../../Logger/logger";
export const domainServicesDetails = async (req, res) => {
  const sql = `SELECT *,DATE_FORMAT(created_on,'%d %b %Y') AS create_date,ROW_NUMBER() OVER (ORDER BY service_id DESC) AS s_no FROM domain_services WHERE active IN (0,1) ORDER BY service_id DESC`;
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
const checkDomainServiceNameExistOrNot = async (name) => {
  const sql =
    "SELECT COUNT(*) AS count FROM domain_services WHERE service_name= ?";
  try {
    const results = await executeQuery(sql, name);
    if (results[0].count > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(
      `This error in checkDomainServiceNameExistOrNot part ${error}`
    );
  }
};

export async function save(req, res) {
  const { domain_service_name, created_by, created_by_name } = req.body;
  if (!domain_service_name) {
    return res.status(400).json({
      status: "failed",
      message: "Please Enter domain Service Name"
    });
  }
  if (!(await checkDomainServiceNameExistOrNot(domain_service_name))) {
    let sql = `INSERT IGNORE INTO domain_services (service_name,created_on,active,created_by,created_by_name) VALUES (?,?,?,?,?)`;
    try {
      const results = await executeQuery(sql, [
        domain_service_name,
        formatDateToYMDHIS(new Date()),
        1,
        created_by,
        created_by_name
      ]);
      return res.status(200).json({
        status: "success",
        message: "Domain Service Added Successfully!",
        service_id: results.insertId
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in save of adddomainservicedetails part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else {
    return res.status(400).json({
      status: "failed",
      message: "service_name Already Exist,Please Type Diffrent Name"
    });
  }
}

export const getServiceIdByServiceName = async (service_name) => {
  let sql = "SELECT service_id FROM domain_services WHERE service_name=?";
  try {
    const results = await executeQuery(sql, service_name);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getServiceIdByServiceName part ${error}`);
  }
};

export async function updateDomainServiceName(req, res) {
  const service_id = req.params.id;
  const { domain_service_name, modified_by, modified_by_name } = req.body;
  if (!domain_service_name) {
    return res.status(400).json({
      status: "failed",
      message: "Please Enter domain_service Name"
    });
  }
  const updateDetails = async () => {
    const sql = `
  UPDATE domain_services
  SET
  service_name = ?,
  modified_by = ?,
  modified_by_name = ?,
  modified_on=?
  WHERE service_id = ?
`;
    try {
      const results = await executeQuery(sql, [
        domain_service_name,
        modified_by,
        modified_by_name,
        formatDateToYMDHIS(new Date()),
        service_id
      ]);
      return res.status(200).json({
        status: "success",
        message: "Domain Services Details Updated Successfully",
        service_id: service_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(`This error in updateDomainServiceName part ${error}`);
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  };
  let record = await getServiceIdByServiceName(domain_service_name);
  if (record.length === 0) {
    updateDetails();
  } else if (record[0].service_id == service_id) {
    updateDetails();
  } else {
    res.status(400).json({
      status: "failed",
      message: "service_name Already Exist,Please Type Diffrent Name",
      service_id: service_id
    });
  }
}

export async function getDomainServicesNames(req, res) {
  const sql =
    "SELECT service_name,service_id FROM domain_services WHERE active=?";
  try {
    const results = await executeQuery(sql, 1);
    res.json({ result: results });
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getDomainServicesNames part ${error}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong!" });
  }
}
export async function updateDomainServiceActiveStatus(req, res) {
  const service_id = req.params.id;
  const { action } = req.body;
  if (action === "1") {
    const sql =
      "UPDATE `domain_services` SET `active`='" +
      "1" +
      "' WHERE service_id='" +
      service_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.status(200).json({
        status: "success",
        message: "Activated Successfully",
        service_id: service_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in updateDomainServiceActiveStatus part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else if (action === "0") {
    const sql =
      "UPDATE `domain_services` SET `active`='" +
      "0" +
      "' WHERE service_id='" +
      service_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.status(200).json({
        status: "success",
        message: "InActivated Successfully",
        service_id: service_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in updateDomainServiceActiveStatus part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else if (action === "2") {
    const sql =
      "UPDATE `domain_services` SET `active`='" +
      "2" +
      "' WHERE service_id='" +
      service_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.status(200).json({
        status: "success",
        message: "Deleted Successfully",
        service_id: service_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in updateDomainServiceActiveStatus part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  }
}
