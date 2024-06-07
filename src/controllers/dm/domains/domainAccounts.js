import { executeQuery } from "../../helpers/mysql/mysqlConnection";
import { formatDateToYMDHIS } from "../../helpers/currentDate";
import logger from "../../Logger/logger";
import { slack } from "../../services/slack/slack";
import { sendEmailFromGmail } from "../../services/gmailService";
import axios from "axios";
const { parseString } = require("xml2js");

export const domainAccountsDetails = async (req, res) => {
  const sql = `SELECT dp.*,
       DATE_FORMAT(dp.created_on,'%d %b %Y') AS create_date,
       sp.service_name,
       ROW_NUMBER() OVER (ORDER BY dp.account_id DESC) AS s_no
FROM domain_providers dp
JOIN domain_services sp ON dp.service_id = sp.service_id
WHERE dp.active IN (0,1)
ORDER BY dp.account_id DESC`;
  try {
    const results = await executeQuery(sql);
    return res.json({ status: "success", result: results });
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in domainAccountsDetails part ${error}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong!" });
  }
};
const checkDomainAccountNameExistOrNot = async (account_name) => {
  const sql =
    "SELECT COUNT(*) AS count FROM domain_providers WHERE account_name= ?";
  try {
    const results = await executeQuery(sql, account_name);
    if (results[0].count > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(
      `This error in checkDomainAccountNameExistOrNot part ${error}`
    );
  }
};
export async function save(req, res) {
  const domainAccountsDetails = req.body;
  const data = Object.fromEntries(
    Object.entries(domainAccountsDetails).filter(([key, value]) => value == "")
  );
  if (Object.keys(data).length !== 0) {
    return res.status(400).json({
      status: "failed",
      message: `${Object.keys(data)[0]} is required!`
    });
  }
  async function adddomainAccountsDetails() {
    domainAccountsDetails["created_on"] = formatDateToYMDHIS(new Date());
    domainAccountsDetails["active"] = 1;
    const sql = `INSERT IGNORE INTO domain_providers (${Object.keys(
      domainAccountsDetails
    )}) VALUES (?)`;
    const values = Object.values(domainAccountsDetails);
    try {
      const results = await executeQuery(sql, [values]);
      return res.json({
        status: "success",
        message: "Domain Account Added Successfully!",
        account_id: results.insertId
      });
    } catch (error) {
      console.error("Error Executing Query!");
      logger.error(`This error in adddomainAccountsDetails part ${error}`);
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  }
  if (
    !(await checkDomainAccountNameExistOrNot(
      domainAccountsDetails.account_name
    ))
  ) {
    adddomainAccountsDetails();
  } else {
    return res.status(400).json({
      status: "failed",
      message: "account_name Already Exist,Please Type Diffrent Name"
    });
  }
}
export const getAccountIdByAccountName = async (account_name) => {
  let sql = "SELECT account_id FROM domain_providers WHERE account_name=?";
  try {
    const results = await executeQuery(sql, account_name);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in getAccountIdByAccountName part ${error}`);
  }
};
export async function updateDomainAccountDetails(req, res) {
  const account_id = req.params.id;
  const domainAccountsDetails = req.body;
  const data = Object.fromEntries(
    Object.entries(domainAccountsDetails).filter(([key, value]) => value == "")
  );
  if (Object.keys(data).length !== 0) {
    return res.status(400).json({
      status: "failed",
      message: `${Object.keys(data)[0]} is required!`
    });
  }
  const updateDetails = async () => {
    domainAccountsDetails["modified_on"] = formatDateToYMDHIS(new Date());
    const domainProvidersKeys = Object.keys(domainAccountsDetails);
    const values = Object.values(domainAccountsDetails);
    values.push(account_id);
    const sql = `UPDATE domain_providers SET ${domainProvidersKeys
      .map((key) => `${key} = ?`)
      .join(", ")} WHERE account_id = ?`;
    try {
      const results = await executeQuery(sql, values);
      return res.json({
        status: "success",
        message: "Domain Accounts Details Updated Successfully",
        account_id: account_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(`This error in updateDomainAccountDetails part ${error}`);
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  };
  let record = await getAccountIdByAccountName(
    domainAccountsDetails.account_name
  );
  if (record.length === 0) {
    updateDetails();
  } else if (record[0].account_id == account_id) {
    updateDetails();
  } else {
    return res.status(400).json({
      status: "failed",
      message: "account_name Already Exist,Please Type Diffrent Name",
      account_id: account_id
    });
  }
}

export async function updateDomainAccountActiveStatus(req, res) {
  const account_id = req.params.id;
  const { action } = req.body;
  if (action === "1") {
    const sql =
      "UPDATE `domain_providers` SET `active`='" +
      "1" +
      "' WHERE account_id='" +
      account_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.json({
        status: "success",
        message: "Activated Successfully",
        account_id: account_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in updateDomainAccountActiveStatus part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else if (action === "0") {
    const sql =
      "UPDATE `domain_providers` SET `active`='" +
      "0" +
      "' WHERE account_id='" +
      account_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.json({
        status: "success",
        message: "InActivated Successfully",
        account_id: account_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in updateDomainAccountActiveStatus part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else if (action === "2") {
    const sql =
      "UPDATE `domain_providers` SET `active`='" +
      "2" +
      "' WHERE account_id='" +
      account_id +
      "' ";
    try {
      await executeQuery(sql);
      res.json({
        status: "success",
        message: "Deleted Successfully",
        account_id: account_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(
        `This error in updateDomainAccountActiveStatus part ${error}`
      );
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  }
}

//godaddy....

export async function getGodaddyDns(domain, apiKey, apiSecret) {
  const url = `https://api.godaddy.com/v1/domains/${domain}/records/`;

  const headers = {
    Authorization: `sso-key ${apiKey}:${apiSecret}`
  };
  try {
    let { data } = await axios.get(url, { headers });
    console.log("getdnsgodaddy", data);
    let result = Object.values(data);
    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    logger.error(`This error in getGodaddyDns part ${error}`);
  }
}

export async function setGodaddyDns(domain, apiKey, apiSecret) {
  const result = await getGodaddyDns(domain, apiKey, apiSecret);
  const availableDns = Object.values(result);
  const subDomains = ["cj"];
  // const clickServerIp = '159.65.230.192';
  // const clickServerIp = '149.56.128.32';
  const clickServerIp = process.env.CL_API_IP;

  for (const subDomain of subDomains) {
    let found = false;
    for (let i = 0; i < availableDns.length; i++) {
      const dns = availableDns[i];
      if (dns.name === subDomain) {
        console.log("found");
        availableDns[i] = {
          data: clickServerIp,
          name: subDomain,
          ttl: 600,
          type: "A"
        };
        console.log("single dns", availableDns[i]);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("not found!");
      const addDns = {
        data: clickServerIp,
        name: subDomain,
        ttl: 600,
        type: "A"
      };
      availableDns.push(addDns);
      console.log("after not found :", availableDns);
    }
  }
  const url = `https://api.godaddy.com/v1/domains/${domain}/records/`;

  const headers = {
    Authorization: `sso-key ${apiKey}:${apiSecret}`,
    "Content-Type": "application/json"
  };

  try {
    ``;
    const { data } = await axios.put(url, availableDns, { headers });
    console.log("OK BRO!");
    let result = Object.values(data);
    return result;
  } catch (error) {
    console.error("Error:", error);
    logger.error(`This error in setGodaddyDns part ${error}`);
  }
}

//end godaddy....

//cloudflare....

export async function getCloudFlareDomainZoneId(domain, apiToken) {
  try {
    const response = await axios.get(
      `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`
        }
      }
    );

    const data = response.data;

    const zoneId = data.result[0].id;

    return zoneId;
  } catch (error) {
    console.error("Failed to fetch zone ID: " + error.message);
    logger.error(`This error in getCloudFlareDomainZoneId part ${error}`);
  }
}

export async function setCloudFlareDns(domain, apiToken) {
  try {
    const zoneId = await getCloudFlareDomainZoneId(domain, apiToken);
    const subDomains = ["cj"];
    // const clickServerIp = process.env.CL_API_TRACKING_DOMAIN_IP;
    const clickServerIp = process.env.CL_API_IP;
    let results = [];

    for (const subDomain of subDomains) {
      const addDns = {
        type: "A",
        content: clickServerIp,
        name: subDomain,
        ttl: 600,
        priority: 10,
        proxied: false
      };

      const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`;
      const headers = {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      };

      const response = await axios.post(url, addDns, { headers });

      let result = response.data;
      result = Object.values(result);
      results = [...results, ...result];
    }
    return results;
  } catch (error) {
    console.error("Failed to add DNS records: " + error.message);
    logger.error(`This error in setCloudFlareDns part ${error}`);
  }
}

//end cloudflare....

//cloudns....

export async function getCloudnsDns(domain, apiKey, apiSecret) {
  try {
    const config = {
      headers: {
        Cookie:
          "landing_page=%2Fdns%2Fadd-record.json%3Fauth-password%3Dzapcampaignlabs%40123%26auth-id%3D6935%26domain-name%3Decheh.com%26record-type%3DA%26host%3Dshambhu%26record%3D10.10.10.10%26ttl%3D600; lang=en; session_id=b46f49a2f5fce32f4e5e892354ec04bd"
      }
    };

    const response = await axios.get(
      `https://api.cloudns.net/dns/records.json?auth-id=${apiKey}&auth-password=${apiSecret}&domain-name=${domain}`,
      config
    );
    const data = Object.values(response.data);
    return data;
  } catch (error) {
    console.error("Failed to fetch DNS records: " + error.message);
    logger.error(`This error in getCloudnsDns part ${error}`);
  }
}

export async function setCloudnsDns(domain, apiKey, apiSecret) {
  try {
    const result = await getCloudnsDns(domain, apiKey, apiSecret);
    const subDomains = ["cj"];
    //$ip = '159.65.230.192';
    // $ip = '149.56.128.32';
    // const ip = process.env.CL_API_TRACKING_DOMAIN_IP;
    const ip = process.env.CL_API_IP;

    const results = [];

    for (const subDomain of subDomains) {
      const url = `https://api.cloudns.net/dns/add-record.json`;
      const params = {
        "auth-password": apiSecret,
        "auth-id": apiKey,
        "domain-name": domain,
        "record-type": "A",
        host: subDomain,
        record: ip,
        ttl: 600
      };
      const headers = {
        Cookie:
          "session_id=77349e200864707d184a145a0bb19144; landing_page=%2Fdns%2Fadd-record.json%3Fauth-password%3Dzapcampaignlabs%40123%26auth-id%3D6935%26domain-name%3Decheh.com%26record-type%3DA%26host%3Dshambhu%26record%3D10.10.10.10%26ttl%3D600; lang=en"
      };
      const response = await axios.get(url, {
        params,
        headers
      });

      let result = Object.values(response.data);
      results = [...results, ...result];
    }
    return results;
  } catch (error) {
    console.error("Failed to add DNS records: " + error.message);
    logger.error(`This error in setCloudnsDns part ${error}`);
  }
}

//end cloudns....

//namecheap....

function parseStringPromise(xmlText) {
  return new Promise((resolve, reject) => {
    parseString(xmlText, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export async function getNamecheapDns(apiKey, apiUser) {
  try {
    const ip = process.env.CL_API_TRACKING_DOMAIN_IP;

    const response = await axios.get(`https://api.namecheap.com/xml.response`, {
      params: {
        ApiUser: apiUser,
        ApiKey: apiKey,
        UserName: apiUser,
        Command: "namecheap.domains.getList",
        ClientIp: "149.56.128.32"
      }
    });
    console.log(response);
    const xmlText = response.data;
    console.log(xmlText);
    const xmlObject = await parseStringPromise(xmlText);
    console.log(xmlObject);
    console.log("hi xml", xmlObject.ApiResponse.CommandResponse[0]);
    const domainList =
      xmlObject.ApiResponse.CommandResponse[0].DomainGetListResult[0].Domain;
    console.log("list", domainList);
    const domainDetails = domainList.map((domain) => domain.$.Name);
    console.log(domainDetails);
    return domainDetails;
  } catch (error) {
    console.error("Failed to get domain list: " + error.message);
    logger.error(`This error in getNamecheapDns part ${error}`);
  }
}

export async function setNamecheapDns(domain, apiKey, apiUser) {
  try {
    let goAHead = 1;
    const getDns = await getNamecheapDns(apiKey, apiUser);
    console.log("dns", getDns);
    if (1 > 0) {
      for (let dns of getDns) {
        if (domain == dns) {
          goAHead = 1;
        }
      }
      if (goAHead === 1) {
        try {
          const subDomains = ["cj"];
          const orgDomain = domain.split(".");

          const requestBody = new URLSearchParams({
            apiuser: apiUser,
            apikey: apiKey,
            username: apiUser,
            Command: "namecheap.domains.dns.setHosts",
            ClientIp: process.env.CL_API_IP,
            SLD: orgDomain[0],
            TLD: orgDomain[1],
            ...subDomains.reduce((acc, subDomain, index) => {
              acc[`HostName${index + 1}`] = subDomain;
              acc[`RecordType${index + 1}`] = "A";
              acc[`Address${index + 1}`] = process.env.CL_API_IP;
              acc[`TTL${index + 1}`] = 100;
              return acc;
            }, {})
          });

          const response = await axios.post(
            "https://api.namecheap.com/xml.response",
            requestBody.toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          );
          console.log(response);
          const xmlText = response.data;
          const xmlObject = await parseStringPromise(xmlText);
          console.log(xmlObject);
          console.log(xmlObject.ApiResponse.$.Status);
          if (xmlObject.ApiResponse.$.Status.toLowerCase() === "ok") {
            console.log("OK bro");
            return 1;
          } else {
            console.log("NOT OK bro");
            return 0;
          }
        } catch (error) {
          console.error("Failed to set DNS hosts: " + error.message);
          logger.error(`This error in setNamecheapDns part ${error}`);
        }
      }
    } else {
      console.error("NamecheapDns Not Found!");
    }
  } catch (error) {
    console.error("Failed to set DNS hosts: " + error.message);
    logger.error(`This error in setNamecheapDns part ${error}`);
  }
}

//end namecheap....

//add Sub Domain....

export async function setDomainDns(accountId, domain) {
  const sql =
    "SELECT domain_providers.*, domain_services.service_name FROM `domain_providers` INNER JOIN domain_services ON domain_providers.service_id = domain_services.service_id WHERE domain_providers.account_id =?";
  const result = await executeQuery(sql, accountId);
  console.log(sql);
  console.log(result);

  const serviceName = result[0]["service_name"];
  if (serviceName.toLowerCase() == "godaddy") {
    const apiKey = result[0]["api_key"];
    const apiSecret = result[0]["api_secret"];
    setGodaddyDns(domain, apiKey, apiSecret);
  } else if (serviceName.toLowerCase() == "cloudflare") {
    const apiToken = result[0]["api_token"];
    setCloudFlareDns(domain, apiToken);
  } else if (serviceName.toLowerCase() == "cloudns") {
    const apiKey = result[0]["api_key"];
    const apiSecret = result[0]["api_secret"];
    setCloudnsDns(domain, apiKey, apiSecret);
  } else if (serviceName.toLowerCase() == "namecheap") {
    const apiKey = result[0]["api_key"];
    const apiUser = result[0]["api_user"];
    await setNamecheapDns(domain, apiKey, apiUser);
  } else {
  }
}

//ended work of adding sub domain....

const checkDomainNameExistOrNot = async (domain_name) => {
  const sql =
    "SELECT COUNT(*) AS count FROM email_domains WHERE domain_name= ?";
  try {
    const results = await executeQuery(sql, domain_name);
    if (results[0].count > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in checkDomainNameExistOrNot part ${error}`);
  }
};

export async function addDomainDetails(req, res) {
  const {
    account_id,
    domain_name,
    price,
    created_by,
    created_by_name,
    purchased_date,
    expiry_date,
    renewal_date
  } = req.body;

  if (account_id === "") {
    return res
      .status(400)
      .json({ status: "failed", message: "Please Provide account_id" });
  } else if (domain_name === "") {
    return res
      .status(400)
      .json({ status: "failed", message: "Please Provide domain_name" });
  } else {
    if (!(await checkDomainNameExistOrNot(domain_name))) {
      try {
        const sql = `INSERT IGNORE INTO email_domains (account_id,domain_name,price,created_by,created_by_name,purchased_date,expiry_date,renewal_date,created_on,active) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        const result = await executeQuery(sql, [
          account_id,
          domain_name,
          price,
          created_by,
          created_by_name,
          purchased_date,
          expiry_date,
          renewal_date,
          formatDateToYMDHIS(new Date()),
          1
        ]);

        //Add sub domain....

        await setDomainDns(account_id, domain_name);

        //Send message on slack....

        const postData = {
          message: `@Sumit Chouksey This new Domain ${domain_name} is added by the user ${created_by_name}. So please add the SSL certificate for this domain.`
        };
        await slack(postData);

        //Send mail....

        try {
          await sendEmailFromGmail(
            "sumit@credmudra.com",
            "New domain added",
            `Hi Sumit, \r\n This new Domain ${domain_name} is added by the user ${created_by_name}. So please add the SSL certificate for this domain.`
          );
        } catch (error) {
          logger.error(`This error in sendEmail part ${error}`);
          return res.status(500).json({ error: "An error occurred" });
        }

        return res.json({
          status: "success",
          message: "Domain Details Added Successfully!",
          domain_id: result.insertId
        });
      } catch (error) {
        console.error("Error Executing Query!", error);
        logger.error(`This error in addDomainDetails part ${error}`);
        return res
          .status(500)
          .json({ status: "failed", message: "Something went wrong!" });
      }
    } else {
      return res.status(400).json({
        status: "failed",
        message: "domain name already exist,please type different domain name!"
      });
    }
  }
}

export async function updateDomainActiveStatus(req, res) {
  const domain_id = req.params.id;
  const { action } = req.body;
  if (action === "1") {
    const sql =
      "UPDATE `email_domains` SET `active`='" +
      "1" +
      "' WHERE domain_id='" +
      domain_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.json({
        status: "success",
        message: "Activated Successfully",
        domain_id: domain_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(`This error in updateDomainActiveStatus part ${error}`);
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else if (action === "0") {
    const sql =
      "UPDATE `email_domains` SET `active`='" +
      "0" +
      "' WHERE domain_id='" +
      domain_id +
      "' ";
    try {
      await executeQuery(sql);
      return res.json({
        status: "success",
        message: "InActivated Successfully",
        domain_id: domain_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(`This error in updateDomainActiveStatus part ${error}`);
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  } else if (action === "2") {
    const sql =
      "UPDATE `email_domains` SET `active`='" +
      "2" +
      "' WHERE domain_id='" +
      domain_id +
      "' ";
    try {
      await executeQuery(sql);
      res.json({
        status: "success",
        message: "Deleted Successfully",
        domain_id: domain_id
      });
    } catch (error) {
      console.error("Error executing query:", error);
      logger.error(`This error in updateDomainActiveStatus part ${error}`);
      return res
        .status(500)
        .json({ status: "failed", message: "Something went wrong!" });
    }
  }
}

export const domainDetails = async (req, res) => {
  const account_id = req.params.id;

  const sql = `SELECT dp.*,
       DATE_FORMAT(dp.created_on,'%d %b %Y') AS create_date,
       sp.account_name,
       ROW_NUMBER() OVER (ORDER BY dp.domain_id DESC) AS s_no
FROM email_domains dp
JOIN domain_providers sp ON dp.account_id = sp.account_id
WHERE dp.active IN (0,1) AND dp.account_id=?
ORDER BY dp.domain_id DESC`;
  try {
    const results = await executeQuery(sql, account_id);
    res.json({ status: "success", result: results });
  } catch (error) {
    console.error("Error executing query:", error);
    logger.error(`This error in domainDetails part ${error}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong!" });
  }
};

export async function updateDomainDetails(req, res) {
  const domain_id = req.params.id;
  const {
    account_id,
    domain_name,
    price,
    modified_by,
    modified_by_name,
    purchased_date,
    expiry_date,
    renewal_date
  } = req.body;
  try {
    const sql1 = `SELECT domain_name FROM email_domains WHERE domain_name=? AND domain_id NOT IN (?)`;
    const result = await executeQuery(sql1, [domain_name, domain_id]);
    console.log(result);
    if (result.length === 0) {
      const sql = `UPDATE email_domains SET account_id=?,domain_name=?,price=?,modified_by=?,modified_by_name=?,purchased_date=?,expiry_date=?,renewal_date=?,modified_on=? WHERE domain_id=?`;
      await executeQuery(sql, [
        account_id,
        domain_name,
        price,
        modified_by,
        modified_by_name,
        purchased_date,
        expiry_date,
        renewal_date,
        formatDateToYMDHIS(new Date()),
        domain_id
      ]);
      return res.json({
        status: "success",
        message: "Domain Details Updated Successfully",
        domain_id: domain_id
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "domain_name Already Exist,Please Type Diffrent Name",
        domain_id: domain_id
      });
    }
  } catch (error) {
    console.error("Error Executing Query!", error);
    logger.error(`This error in updateDomainDetails part ${error}`);
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong!" });
  }
}
