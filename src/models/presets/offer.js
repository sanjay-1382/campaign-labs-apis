import { Schema, model } from "mongoose";

const offerSchema = new Schema({
    offerID: Number,
    offerName: String,
    offerLink: String,
    personalUnsub: { type: String, default: null },
    networkUnsub: { type: String, default: null },
    verticalId: Number,
    subVerticalId: Number,
    // trackierId: {type: Number, default: null},
    method: { type: Number, default: 0 },
    associatedId: { type: Number, default: 1 },
    portal: { type: Schema.Types.ObjectId, ref: 'portaldetails' },
    network: { type: Schema.Types.ObjectId, ref: 'everflowAdvertisers' },
    offer: { type: Schema.Types.ObjectId, ref: 'everflowOffers' },
    affiliate: { type: Schema.Types.ObjectId, ref: 'everflowAffiliates' },
    createdAt: Date,
    createdId: Number,
    createdBy: String,
    updatedAt: Date,
    updatedId: Number,
    updatedBy: String,
    deletedId: Number,
    deletedBy: String,
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

offerSchema.pre('save', async (next) => { next(); });

export default model("offerdetails", offerSchema);