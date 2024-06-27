import { Schema, model } from "mongoose";

const header = new Schema({
    headerName: { type: String, required: true, trim: true },
    headerMessage: { type: String, required: true },
    associtedId: { type: Number, default: null },
    createdAt: Date,
    createdId: Number,
    createdBy: String,
    updatedAt: Date,
    updatedId: Number,
    updatedBy: String,
    deletedAt: Date,
    deletedId: Number,
    deletedBy: String,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', deletedAt: 'deletedAt' }
});

header.pre('save', async (next) => { next(); });

export default model("headerdetails", header); 
