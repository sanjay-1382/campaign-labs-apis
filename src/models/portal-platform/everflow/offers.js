import { Schema, model } from "mongoose";

const offers = Schema(
    {
        network_offer_id: { type: Number, default: false },
        network_id: { type: Number, default: false },
        network_advertiser_id: { type: Number, default: false },
        name: { type: String, default: false },
        offer_status: { type: String, default: false },
        thumbnail_url: { type: String, default: false },
        visibility: { type: String, default: false },
        network_advertiser_name: { type: String, default: false },
        category: { type: String, default: false },
        network_offer_group_id: { type: Number, default: false },
        time_created: { type: Number, default: false },
        time_saved: { type: Number, default: false },
        payout: { type: String, default: false },
        revenue: { type: String, default: false },
        today_revenue: { type: String, default: false },
        daily_conversion_cap: { type: Number, default: 0 },
        weekly_conversion_cap: { type: Number, default: 0 },
        monthly_conversion_cap: { type: Number, default: 0 },
        global_conversion_cap: { type: Number, default: 0 },
        daily_payout_cap: { type: Number, default: 0 },
        weekly_payout_cap: { type: Number, default: 0 },
        monthly_payout_cap: { type: Number, default: 0 },
        global_payout_cap: { type: Number, default: 0 },
        daily_revenue_cap: { type: Number, default: 0 },
        weekly_revenue_cap: { type: Number, default: 0 },
        monthly_revenue_cap: { type: Number, default: 0 },
        global_revenue_cap: { type: Number, default: 0 },
        daily_click_cap: { type: Number, default: 0 },
        weekly_click_cap: { type: Number, default: 0 },
        monthly_click_cap: { type: Number, default: 0 },
        global_click_cap: { type: Number, default: 0 },
        destination_url: { type: String, default: false },
        labels: { type: String, default: false },
        today_clicks: { type: Number, default: 0 },
        is_force_terms_and_conditions: { type: Boolean, default: false },
        project_id: { type: String, default: false },
        channels: { type: Array, default: [] },
        relationship: { type: Object, },
        optimized_thumbnail_url: { type: String, default: false },
        currency_id: { type: String, default: false },
        revenue_amount: { type: Number, default: 0 },
        payout_amount: { type: Number, default: 0 },
        today_revenue_amount: { type: Number, default: 0 },
        today_payout_amount: { type: Number, default: 0 },
        payout_type: { type: String, default: false },
        revenue_type: { type: String, default: false },
        revenue_percentage: { type: Number, default: 0 },
        payout_percentage: { type: Number, default: 0 },
        encoded_value: { type: String, default: false }
    },
    {
        timestamps: true
    }
);

export default model("everflowOffers", offers);