import { Schema, model } from "mongoose";

const network = new Schema({
    associatedId: Number,
    networkId: Number,
    networkName: { type: String, required: true, trim: true },
    countryId: Number,
    countryName: String,
    trackierId: Number,
    portalId: Number,
    portalName: String,
    // affiliatesId: { type: String, default: null },
    // affiliatesName: { type: String, required: true, trim: true, unique: true },
    // advertiserId: { type: Number, default: null },
    // advertiserName: { type: String, default: null },
    createdAt: Date,
    createdId: Number,
    createdBy: String,
    updatedAt: Date,
    updatedId: Number,
    updatedBy: String,
    deletedId: Number,
    deletedBy: String,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    // address:,
    // emailId:,
    // contactNumber:,
    // pocName:,
    // pocAddress:,
    // pocEmailId:,
    // pocContactNumber:,
    // accountNumber:,
    // billingReminder:,
    // billingStatus:,
    // billingPocSameAsAbove:,
    // billingPocName:,
    // billingPocAddress:,
    // billingPocEmailId:,
    // billingPocContactNumber:,
    // networkPortalList:,
    // network_advertiser_name:,
    // network_advertiser_id:,

}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

network.pre('save', async (next) => { next(); });

export default model("networkdetails", network); 
