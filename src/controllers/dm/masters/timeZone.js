import { executeQuery } from "../../helpers/mysql/mysqlConnection";

export async function getAll(req, res, next) {
  try {
    // Example query
    const sql =
      "SELECT time_zone.timeZone,time_zone.full_time_zone,time_zone.sc_time_zone,daylight_saving_time_detection.dst_title,daylight_saving_time_detection.dst_start_month,daylight_saving_time_detection.dst_start_from,daylight_saving_time_detection.dst_end_month,daylight_saving_time_detection.dst_end_to,time_zones_by_country.* FROM time_zones_by_country LEFT JOIN time_zone ON time_zones_by_country.time_zone_id=time_zone.id LEFT JOIN daylight_saving_time_detection ON time_zones_by_country.dst_id=daylight_saving_time_detection.id WHERE time_zones_by_country.active=1";
    const result = await executeQuery(sql);
    const goBack = [];

    for (let i = 0; i < result.length; i++) {
      const UTCTimeDifference =
        result[i]["pve_nve"] + result[i]["hours"] * 60 + result[i]["minute"];

      const arrSub = {
        label: `UTC${result[i]["pve_nve"]}${result[i]["hours"]}:${result[i]["minute"]} ${result[i]["full_time_zone"]} (${result[i]["sc_time_zone"]})`,
        value: UTCTimeDifference,
        timeZone: result[i]["timeZone"]
      };
      goBack.push(arrSub);
    }
    console.log(goBack);
    res.json(goBack);
  } catch (error) {
    console.error("Error executing query:", error);
  }
}
