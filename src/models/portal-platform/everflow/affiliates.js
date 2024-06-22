import { Schema, model } from "mongoose";

const affiliates = Schema(
    {

        network_affiliate_id: { type: Number, default: false },
        network_id: { type: Number, default: false },
        name: { type: String, default: false },
        account_status: { type: String, default: false },
        network_employee_id: { type: Number, default: false },
        internal_notes: { type: String, default: false },
        has_notifications: { type: Boolean, default: false },
        network_traffic_source_id: { type: Number, default: false },
        account_executive_id: { type: Number, default: false },
        adress_id: { type: Number, default: false },
        default_currency_id: { type: String, default: false },
        is_contact_address_enabled: { type: Boolean, default: false },
        enable_media_cost_tracking_links: { type: Boolean, default: false },
        time_created: { type: Number, default: false },
        time_saved: { type: Number, default: false },
        relationship: { type: Object, default: false },
        referrer_id: { type: Number, default: false },
    },
    {
        timestamps: true
    }
);

export default model("everflowAffiliates", affiliates);