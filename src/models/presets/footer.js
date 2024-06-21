import { Schema, model } from "mongoose";

const footerDetails = new Schema({
    footerName: { type: String, required: true, trim: true, unique: true },
    footerMessage: { type: String, required: true },
    associtedId: { type: Number, default: null },
    createdAt: {type: Date },
    createdId: {type: Number },
    createdBy: {type: String },
    updatedAt: {type: Date },
    updatedId: {type: Number },
    updatedBy: {type: String },
    deletedId: {type: Number },
    deletedBy: {type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

footerDetails.pre('save', async (next) => { next(); });

export default model("footerDetails", footerDetails); 
