import axios from "axios";
import EverFlowSchema from "../../models/everflow/networkadvertisers.js";
import EverFlowOffers from "../../models/everflow/networkoffers.js";

const axiosInstance = axios.create({
    baseURL: "https://api.eflow.team/v1/networks",
    maxBodyLength: Infinity,
    headers: { "X-Eflow-API-Key": process.env.CL_API_EFLOW_API_KEY }
});

export async function getNetworks() {
    try {
        const response = await axiosInstance.get("/advertisers");
        await insertNetworkData(response.data.advertisers);
        console.log("Network data saved successfully to MongoDB.");
    } catch (error) {
        console.error("Error fetching network data:", error);
    }
}

export async function getOffers() {
    try {
        const data = { filters: { offer_status: "active" } };
        const response = await axiosInstance.post("/offerstable", data, {
            headers: { "Content-Type": "application/json" }
        });
        await insertOffersData(response.data.offers);
        await insertDataAndCheckStatus(response.data);
        console.log("Offers data saved successfully to MongoDB.");
    } catch (error) {
        console.error("Error fetching offers data:", error);
    }
}

async function insertNetworkData(networkDataArray) {
    try {
        const networkPromises = networkDataArray.map(async networkData => {
            const network = new EverFlowSchema({
                network_advertiser_id: networkData.network_advertiser_id,
                network_id: networkData.network_id,
                name: networkData.name,
                account_status: networkData.account_status,
                network_employee_id: networkData.network_employee_id,
                internal_notes: networkData.internal_notes,
                address_id: networkData.address_id,
                is_contact_address_enabled: networkData.is_contact_address_enabled,
                sales_manager_id: networkData.sales_manager_id,
                is_expose_publisher_reporting_data: networkData.is_expose_publisher_reporting_data,
                default_currency_id: networkData.default_currency_id,
                platform_name: networkData.platform_name,
                platform_url: networkData.platform_url,
                platform_username: networkData.platform_username,
                reporting_timezone_id: networkData.reporting_timezone_id,
                accounting_contact_email: networkData.accounting_contact_email,
                verification_token: networkData.verification_token,
                offer_id_macro: networkData.offer_id_macro,
                affiliate_id_macro: networkData.affiliate_id_macro,
                time_created: networkData.time_created,
                time_saved: networkData.time_saved,
                relationship: networkData.relationship,
                attribution_method: networkData.attribution_method,
                email_attribution_method: networkData.email_attribution_method
            });
            return network.save();
        });
        await Promise.all(networkPromises);
    } catch (error) {
        console.error("Error inserting network data:", error);
    }
}

async function insertOffersData(offerDataArray) {
    try {
        const offerPromises = offerDataArray.map(async offerData => {
            const offer = new EverFlowOffers({
                network_offer_id: offerData.network_offer_id,
                network_id: offerData.network_id,
                network_advertiser_id: offerData.network_advertiser_id,
                name: offerData.name,
                offer_status: offerData.offer_status,
                thumbnail_url: offerData.thumbnail_url,
                visibility: offerData.visibility,
                network_advertiser_name: offerData.network_advertiser_name,
                category: offerData.category,
                network_offer_group_id: offerData.network_offer_group_id,
                time_created: offerData.time_created,
                time_saved: offerData.time_saved,
                payout: offerData.payout,
                revenue: offerData.revenue,
                today_revenue: offerData.today_revenue,
                daily_conversion_cap: offerData.daily_conversion_cap,
                weekly_conversion_cap: offerData.weekly_conversion_cap,
                monthly_conversion_cap: offerData.monthly_conversion_cap,
                global_conversion_cap: offerData.global_conversion_cap,
                daily_payout_cap: offerData.daily_payout_cap,
                weekly_payout_cap: offerData.weekly_payout_cap,
                monthly_payout_cap: offerData.monthly_payout_cap,
                global_payout_cap: offerData.global_payout_cap,
                daily_revenue_cap: offerData.daily_revenue_cap,
                weekly_revenue_cap: offerData.weekly_revenue_cap,
                monthly_revenue_cap: offerData.monthly_revenue_cap,
                global_revenue_cap: offerData.global_revenue_cap,
                daily_click_cap: offerData.daily_click_cap,
                weekly_click_cap: offerData.weekly_click_cap,
                monthly_click_cap: offerData.monthly_click_cap,
                global_click_cap: offerData.global_click_cap,
                destination_url: offerData.destination_url,
                labels: offerData.labels,
                today_clicks: offerData.today_clicks,
                is_force_terms_and_conditions: offerData.is_force_terms_and_conditions,
                project_id: offerData.project_id,
                channels: offerData.channels,
                relationship: offerData.relationship,
                optimized_thumbnail_url: offerData.optimized_thumbnail_url,
                currency_id: offerData.currency_id,
                revenue_amount: offerData.revenue_amount,
                payout_amount: offerData.payout_amount,
                today_revenue_amount: offerData.today_revenue_amount,
                today_payout_amount: offerData.today_payout_amount,
                payout_type: offerData.payout_type,
                revenue_type: offerData.revenue_type,
                revenue_percentage: offerData.revenue_percentage,
                payout_percentage: offerData.payout_percentage,
                encoded_value: offerData.encoded_value
            });
            return offer.save();
        });
        await Promise.all(offerPromises);
    } catch (error) {
        console.error("Error inserting offers data:", error);
    }
}

async function insertDataAndCheckStatus(responseData) {
    // Implement the required logic for this function based on your needs.
}
