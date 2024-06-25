import { Schema, model } from "mongoose";

const journeyControlSchema = Schema(
    {
        itemData: { type: Array, default: [], required: true }
    }
);

export default model("journeycontrols", journeyControlSchema);