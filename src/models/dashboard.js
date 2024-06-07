import { ClickHouseCon } from '../configs/db-connection';
import { getDateYMD } from '../utils/utility';
import moment from 'moment';

let today = new Date();
let fromdate = new Date(); fromdate.setDate(fromdate.getDate() - 14);
let todate = new Date(); todate.setDate(todate.getDate());
// console.log(getDateYMD(fromdate) + ' | ' + getDateYMD(todate));

export async function importCountDashboardReport() {
    try {
        const query = `SELECT reportDate, sum(posted_records) AS posted_records, sum(success_records) AS success_records, sum(failed_records) AS failed_records, sum(unique_records) AS unique_records, sum(total_dupes) AS total_dupes, sum(dupe_records) AS dupe_records, sum(bad_records) AS bad_records FROM( SELECT date(created) AS reportDate, sum(posted_rowcount) AS posted_records, sum(success_rowcount) AS success_records, sum(failed_rowcount) AS failed_records, sum(uniq_rowcount) AS unique_records, sum(dupe_60_days) AS total_dupes, sum(dupe_rowcount) AS dupe_records, sum(bad_rowcount) AS bad_records FROM db_datalab_master.tbl_import_response_log a WHERE date(created) BETWEEN '${getDateYMD(fromdate)}' AND '${getDateYMD(todate)}' GROUP BY created) GROUP BY reportDate ORDER BY reportDate ASC`;
        const result = await ClickHouseCon.querying(query, { dataObjects: true });
        const finalData = result.data.map(resData => ({
            reportDate: resData.reportDate,
            date: moment(resData.reportDate).format("MMM DD"),
            totalRecords: parseInt(resData.posted_records),
            importRecords: parseInt(resData.success_records),
            newRecords: parseInt(resData.unique_records),
        }));
        const dateSet = new Set(finalData.map(data => data.reportDate));
        const last15Days = Array.from({ length: 15 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            return getDateYMD(date);
        });
        const availableData = last15Days
            .filter(reportDate => !dateSet.has(reportDate))
            .map(reportDate => ({
                reportDate,
                date: moment(reportDate).format("MMM DD"),
                totalRecords: 0,
                importRecords: 0,
                newRecords: 0
            }));
        return [...finalData, ...availableData];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function exportCountDashboardReport() {
    try {
        const query = `SELECT date(createdAt) AS reportDate, COUNT() as export, SUM(sentCount) as delivered from db_datalab_master.mst_export_sent_data_count WHERE date(createdAt) BETWEEN '${getDateYMD(fromdate)}' AND '${getDateYMD(todate)}' GROUP BY date(createdAt) ORDER BY reportDate ASC`;
        const result = await ClickHouseCon.querying(query, { dataObjects: true });
        const finalData = result.data.map(resData => ({
            reportDate: resData.reportDate,
            date: moment(resData.reportDate).format("MMM DD"),
            export: parseInt(resData.export),
            delivered: parseInt(resData.delivered),
        }));
        const dateSet = new Set(finalData.map(data => data.reportDate));
        const last15Days = Array.from({ length: 15 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            return getDateYMD(date);
        });
        const availableData = last15Days
            .filter(reportDate => !dateSet.has(reportDate))
            .map(reportDate => ({
                reportDate,
                date: moment(reportDate).format("MMM DD"),
                export: 0,
                delivered: 0
            }));
        return [...finalData, ...availableData];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export async function emailVerificationCountReport() {
    try {
        const query = `SELECT count(email_address) AS emailVerifiedCount, DATE(leadlastverificationdateeo) AS reportDate FROM lakehouse_dict.email_validation_dict WHERE DATE(leadlastverificationdateeo) BETWEEN '${getDateYMD(fromdate)}' AND '${getDateYMD(todate)}' GROUP BY reportDate ORDER BY reportDate ASC`;
        const result = await ClickHouseCon.querying(query, { dataObjects: true });
        const finalData = result.data.map(resData => ({
            reportDate: resData.reportDate,
            date: moment(resData.reportDate).format("MMM DD"),
            emailVerifiedCount: parseInt(resData.emailVerifiedCount)
        }));
        const dateSet = new Set(finalData.map(data => data.reportDate));
        const last15Days = Array.from({ length: 15 }, (_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            return getDateYMD(date);
        });
        const availableData = last15Days
            .filter(reportDate => !dateSet.has(reportDate))
            .map(reportDate => ({
                reportDate,
                date: moment(reportDate).format("MMM DD"),
                emailVerifiedCount: 0
            }));
        return [...finalData, ...availableData];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}