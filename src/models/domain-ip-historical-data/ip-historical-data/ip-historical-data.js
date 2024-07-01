import { Schema, model } from "mongoose";

const ipHistoricalSchema = new Schema(
    {
        ipAddress: String,
        userName: String,
        organizationName: String,
        portalName: String,
        purchasedDate: String,
        expiryDate: String,
        refId: String,
        ipRange: Number,
        createdId: Number,
        createdBy: String,
        createdAt: Date,
        updatedId: Number,
        updatedBy: String,
        updatedAt: Date,
        deletedId: Number,
        deletedBy: String,
        deletedAt: Date,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    }
);

ipHistoricalSchema.pre('save', async (next) => { next(); });

export default model("ipHistoricaldetails", ipHistoricalSchema);