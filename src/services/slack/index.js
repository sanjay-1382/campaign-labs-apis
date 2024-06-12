import axios from "axios";
require("dotenv").config();
export async function slack(postData) {
    const webhookUrl = process.env.CL_API_SLACK_URL;
    const message = { text: postData.message };
    try {
        const result = await axios.post(webhookUrl, message);
        console.log("Message sent successfully:", JSON.stringify(result.data));
    } catch (error) {
        console.log("Error in slack", e);
        throw error;
    }
}