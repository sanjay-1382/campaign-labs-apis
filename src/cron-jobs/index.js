import Queue from "bull";
import {
    flushSegmentNow,
    getSegmentEmailFlushByDate,
    getSegmentEmailFlushByDay,
    getSegmentEmailFlushByDaily,
    updateClicksInListRecords,
    updateSentsInListRecords,
    updateOpensInListRecords,
    NetWorkEverFlow,
    OffersEverFlow,
    updateCroneJobsStats,
    updateListRecords,
    updateCountBasedOnSegment,
    updateOpensWhileOpensIsNotTracked,
    getExpiringDomains,
    getExpiryIP
} from "./runquery.js";
import { slack } from "../services/slack/slack.js";
import { brevoDataStats } from "./brevoWebHookData.js";

const redisConfig = {
    redis: {
        host: process.env.CL_API_REDIS_HOST,
        port: process.env.CL_API_REDIS_PORT,
        password: process.env.CL_API_REDIS_PASSWORD
    }
};

const cron1StartQueue = new Queue("cron1StartQueue", redisConfig);
const flushTaskQueue = new Queue("flushTaskQueue", redisConfig);

flushTaskQueue.process(async (job, done) => {
    try {
        console.log("process task start", job.data);
        if (job.data.functionName === "flushSegmentNow") {
            await flushSegmentNow(job.data.segmentId);
            console.log("segmentId", job.data.segmentId);
        }
        done();
    } catch (err) {
        done(err);
    }
});

export const addToFlushTaskQueue = (data, options) => {
    console.log("flush task start", data, options);
    flushTaskQueue.add(data, options);
};

const handleQueueFailure = (queue) => {
    queue.on("failed", (job, err) => {
        console.error(`Task failed: ${err.message}`);
        // You can add custom logic here, e.g., retry the task after a delay
        // job.retry(); // Retry the task
    });
};

handleQueueFailure(cron1StartQueue);
handleQueueFailure(flushTaskQueue);

async function removeJob(id) {
    if (id) {
        const job = await cron1StartQueue.getJob(id);
        if (job) {
            await job.remove();
            console.log(`Job with ID ${id} is removed from the queue.`);
        } else {
            console.log(`Job with ID ${id} is not in the queue.`);
        }
    }
    return 1;
}

export async function removeJobList() {
    const queuedJobs = await cron1StartQueue.getJobs();
    await Promise.all(queuedJobs.map(job => removeJob(job.opts?.jobId)));

    setTimeout(() => {
        const tasks = [
            { id: "1", description: "Segment Email Flush By Date", fn: "getSegmentEmailFlushByDate", cron: "05 00 * * *" },
            { id: "2", description: "Segment Email Flush By Day", fn: "getSegmentEmailFlushByDay", cron: "05 00 * * *" },
            { id: "3", description: "Segment Email Flush By Daily", fn: "getSegmentEmailFlushByDaily", cron: "05 00 * * *" },
            { id: "4", description: "Update Opens in List Records", fn: "updateOpensInListRecords", cron: "*/5 * * * *" },
            { id: "5", description: "Update Clicks in List Records", fn: "updateClicksInListRecords", cron: "*/5 * * * *" },
            { id: "6", description: "Update Sents in List Records", fn: "updateSentsInListRecords", cron: "*/5 * * * *" },
            { id: "11", description: "Update Opens While Not Tracked", fn: "updateOpensWhileOpensIsNotTracked", cron: "*/5 * * * *" },
            { id: "14", description: "Update Brevo Webhook Data", fn: "brevoDataStats", cron: "*/5 * * * *" },
            { id: "7", description: "Update NetWork EverFlow Data", fn: "NetWorkEverFlow", cron: "00 10 * * *" },
            { id: "8", description: "Update Offers EverFlow Data", fn: "OffersEverFlow", cron: "00 10 * * *" },
            { id: "9", description: "Update Count Based on Segment", fn: "updateCountBasedOnSegment", cron: "00 10 * * *" },
            { id: "10", description: "Update List Records", fn: "updateListRecords", cron: "00 10 * * *" },
            { id: "12", description: "Send IP Expiry Notification", fn: "getExpiryIP", cron: "00 10 * * *" },
            { id: "13", description: "Send Domain Accounts Expiry Notification", fn: "getExpiringDomains", cron: "00 10 * * *" }
        ];

        tasks.forEach(task => {
            cron1StartQueue.add(
                { source: "systemgenerated", description: task.description, functionName: task.fn },
                { jobId: task.id, repeat: { cron: task.cron } }
            );
        });
    }, 10000);
}

const processJob = async (job) => {
    const { functionName } = job.data;

    const functionsMap = {
        brevoDataStats,
        updateListRecords,
        updateCountBasedOnSegment,
        getSegmentEmailFlushByDate,
        getSegmentEmailFlushByDay,
        getSegmentEmailFlushByDaily,
        updateOpensInListRecords,
        updateClicksInListRecords,
        updateSentsInListRecords,
        NetWorkEverFlow,
        OffersEverFlow,
        updateOpensWhileOpensIsNotTracked,
        getExpiringDomains,
        getExpiryIP
    };

    if (functionsMap[functionName]) {
        console.log(`run ${functionName}`);
        await functionsMap[functionName]();
        updateCroneJobsStats(functionName);

        if (functionName !== "updateOpensInListRecords" &&
            functionName !== "updateClicksInListRecords" &&
            functionName !== "updateSentsInListRecords" &&
            functionName !== "updateOpensWhileOpensIsNotTracked" &&
            functionName !== "getExpiringDomains" &&
            functionName !== "getExpiryIP") {
            const postData = { message: `${functionName} Updated Successfully.` };
            await slack(postData);
        }
    }
};

cron1StartQueue.process(async (job, done) => {
    try {
        await processJob(job);
        done();
    } catch (err) {
        done(err);
    }
});
