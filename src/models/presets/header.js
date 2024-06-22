import { Schema, model } from "mongoose";

const header = new Schema({
    headerName: { type: String, required: true, trim: true, unique: true },
    headerMessage: { type: String, required: true },
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

header.pre('save', async (next) => { next(); });

export default model("header", header); 
