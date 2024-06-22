import { Schema, model } from "mongoose";

const advertisers = Schema(
    {
        network_advertiser_id: { type: Number, default: false },
        network_id: { type: Number, default: false },
        name: { type: String, default: false },
        account_status: { type: String, default: false },
        network_employee_id: { type: Number, default: false },
        internal_notes: { type: String, default: false },
        address_id: { type: Number, default: false },
        is_contact_address_enabled: { type: Boolean, default: false },
        sales_manager_id: { type: Number, default: false },
        is_expose_publisher_reporting_data: { type: String, default: false },
        default_currency_id: { type: String, default: false },
        platform_name: { type: String, default: false },
        platform_url: { type: String, default: false },
        platform_username: { type: String, default: false },
        reporting_timezone_id: { type: Number },
        accounting_contact_email: { type: String, default: false },
        verification_token: { type: String, default: false },
        offer_id_macro: { type: String, default: false },
        affiliate_id_macro: { type: String, default: false },
        time_created: { type: Number, default: false },
        time_saved: { type: Number, default: false },
        relationship: { type: Object, default: false },
        attribution_method: { type: String, default: false },
        email_attribution_method: { type: String, default: false }
    },
    {
        timestamps: true
    }
);

export default model("everflowAdvertisers", advertisers);