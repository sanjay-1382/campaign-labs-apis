import {
  executeQuery,
  executeQuerySuppresio
} from "../../helpers/mysql/mysqlConnection.js";
import md5 from "blueimp-md5";

export function dataTypes(req, res) {
  let dataTypes = [
    { label: "email", value: "email" },
    { label: "domain", value: "domain" },
    { label: "md5", value: "md5" }
  ];
  res.json({ dataTypes });
}

export function removeDataOptions(_, res) {
  let removeDataOptions = [
    { label: "On", value: "On" },
    { label: "Before OR (More Than)", value: "Before OR (More Than)" },
    { label: "All", value: "All" },
    { label: "By Email Address", value: "By Email Address" }
  ];
  res.json({ removeDataOptions });
}

export function listTypes(req, res) {
  let listTypes = [
    { label: "global", value: "global" },
    { label: "offer", value: "offer" },
    { label: "internal", value: "internal" }
  ];
  res.json({ listTypes });
}

export async function suppressoinList(_, res) {
  try {
    let sql =
      "SELECT network.name,offers.* from offers LEFT JOIN network ON network.networkid=offers.networkid  WHERE offers.active=1 ORDER BY offers.offerid DESC";
    const rows = await executeQuerySuppresio(sql);
    console.log(sql);
    console.log(rows);
    const suppressionList = rows.map((result) => ({
      label: `${result.offername} (${result.name})`,
      value: result.offerid
    }));
    res.json({ suppressionList });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).send("Internal Server Error");
  }
}

// export async function getAll(req, res, next) {
//   try {
//     // Example query
//     const sql =
//       "SELECT * FROM `email_suppression_list` WHERE `associated_id` = 157 AND active=1 ORDER BY listid  DESC";
//     const results = await executeQuery(sql);
//     res.json(results);
//   } catch (error) {
//     console.error("Error executing query:", error);
//   }
// }

// export async function checkSuppression(email, suppressionId) {
//   try {
//     const extractedObjects = [];
//     async function executeQueries(data) {
//       let flag = false;
//       let sql1;
//       let domain;
//       data.forEach(async (item) => {
//         if (!flag) {
//           if (item.list_data_type === "md5") {
//             sql1 =
//               "SELECT COUNT(" +
//               item.list_data_type +
//               ") AS email FROM email_suppression_data WHERE listid IN (" +
//               item.listid +
//               ")  AND " +
//               item.list_data_type +
//               " IN ('" +
//               md5(email) +
//               "')";
//           } else if (item.list_data_type === "domain") {
//             domain = email.match(/@(.+)$/);
//             sql1 =
//               "SELECT COUNT(" +
//               item.list_data_type +
//               ") AS email FROM email_suppression_data WHERE listid IN (" +
//               item.listid +
//               ")  AND " +
//               item.list_data_type +
//               " LIKE ('%" +
//               domain[1] +
//               "%')";
//           } else {
//             sql1 =
//               "SELECT COUNT(" +
//               item.list_data_type +
//               ") AS email FROM email_suppression_data WHERE listid IN (" +
//               item.listid +
//               ")  AND " +
//               item.list_data_type +
//               " IN ('" +
//               email +
//               "')";
//           }
//           const storData = await executeQuery(sql1);
//           if (storData[0].email === 0) {
//             flag = false;
//           } else {
//             flag = true;
//           }
//         }
//       });
//       return flag;
//     }

//     const sql =
//       "SELECT * FROM email_suppression_list WHERE active=1 AND deleted=0 AND listid IN (" +
//       suppressionId +
//       ") ";
//     const results1 = await executeQuery(sql);
//     const results2 = await executeQueries(results1);

//     return results2;
//   } catch (error) {
//     console.error("Error executing query:", error);
//   }
// }

//select * from `email_list_records` where email not in ((SELECT email from `email_suppression_data` where listid in (82,83,84)) OUTER join select  ) limit 10;
