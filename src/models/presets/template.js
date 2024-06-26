import { Schema, model } from "mongoose";

const templateSchema = new Schema(
    {
        templateID: Number,
        templateName: String,
        templateHtml: { type: String, default: null },
        templateText: { type: String, default: null },
        verticalId: { type: Array, default: null },
        associatedId: Number,
        journeyId: { type: String, default: null },
        templateType: { type: String, default: "general" },
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
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    })

templateSchema.pre('save', async (next) => { next(); });

export default model("templatedetails", templateSchema);