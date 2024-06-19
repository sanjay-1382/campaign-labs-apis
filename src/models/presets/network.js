import { Schema, model } from "mongoose";

const network = new Schema({


    portalName: { type: String, default: null },
    prtalId: { type: String, default: null },
    affiliatesId: { type: String, default: null },
    affiliatesName: { type: String, required: true, trim: true, unique: true },
    advertiserId: { type: Number, default: null },
    advertiserName: { type: String, default: null },
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
});

network.pre('save', async (next) => { next(); });

export default model("network", network); 
