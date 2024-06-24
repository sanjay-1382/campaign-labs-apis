import { config } from 'dotenv';
config({ path: './src/configs/.env' });
import axios from "axios";
import EverFlowAdvertiserDetails from "../../models/portal-platform/everflow/advertisers";
import EverFlowAffiliatesDetails from "../../models/portal-platform/everflow/affiliates";
import EverFlowOfferDetails from "../../models/portal-platform/everflow/offers";

const axiosInstance = axios.create({
    baseURL: "https://api.eflow.team/v1/networks",
    maxBodyLength: Infinity,
    headers: { "X-Eflow-API-Key": process.env.CL_EVERFLOW_API_KEY },
    timeout: 99999
});

async function fetchAndStoreData(endpoint, pageSize, modelSchema) {
    let page = 1;
    let hasMoreData = true;
    while (hasMoreData) {
        try {
            const response = await axiosInstance.get(`/${endpoint}?page_size=${pageSize}&page=${page}`);
            const data = response.data[endpoint];
            if (!data || data.length === 0) { hasMoreData = false; continue; }
            if (data.length > 0) { await modelSchema.insertMany(data); }
            hasMoreData = data.length === pageSize;
            page += 1;
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}: `, error);
            hasMoreData = false;
        }
    }
}

export async function storeAdvertisers() { await fetchAndStoreData('advertisers', 500, EverFlowAdvertiserDetails); }
export async function storeAffiliates() { await fetchAndStoreData('affiliates', 500, EverFlowAffiliatesDetails); }
export async function storeOffers() { await fetchAndStoreData('offers', 500, EverFlowOfferDetails); }