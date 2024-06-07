import { compare } from 'bcrypt';
import { lookup } from 'geoip-lite';
import { randomBytes } from 'crypto';

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
