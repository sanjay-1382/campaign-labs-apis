import { Schema, model } from "mongoose";

const journeyMenuSchema = Schema(
    {
        itemData: { type: Array, default: [], required: true }
    }
);

export default model("journeymenu", journeyMenuSchema);