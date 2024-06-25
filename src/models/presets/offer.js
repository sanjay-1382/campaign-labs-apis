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
    trackierId: { type: Number, default: null },
    categoryId: Number,
    createdBy: String,
    updateBy: Number,
    method: { type: Number, default: 0 },
    verticalId: Number,
    associatedId: { type: Number, default: 1 },
    networkPortalList: { type: String, default: null },
    network: { type: String, default: null },
    offer: { type: String, default: null },
    affiliate: { type: String, default: null },
    updatedBy: String,
    createdAt: Date,
    createdId: Number,
    updatedAt: Date,
    updatedId: Number,
    deletedId: Number,
    deletedBy: String,
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

offerSchema.pre('save', async (next) => { next(); });

export default model("offerdetails", offerSchema);