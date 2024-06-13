import { Schema, model } from "mongoose";

const offerSchema = new Schema({
offerName: String,
offerGroupId: {
    type: Number,
    default: null
},
offerGroupName: {
    type: String,
    default: null
},
offerLink: String,
personalUnsub: {
    type: String,
    default: null
},
networkUnsub: {
    type: String,
    default: null
},
payout: {
    type: Number,
    default: null
},
paymentType: {
    type: String,
    default: null
},
trackerId: {
    type: Number,
    default: null
},
networkId: {
    type: Number,
    default: null
},
categoryId: {
    type: Number,
    default: null
},
createdBy: {
    type: Number,
    default: null
},
editedBy: {
    type: Number,
    default: null
},
active: {
    type: Number,
    default: 1
},
method: {
    type: Number,
    default: 0
},
verticalId: {
    type: Number,
    default: null
},
associatedId: {
    type: Number,
    default: 1
},
networkAdvertiserId: {
    type: Number,
    default: null
},
name: {
    type: String,
    default: null
},
networkOfferId: {
    type: Number,
    default: null
},
networkPortalList: {
    type: String,
    default: null
},
everFlowNetworks: {
    type: String,
    default: null
},
everFlowOffers: {
    type: String,
    default: null
},
creatorName: {
    type: String,
    default: null
},
editorName: {
    type: String,
    default: null
},
}, {timestamps: true})

offerSchema.pre('save', async (next) => { next(); });

export default model("Offer", offerSchema);