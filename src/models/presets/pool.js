import { Schema, model } from "mongoose";

const poolSchema = Schema(
    {
        poolName: { type: String, default: false, required: true },
        poolType: { type: String, default: false, required: true },
        subjectLines: { type: Object, subjects: { type: Array, default: [], required: true } },
        templates: { type: Object, template: { type: Array, default: [] } },
        esps: { type: Object, esp: { type: Array, default: [] } },
        offers: { type: Object, offer: { type: Array, default: [] } },
        headers: { type: Object, header: { type: Array, default: [] } },
        fromNames: { type: Object, fromName: { type: Array, default: [] } },
        journeyType: { type: String, enum: ["General"], default: "General" },
        active: { type: String, enum: ["Active", "InActive", "Deleted"], default: "Active" },
        status: { type: String, enum: ["Draft", "ApprovalPending", "Approved", "Scheduled", "Running", "Paused", "Stopped", "Completed"], default: "Draft" },
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

poolSchema.pre('save', async (next) => { next(); });

export default model("pooldetails", poolSchema);
