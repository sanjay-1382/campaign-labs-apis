import { Schema, model } from "mongoose";

const network = new Schema({
    createdOn: { type: String, default: null },
    billingReminder: { type: String, default: null },
    editDate: { type: String, default: null },
    countryId: { type: Number, default: null },
    editBy: { type: Number, default: null },
    associatedId: { type: Number, default: null },
    networkAdvertiserId: { type: Number, default: null },
    networkId: { type: Number, default: null },
    createdBy: { type: Number, default: null },
    billingStatus: { type: Number, default: null },
    billingPocSameAsAbove: { type: Number, default: null },
    active: { type: Boolean, default: false },
    trackerId: { type: Number, default: null },
    address: { type: String, default: null },
    pocAddress: { type: String, default: null },
    billingPocAddress: { type: String, default: null },
    networkPortalList: { type: Object, default: null },
    creatorName: { type: String, default: null },
    editorName: { type: String, default: null },
    countryName: { type: String, default: null },
    networkAdvertiserName: { type: String, default: null },
    networkName: { type: String, default: null },
    emailId: { type: String, default: null },
    contactNumber: { type: String, default: null },
    pocName: { type: String, default: null },
    pocEmailId: { type: String, default: null },
    pocContactNumber: { type: String, default: null },
    accountNumber: { type: String, default: null },
    billingPocName: { type: String, default: null },
    billingPocEmailId: { type: String, default: null },
    billingPocContactNumber: { type: String, default: null }
});

network.pre('save', async (next) => { next(); });

export default model("network", network); 
