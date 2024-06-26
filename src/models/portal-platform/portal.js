import { Schema, model } from "mongoose";

const portalSchema = new Schema({
    portalName: { type: String, required: true, trim: true },
    createdAt: Date,
    createdId: Number,
    createdBy: String,
    updatedAt: Date,
    updatedId: Number,
    updatedBy: String,
    deletedId: Number,
    deletedBy: String,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

portalSchema.pre('save', async (next) => { next(); });

export default model("portaldetails", portalSchema);