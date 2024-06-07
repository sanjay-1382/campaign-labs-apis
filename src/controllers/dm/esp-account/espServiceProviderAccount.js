import { formatDateToYMDHIS } from "../../helpers/currentDate.js";
import { executeQuery } from "../../helpers/mysql/mysqlConnection.js";
import logger from "../../Logger/logger.js";

const checkEspServiceProviderAccountNameExistOrNot = async (accountName) => {
  const sql =
    "SELECT COUNT(*) AS count FROM email_service_provider_account WHERE account_name= ?";
  try {
    const results = await executeQuery(sql, accountName);
    if (results[0].count > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error executing query:", error);
  }
};

const checkEspServiceProviderAccountOnEdit = async (
  accountName,
  espAccountId
) => {
  const sql = `SELECT account_name FROM email_service_provider_account WHERE account_name="?" AND esp_account_id NOT IN (?)`;
  try {
    const results = await executeQuery(sql, [
      accountName,
      Number(espAccountId)
    ]);
    return results.length;
  } catch (error) {
    return error.message;
  }
};

export async function saveEsp(req, res, next) {
  const {
    accountName,
    espId,
    userId,
    password,
    apikey,
    fromDomain,
    replyTo,
    createdBy,
    createdByName
  } = req.body;
  if (accountName.length == 0) {
    return res.status(400).json({
      message: "Account Name is required"
    });
  } else if (!espId) {
    return res.status(400).json({
      message: "Esp Id is required"
    });
  } else if (userId.length == 0) {
    return res.status(400).json({
      message: "User Id is required"
    });
  } else if (fromDomain.length === 0) {
    return res.status(400).json({
      message: "From Domain is required"
    });
  } else if (replyTo.length === 0) {
    return res.status(400).json({
      message: "Reply To is required"
    });
  } else if (password.length === 0 && apikey.length === 0) {
    return res.status(400).json({
      message: "Password and Api Key is required"
    });
  } else if (password.length === 0) {
    if (apikey.length === 0) {
      return res.status(400).json({
        message: " Atleast Password And Api is Required"
      });
    }
  }

  const isAccountNameExist = await checkEspServiceProviderAccountNameExistOrNot(
    accountName
  );
  if (isAccountNameExist) {
    return res.status(400).json({
      message: "Account Name Already Exist"
    });
  }

  const data = {
    account_name: accountName,
    esp_id: Number(espId.esp_id),
    user_id: userId,
    password: password,
    api_key: apikey,
    created_by: createdBy,
    created_on: formatDateToYMDHIS(new Date()),
    associated_id: 157,
    active: 1,
    from_domain: fromDomain,
    reply_to: replyTo,
    created_by_name: createdByName,
    esp_name: espId.esp_name
  };

  const columnValues = {
    account_name: accountName,
    esp_id: Number(espId.esp_id),
    user_id: userId,
    password: password,
    api_key: apikey,
    created_by: createdBy,
    created_on: formatDateToYMDHIS(new Date()),
    associated_id: 157,
    active: 1,
    row_data: JSON.stringify(data),
    from_domain: fromDomain,
    reply_to: replyTo,
    created_by_name: createdByName
  };
  const nonNullValues = Object.entries(columnValues)
    .filter(([key, value]) => value !== null && value !== undefined)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  const columns = Object.keys(nonNullValues).join(", ");
  const placeholders = Object.values(nonNullValues)
    .map(() => "?")
    .join(", ");
  const sql = `INSERT IGNORE INTO email_service_provider_account (${columns}) VALUES (${placeholders})`;
  const valuesArray = Object.values(nonNullValues);
  try {
    const result = await executeQuery(sql, valuesArray);
    logger.info("Success in Save of ESP");
    return res.status(200).json({
      message: "Esp Account Saved Successfully"
    });
  } catch (error) {
    logger.error(`Error occured in saveEsp ${error.message}`);
    return res.status(500).json({
      message: "Error Occured",
      error: error.message
    });
  }
}

export async function editEsp(req, res, next) {
  const { id } = req.params;
  console.log(id);
  const {
    accountName,
    espId,
    userId,
    password,
    apikey,
    modifiedBy,
    modifiedByName,
    fromDomain,
    replyTo
  } = req.body;
  if (accountName.length == 0) {
    return res.status(400).json({
      message: "Account Name is required"
    });
  } else if (espId === undefined || espId === null) {
    return res.status(400).json({
      message: "Esp Id is required"
    });
  } else if (userId.length == 0) {
    return res.status(400).json({
      message: "User Id is required"
    });
  } else if (fromDomain.length === 0) {
    return res.status(400).json({
      message: "From Domain is required"
    });
  } else if (replyTo.length === 0) {
    return res.status(400).json({
      message: "Reply To is required"
    });
  } else if (password.length === 0 && apikey.length === 0) {
    return res.status(400).json({
      message: "Password and Api Key is required"
    });
  } else if (password.length === 0) {
    if (apikey.length === 0) {
      return res.status(400).json({
        message: " Atleast Password And Api is Required"
      });
    }
  }
  const data = {
    account_name: accountName,
    user_id: userId,
    esp_id: Number(espId.esp_id),
    password: password,
    api_key: apikey,
    from_domain: fromDomain,
    reply_to: replyTo,
    created_by: modifiedBy,
    created_by_name: modifiedByName,
    modified_by: modifiedBy,
    modified_by_name: modifiedByName,
    modified_on: formatDateToYMDHIS(new Date()),
    esp_name: espId.esp_name
  };
  const columnValues = {
    account_name: accountName,
    user_id: userId,
    esp_id: Number(espId.esp_id),
    row_data: JSON.stringify(data),
    password: password,
    api_key: apikey,
    from_domain: fromDomain,
    reply_to: replyTo,
    modified_by: modifiedBy,
    modified_by_name: modifiedByName,
    modified_on: formatDateToYMDHIS(new Date())
  };

  const isAccountNameExist = await checkEspServiceProviderAccountOnEdit(
    accountName,
    id
  );
  try {
    if (isAccountNameExist === 0) {
      const nonNullValues = Object.entries(columnValues)
        .filter(([key, value]) => value !== null && value !== undefined)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
      const updates = Object.keys(nonNullValues)
        .map((column) => `${column} = ?`)
        .join(", ");
      const sql = `UPDATE email_service_provider_account SET ${updates} WHERE esp_account_id = ?`;
      const valuesArray = [...Object.values(nonNullValues), id];
      //   console.log(sql, valuesArray);
      const result = await executeQuery(sql, valuesArray);
      //   console.log(result);
      logger.info("Success in Edit of ESP");
      return res.status(200).json({
        message: "Esp Account Updated SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Name is Already Exist"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Some error occured",
      error: `${error.message}`
    });
  }
}

export async function statusChangeToActiveInActiveDeleteEsp(req, res, next) {
  const { id } = req.params;
  const { active } = req.body;
  try {
    const esp_Account_id = Number(id);
    const sql = `UPDATE email_service_provider_account SET active = ? WHERE esp_account_id = ?`;
    const valuesArray = [active, esp_Account_id];
    if (active === 1) {
      const result = await executeQuery(sql, valuesArray);
      return res.status(200).json({
        message: "Esp Account Active SuccessFully"
      });
    } else if (active === 0) {
      const result = await executeQuery(sql, valuesArray);
      return res.status(200).json({
        message: "Esp Account InActive SuccessFully"
      });
    } else if (active === 2) {
      const result = await executeQuery(sql, valuesArray);
      return res.status(200).json({
        message: "Esp Account Deleted SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Wrong Status Send !!"
      });
    }
  } catch (error) {
    logger.error(`Error occured in ${error.message}`);
    return res.status(500).json({
      message: "Error Execuing Query",
      error: error.message
    });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  if (id == " ") {
    return res.status(400).json({
      message: "Id is required"
    });
  }
  try {
    const sql = `SELECT * FROM email_service_provider_account WHERE esp_account_id = ${id}`;
    const results = await executeQuery(sql);
    return res.status(200).json({
      message: "Success",
      results: results
    });
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getByID part ${error}`);
    return res.status(500).json({
      message: "Error occured !!"
    });
  }
}

export async function getAll(req, res, next) {
  try {
    const sql = `SELECT *,
    ROW_NUMBER() OVER (ORDER BY esp_account_id DESC) AS s_no,
    DATE_FORMAT(created_on, '%d %b %Y') AS create_date,
    JSON_UNQUOTE(JSON_EXTRACT(row_data, '$.esp_name')) AS esp_name
FROM email_service_provider_account
WHERE active IN (1, 0)`;
    const results = await executeQuery(sql);
    return res.status(200).json({
      message: "Success",
      results: results
    });
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getAll part ${error}`);
    return res.status(500).json({
      message: "Error occured !!"
    });
  }
}
