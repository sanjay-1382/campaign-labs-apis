import IpHistoricalSchema from "../../../models/domain-ip-historical-data/ip-historical-data/ip-historical-data.js";
import fs from "fs";
import csvParser from "csv-parser";
import { randomString, validateIPAddress } from "../../../utils/utility.js";
import { insertMany, findMany, updateMany } from "../../../services/db/mongo-db-definition.js";
import moment from 'moment';

export const addDomainIpDetails = async (req, res) => {
    const { data, user } = req.body;
    const dataToCreate = { ...data, createdId: user.id, createdBy: user.name }
    dataToCreate.refId = randomString(10);
    let newIp = [];
    if (dataToCreate.ipAddress) {
        // let newipAddress = dataToCreate?.ipAddress.length == 1 ? dataToCreate?.ipAddress : JSON.parse(dataToCreate?.ipAddress);
        let newipAddress = dataToCreate?.ipAddress;
        // Check if 'ip_add' exists in the request body 
        if (newipAddress) {
            newipAddress.map((ip) => {
                if (validateIPAddress(ip)) {
                    newIp.push(ip);
                }
            });
        }
    }

    try {
        // If there is a CSV file, read and parse it 
        if (dataToCreate.type === "multiple" && req.file) {
            fs.createReadStream(req.file.path)
                .pipe(csvParser())
                .on("data", (data) => {
                    if (data.ipAddress) {
                        newIp.push(data.ipAddress);
                    }
                })
                .on("end", () => {
                    // After parsing CSV, save data to the database
                    saveDataToDatabase(newIp, dataToCreate, res);
                });
        } else {
            // If there is no CSV file, directly save data to the database
            saveDataToDatabase(newIp, dataToCreate, res);
        }
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.internalServerError({ message: "Error inserting data" });
    }
};

const saveDataToDatabase = async (newIp, dataToCreate, res) => {

    if (newIp.length == 0) {
        return res.validationError({ message: "No  validate IP Address Found" })
    }
    try {
        // If 'new_ip' array has IP addresses, save each IP along with other data
        let newDataToCreate = [];
        newIp.forEach(async (id) => {
            if (validateIPAddress(id)) {
                const newData = {
                    ipAddress: id,
                    organizationName: dataToCreate.organizationName,
                    purchasedDate: dataToCreate.purchasedDate,
                    portalName: dataToCreate.portalName,
                    userName: dataToCreate.userName,
                    expiryDate: dataToCreate.expiryDate,
                    refId: dataToCreate.refId,
                    ipRange: dataToCreate.ipRange,
                    createdBy: dataToCreate.createdBy,
                    createdId: dataToCreate.createdId
                };
                newDataToCreate.push(newData);
            }
        });
        await insertMany(IpHistoricalSchema, newDataToCreate);
        console.log("Data inserted successfully: ");
        res.success({ message: "Data saved successfully: " });
    } catch (error) {
        console.error("Error inserting data: ", error);
        return res.internalServerError({ message: "Error inserting data" });
    }
};

export const getDomainIpDetails = (req, res) => {
    findMany(IpHistoricalSchema, {}, {}, { sort: { createdAt: -1 } })
        .then((foundData) => {
            if (foundData && foundData.length > 0) {
                const dataToSend = foundData.map((data, index) => ({
                    serialNo: index + 1,
                    id: data._id,
                    ipAddress: data.ipAddress,
                    userName: data.userName,
                    organizationName: data.organizationName,
                    portalName: data.portalName,
                    purchasedDate: data.purchasedDate,
                    expiryDate: data.expiryDate,
                    refId: data.refId,
                    ipRange: data.ipRange,
                    createdId: data.createdId,
                    createdBy: data.createdBy,
                    createdAt: moment(data.createdAt).format('DD MMMM YYYY, HH:mm:ss'),
                    updatedId: data.updatedId,
                    updatedBy: data.updatedBy,
                    updatedAt: moment(data.updatedAt).format('DD MMMM YYYY, HH:mm:ss'),
                    deletedId: data.deletedId,
                    deletedBy: data.deletedBy,
                }));
                res.success({ data: dataToSend });
            } else {
                res.status(404).json({ status: 404, message: "no Data found..", data: null });
            }
        })
        .catch((error) => {
            console.error("Error finding data by ID:", error);
            res.status(500).json({ status: 500, message: "No data found..", data: null });
        });
};

export const updateDomainIpDetails = async (req, res) => {
    const { data, user } = req.body
    const query = data.editMode === "forthis" ? { _id: req.params.id } : { refId: data.refId };
    // console.log(query);
    const dataToUpdate = { expiryDate: data.expiryDate, updatedId: user.id, updatedBy: user.name };
    try {
        const result = await updateMany(IpHistoricalSchema, query, dataToUpdate);
        res.success({ data: result })
    } catch (error) {
        console.error("Error updating IP data:", error);
        res.internalServerError();
    }
};
