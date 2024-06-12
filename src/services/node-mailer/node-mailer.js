import { createTransport } from 'nodemailer';
const { CL_NODE_MAILER_HOST, CL_NODE_MAILER_PORT, CL_NODE_MAILER_USERNAME, CL_NODE_MAILER_PASSWORD } = process.env;
const authentication = {
    host: CL_NODE_MAILER_HOST, port: CL_NODE_MAILER_PORT, ssl: false, tls: true,
    auth: { user: CL_NODE_MAILER_USERNAME, pass: CL_NODE_MAILER_PASSWORD }
};
const transport = createTransport(authentication);
// const toEmail = 'sanjay.sharma@zappian.com';
// const bccEmail = 'sanjay.sharma@zappian.com';
const toEmail = 'veerendra@zappian.com, piyush@zappian.com';
// const ccEmail = 'harshit.rathore@zappian.com';
const bccEmail = 'anand@zappian.com, sanjay.sharma@zappian.com';

export const feedStop = (data, subject, component, cb) => {
    const tableRows = data.map((item) => {
        return `<tr style="background-color:#f1eded; display:table-row; vertical-align:inherit; border-color:inherit;">
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.ownerName} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.datasourceid} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.sourceName} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${component} </td>
                </tr>`;
    });
    const mailOptions = {
        from: CL_NODE_MAILER_USERNAME, to: toEmail, /*cc: ccEmail,*/ bcc: bccEmail, subject: subject,
        html: `<p>Dear Team,</p>
                <p>We have encountered an issue in our application, [<b>CampaignLabs</b>], and I wanted to provide you with a brief overview of the error details for your reference.</p>
                <p><b>Error Details:</b></p>
                <div style="width:1200px; font-family:sans-serif;">
                    <table border="1" width="1000" class="table" style="border:1px solid #000000; width:100%; margin-bottom:1rem; color:#212b36; border-collapse:collapse;">
                        <thead>
                            <tr style="background-color:#06207c; color:#ffffff; text-align:center; display:table-row; vertical-align:inherit; border-color:inherit;">
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Source Owner Name </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Data Source ID </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Data Source Name </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Affected Module </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </div>
                <p>Please feel free to reach out if you need more information or have any questions regarding this error.</p>
                <p>Thank you for your attention to this matter, and we apologize for any inconvenience this may have caused.</p>
                <p><b>NOTE:</b> This is an automatically generated mail – please do not reply to it. If you have any queries regarding the same, kindly contact CampaignLabs Team.</p>
                <p><b>Thanks</b>,</p>
                <p>CampaignLabs Admin</p>`
    };
    transport.sendMail(mailOptions, (err, info) => { if (err) { cb(err, null); } else { cb(null, info); } });
}

export const sendErrorLogs = (data, subject, component, cb) => {
    const tableRows = data.map((item) => {
        return `<tr style="background-color:#f1eded; display:table-row; vertical-align:inherit; border-color:inherit;">
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.createdAt} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> (${item.sourceId}) - ${item.name} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.errorCount} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.status} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.response} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${component} </td>
                </tr>`;
    });
    const mailOptions = {
        from: CL_NODE_MAILER_USERNAME, to: toEmail, /*cc: ccEmail,*/ bcc: bccEmail, subject: subject,
        html: `<p>Dear Team,</p>
                <p>We have encountered an issue in our application, [<b>CampaignLabs</b>], and I wanted to provide you with a brief overview of the error details for your reference.</p>
                <p><b>Error Details:</b></p>
                <div style="width:1200px; font-family:sans-serif;">
                    <table border="1" width="1000" class="table" style="border:1px solid #000000; width:100%; margin-bottom:1rem; color:#212b36; border-collapse:collapse;">
                        <thead>
                            <tr style="background-color:#06207c; color:#ffffff; text-align:center; display:table-row; vertical-align:inherit; border-color:inherit;">
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Date </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Source ID </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Occurrence Count </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Error Message </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Stack Trace </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Affected Module </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </div>
                <p>Please feel free to reach out if you need more information or have any questions regarding this error.</p>
                <p>Thank you for your attention to this matter, and we apologize for any inconvenience this may have caused.</p>
                <p><b>NOTE:</b> This is an automatically generated mail – please do not reply to it. If you have any queries regarding the same, kindly contact CampaignLabs Team.</p>
                <p><b>Thanks</b>,</p>
                <p>CampaignLabs Admin</p>`
    };
    transport.sendMail(mailOptions, (err, info) => { if (err) { cb(err, null); } else { cb(null, info); } });
}

export const countDifferences = (data, subject, component, cb) => {
    const tableRows = data.map((item) => {
        return `<tr style="background-color:#f1eded; display:table-row; vertical-align:inherit; border-color:inherit;">
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.createDate} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.datasourceid} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.datasourcename} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.average} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.previousDayTotal} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> Significant difference in percentage is: ${item.percentDifference}% </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${component} </td>
                </tr>`;
    });
    const mailOptions = {
        from: CL_NODE_MAILER_USERNAME, to: toEmail, /*cc: ccEmail,*/ bcc: bccEmail, subject: subject,
        html: `<p>Dear Team,</p>
                <p>We would like to inform you a routine check to monitor our data for any substantial count differences, specifically when there is a variance of more than 50% compared to the counts from the previous three days.</p>
                <p><b>Error Details:</b></p>
                <div style="width:1200px; font-family:sans-serif;">
                    <table border="1" width="1000" class="table" style="border:1px solid #000000; width:100%; margin-bottom:1rem; color:#212b36; border-collapse:collapse;">
                        <thead>
                            <tr style="background-color:#06207c; color:#ffffff; text-align:center; display:table-row; vertical-align:inherit; border-color:inherit;">
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Date </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Source ID </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Source Name </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Previous 3 Day Average Count </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Previous Day Count </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Percentage Difference </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Affected Module </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </div>
                <p>Please feel free to reach out if you need more information or have any questions regarding this error.</p>
                <p>Thank you for your attention to this matter, and we apologize for any inconvenience this may have caused.</p>
                <p><b>NOTE:</b> This is an automatically generated mail – please do not reply to it. If you have any queries regarding the same, kindly contact CampaignLabs Team.</p>
                <p><b>Thanks</b>,</p>
                <p>CampaignLabs Admin</p>`
    };
    transport.sendMail(mailOptions, (err, info) => { if (err) { cb(err, null); } else { cb(null, info); } });
}

export const dailyRecordCheck = (data, subject, component, duration, cb) => {
    const tableRows = data.map((item) => {
        return `<tr style="background-color:#f1eded; display:table-row; vertical-align:inherit; border-color:inherit;">
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.datasourceid} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${item.datasourcename} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${duration} </td>
                    <td style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6; text-align:center;"> ${component} </td>
                </tr>`;
    });
    const mailOptions = {
        from: CL_NODE_MAILER_USERNAME, to: toEmail, /*cc: ccEmail,*/ bcc: bccEmail, subject: subject,
        html: `<p>Dear Team,</p>
                <p>I would like to bring to your attention the importance of regularly monitoring our ${component} data sources for any lapses in record reception.</p>
                <p>To ensure the integrity of our data, it is imperative that we check daily for any ${component} data source that has not received any records in the last ${duration}. This proactive approach will help us identify any potential issues and take necessary actions to rectify them promptly.</p>
                <p><b>Error Details:</b></p>
                <div style="width:1200px; font-family:sans-serif;">
                    <table border="1" width="1000" class="table" style="border:1px solid #000000; width:100%; margin-bottom:1rem; color:#212b36; border-collapse:collapse;">
                        <thead>
                            <tr style="background-color:#06207c; color:#ffffff; text-align:center; display:table-row; vertical-align:inherit; border-color:inherit;">
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Source ID </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Source Name </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Duration </th>
                                <th style="padding:3px; vertical-align:top; border-top:1px solid #dee2e6;"> Affected Module </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.join('')}
                        </tbody>
                    </table>
                </div>
                <p>Please feel free to reach out if you need more information or have any questions regarding this error.</p>
                <p>Thank you for your attention to this matter, and we apologize for any inconvenience this may have caused.</p>
                <p><b>NOTE:</b> This is an automatically generated mail – please do not reply to it. If you have any queries regarding the same, kindly contact CampaignLabs Team.</p>
                <p><b>Thanks</b>,</p>
                <p>CampaignLabs Admin</p>`
    };
    transport.sendMail(mailOptions, (err, info) => { if (err) { cb(err, null); } else { cb(null, info); } });
}

// export default { feedStop, sendErrorLogs, countDifferences, dailyRecordCheck };