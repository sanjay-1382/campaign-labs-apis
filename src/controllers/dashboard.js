import {
    importCountDashboardReport as _importCountDashboardReport,
    exportCountDashboardReport as _exportCountDashboardReport,
    emailVerificationCountReport as _emailVerificationCountReport
} from '../models/dashboard';

export const importCountDashboardReport = async (req, res) => {
    try {
        const result = await _importCountDashboardReport();
        if (result.length === 0) { return res.notFound({ message: "No data found" }); }
        const resJson = {
            xaxis: result.map(x => x.date),
            legend: ["totalRecords", "importRecords", "newRecords"],
            series: ["totalRecords", "importRecords", "newRecords"].map(name => ({
                name,
                type: "bar",
                barGap: 0,
                emphasis: { focus: "series" },
                data: result.map(x => x[name]),
            })),
        };
        return res.success({ data: resJson });
    } catch (err) {
        return res.internalServerError({ message: 'There is some issues to fetch count report of import source data' });
    }
}

export const exportCountDashboardReport = async (req, res) => {
    try {
        const result = await _exportCountDashboardReport();
        if (result.length === 0) { return res.notFound({ message: "No data found" }); }
        const resJson = {
            xaxis: result.map(x => x.date),
            legend: ["export", "delivered"],
            series: ["export", "delivered"].map(name => ({
                name,
                type: "bar",
                barGap: 0,
                emphasis: { focus: "series" },
                data: result.map(x => x[name]),
            })),
        };
        return res.success({ data: resJson });
    } catch (err) {
        return res.internalServerError({ message: 'There is some issues to fetch count report of import source data' });
    }
}

export const emailVerificationCountReport = async (req, res) => {
    try {
        let result = await _emailVerificationCountReport();
        if (result.length === 0) { return res.notFound({ message: "No data found" }); }
        const resJson = {
            xaxis: result.map(x => x.date),
            legend: ["emailVerifiedCount"],
            series: ["emailVerifiedCount"].map(name => ({
                name,
                type: "bar",
                barGap: 0,
                emphasis: { focus: "series" },
                data: result.map(x => x[name]),
            })),
        };
        return res.success({ data: resJson });
    } catch (err) {
        return res.internalServerError({ message: 'There is some issues to fetch count report of import source data ' + err });
    }
}