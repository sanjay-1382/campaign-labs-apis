import { Schema, model } from "mongoose";

const footerDetails = new Schema({
    footerName: { type: String, required: true, trim: true },
    footerMessage: { type: String, required: true },
    associtedId: { type: Number, default: null },
    createdAt:  Date ,
    createdId:  Number ,
    createdBy:  String ,
    updatedAt:  Date ,
    updatedId:  Number ,
    updatedBy:  String ,
    deletedId:  Number ,
    deletedBy:  String ,
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

footerDetails.pre('save', async (next) => { next(); });

export default model("footerDetails", footerDetails); 
