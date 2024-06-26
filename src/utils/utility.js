import { compare } from 'bcrypt';
import { lookup } from 'geoip-lite';
import { randomBytes } from 'crypto';
const moment = require("moment");

// Compair Hash String with Normal string
export const compareHashString = async (str, hashStr) => {
    return await compare(str, hashStr);
}

// Random String generator
export const randomString = (length) => {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

// Get region name from an IP address
export const geoip2state = (ipaddress) => {
    const geo = lookup(ipaddress);
    return geo ? geo.region || '' : '';
}

// Random Number generator
export const randomNumber = (min = 10000, max = 99999) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Delay function
export const waitforme = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Get date in format YYYY-MM-DD
export const getDateYMD = (dt) => {
    try {
        const date = new Date(dt);
        return date.toISOString().split('T')[0];
    } catch (err) {
        console.log(err); throw err;
    }
}



//Get date in format HH:MM:SS
export const getDateHMS = (dt) => {
    try {
        const date = new Date(dt);
        return date.toTimeString().split(' ')[0];
    } catch (err) {
        console.log(err); throw err;
    }
}

// Get Date Diff in Days
export const getDateDiff = (d1, d2) => {
    const diffTime = Math.abs(d1 - d2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Get the format bytes sizes
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/********************************************************************************/

export function generateHexCode(length = 6) {
    const hexChars = "0123456789ABCDEF";
    let hexCode = "";
    for (let i = 0; i < length; i++) {
        hexCode += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return hexCode;
}

export const formatDate = (dateString) => moment(dateString).format("DD-MMM-YYYY");

export function splitString(string) { return string.split("x")[1]; }

// export function randomString(length = 8) {
//     const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let result = "";
//     for (let i = 0; i < length; i++) { result += chars[Math.floor(Math.random() * chars.length)]; }
//     return result;
// }

export function isEmailValid(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

const statusConditions = {
    start: ["Draft", "Approved", "Scheduled", "Paused"],
    paused: ["Running"],
    running: ["Paused", "Stopped"],
    ApprovalPending: ["Draft"],
    Approved: ["ApprovalPending"],
};

export function checkJourneyStatus(valueToCheck, forCondition) { return statusConditions[forCondition]?.includes(valueToCheck) ? 1 : 0; }

export const getConvertedDate = (inputDateString) => {
    const date = new Date(`${inputDateString} UTC`);
    return date.toISOString().split("T")[0];
};

export const getDateAsDDMMMYYYY = (date) => {
    const dateObject = new Date(date);
    const day = ("0" + dateObject.getDate()).slice(-2);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(dateObject);
    const year = dateObject.getFullYear();
    return `${day} ${month} ${year}`;
};

export const getNewDateFromDays = (days) => {
    const DaysAgo = new Date();
    DaysAgo.setDate(DaysAgo.getDate() - Number(days));
    return DaysAgo.toISOString().split("T")[0];
};

/********************************************************************************/

// Utility function to format date
// function formatDate(date, format = "Y-m-d H:i:s") {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     if (format === "Y-m-d H:i:s") {
//         return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//     } else if (format === "Y-m-d 00:00:00") {
//         return `${year}-${month}-${day} 00:00:00`;
//     } else if (format === "Y-m-d 23:59:59") {
//         return `${year}-${month}-${day} 23:59:59`;
//     } else if (format === "Y-m-d") {
//         return `${year}-${month}-${day}`;
//     } else if (format === "Y-m-d-H:i:s") {
//         return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
//     }
// }

// Exported functions
export function DiffDateToYMDHIS(diffDay = 1) {
    const date = new Date();
    const currentDateTime = formatDate(date);
    const diffDate = new Date();
    diffDate.setDate(diffDate.getDate() - diffDay);
    const diffDateTime = formatDate(diffDate);
    return { currentDateTime, oneHourAgoDateTime: diffDateTime };
}

export function currentFormatDateToYMDHIS() {
    const date = new Date();
    const currentDateTime = formatDate(date);
    const oneHourAgo = new Date(date.getTime() - 90 * 60 * 1000);
    const oneHourAgoDateTime = formatDate(oneHourAgo);
    const tenMinutesAgo = new Date(date.getTime() - 10 * 60 * 1000);
    const tenMinutesAgoDateTime = formatDate(tenMinutesAgo);
    return { currentDateTime, oneHourAgoDateTime, tenMinutesAgoDateTime };
}

export function getFormattedDateTimeInUTC() {
    const currentDate = new Date();
    const currentDateTimeUTC = currentDate.toISOString().slice(0, 19).replace("T", " ");
    const tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60000);
    const tenMinutesAgoUTC = tenMinutesAgo.toISOString().slice(0, 19).replace("T", " ");
    return { currentDateTimeUTC, tenMinutesAgoUTC };
}

export function formatDateToYMDHIS(date) { return formatDate(date, "Y-m-d H:i:s"); }
export function formatDateToYMDWith0(date) { return formatDate(date, "Y-m-d 00:00:00"); }
export function formatDateToYMDWith59(date) { return formatDate(date, "Y-m-d 23:59:59"); }
export function formatDateToYMD(date) { return formatDate(date, "Y-m-d"); }
export function formatDateToYMDHISWithUnderScore(date) { return formatDate(date, "Y-m-d-H:i:s"); }
