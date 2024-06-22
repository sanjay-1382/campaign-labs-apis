import { Schema, model } from "mongoose";

const offerSchema = new Schema({
    offerName: String,
    offerGroupId: { type: Number, default: null },
    offerGroupName: { type: String, default: null },
    offerLink: String,
    personalUnsub: { type: String, default: null },
    networkUnsub: { type: String, default: null },
    payout: { type: Number, default: null },
    paymentType: { type: String, default: null },
    trackerId: { type: Number, default: null },
    networkId: { type: Number, default: null },
    categoryId: { type: Number, default: null },
    updateBy: { type: Number, default: null },
    active: { type: Number, default: 1 },
    method: { type: Number, default: 0 },
    verticalId: { type: Number, default: null },
    associatedId: { type: Number, default: 1 },
    networkAdvertiserId: { type: Number, default: null },
    networkOfferId: { type: Number, default: null },
    networkPortalList: { type: String, default: null },
    everFlowNetworks: { type: String, default: null },
    everFlowOffers: { type: String, default: null },
    everFlowAffiliates: { type: String, default: null },
    updatedBy: { type: String, default: null },
    createdAt: Date,
    createdId: { type: Number, default: null },
    createdBy: { type: String, default: null },
    updatedAt: Date,
    updatedId: { type: Number, default: null },
    deletedId: { type: Number, default: null },
    deletedBy: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

offerSchema.pre('save', async (next) => { next(); });

export default model("Offer", offerSchema);