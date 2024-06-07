import { executeQuery } from "../../helpers/mysql/mysqlConnection";

export async function getAll(req, res, next) {
  try {
    if (process.env.CL_API_ENV === "local") {
      // res.json([{}])
    }
    // Example query listid IN (385,390,391) AND
    const sql =
      "SELECT listid,list_name,records FROM email_data_list WHERE active=1 AND deleted=0 AND associated_id=157 ORDER BY listid DESC";
    const results = await executeQuery(sql);
    res.json(results);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}

export async function getByListId(req, res, next) {
  try {
    const id = req.params.id;
    const sql = `SELECT segmentid,segment_name,count FROM email_data_segment  WHERE 
        deleted=0 AND listid=${id} `;
    const results = await executeQuery(sql);
    res.json(results);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getEmailSegmentData(id) {
  try {
    const sql =
      "SELECT listid,segmentid,segment_name,count,query FROM email_data_segment WHERE deleted=0 AND segmentid IN (" +
      id +
      ")";
    const results1 = await executeQuery(sql);
    // console.log(results1);

    /**************************************************************/
    async function executeQueries(data) {
      const results = await Promise.all(
        data.map(async (item) => {
          const storData = await executeQuery(item.query);
          const extractedData = storData.map((item1) => ({
            email: item1.email,
            firstname: item1.firstname,
            lastname: item1.lastname,
            segmentId: item.segmentid,
            listId: item.listid
          }));
          return { extractedData };
        })
      );
      return results;
    }

    const results = await executeQueries(results1);
    const extractedObjects = [];

    results.forEach((item) => {
      if (Array.isArray(item.extractedData)) {
        item.extractedData.forEach((obj) => {
          extractedObjects.push(obj);
        });
      }
    });
    return extractedObjects;

    /**************************************************************/
    // const results123 = await executeQuery(results1[0].query);
    // return results123;
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getEmailSegmentDetails(id) {
  try {
    const sql =
      "SELECT GROUP_CONCAT(segmentid) AS segmentid,GROUP_CONCAT(listid) AS listid FROM email_data_segment WHERE deleted=0 AND segmentid IN (" +
      id +
      ")";
    const results = await executeQuery(sql);
    return results;
  } catch (err) {
    console.log("Error " + err);
  }
}

// This api for Event Occurs Data
export async function getEventOccurs(req, res, next) {
  try {
    const result = [
      { label: "No Delay", value: "0" },
      { label: "Yesterday", value: "-1" },
      { label: "Tomorrow", value: "+1" },
      { label: "Last 3 Days", value: "-3" },
      { label: "Next 3 Days", value: "+3" },
      { label: "Last 7 Days", value: "-7" },
      { label: "Next 7 Days", value: "+7" },
      { label: "Last 15 Days", value: "-15" },
      { label: "Next 15 Days", value: "+15" },
      { label: "Last 30 Days", value: "-30" },
      { label: "Next 30 Days", value: "+30" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}
