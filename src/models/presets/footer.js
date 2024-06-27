import { Schema, model } from "mongoose";

const footerDetailsSchema = new Schema({
    footerName: { type: String, required: true, trim: true },
    footerMessage: { type: String, required: true },
    associtedId: { type: Number, default: null },
    createdId: Number,
    createdBy: String,
    createdAt: Date,
    updatedId: Number,
    updatedBy: String,
    updatedAt: Date,
    deletedId: Number,
    deletedBy: String,
    deletedAt: Date,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt'
    }
});

footerDetailsSchema.pre('save', async (next) => { next(); });

export default model("footerdetails", footerDetailsSchema); 
