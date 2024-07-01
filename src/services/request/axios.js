import axios from "axios";
import { Configuration, EmailsApi } from "@elasticemail/elasticemail-client-ts-axios";
import { MailtrapClient } from "mailtrap";

export async function espBrevo(postData, apiKey) {
    try {
        const { fromName, fromDomain, to: toEmail, subject, emailHtml: base64Template, firstName: initialFirstName = "User" } = postData;
        const firstName = initialFirstName || "User";
        const senderEmail = `${fromName}@${fromDomain}`.trim().replace(/\s/g, "");

        const data = {
            sender: { name: fromName, email: senderEmail.toLowerCase() },
            to: [{ email: toEmail, name: firstName }],
            subject,
            htmlContent: base64Template
        };

        const response = await axios.post("https://api.brevo.com/v3/smtp/email", data, {
            headers: {
                accept: "application/json",
                "api-key": apiKey,
                "content-type": "application/json"
            }
        });
        return response.data.messageId || 0;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function mapingage(postData, apiKey) {
    try {
        const result = await axios.post("https://cepapi.kenscio.com/v2/sendmail", postData, {
            headers: {
                Authorization: `Basic ${apiKey}`,
                "Content-Type": "application/json"
            }
        });
        return JSON.stringify(result.data);
    } catch (error) {
        console.error("Error in mapengage", error);
        throw error;
    }
}

export async function XMROpentext(postData) {
    try {
        const { userId, password, emailHtml, emailText, dataString, subject, fromName, replyTo } = postData;

        const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <soap:Header xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <ns1:Request xmlns:ns1="http://ws.easylink.com/RequestResponse/2011/01">
                <ns1:ReceiverKey>http://messaging.easylink.com/soap/sync</ns1:ReceiverKey>
                <ns1:Authentication>
                <ns1:XDDSAuth>
                    <ns1:RequesterID>${userId}</ns1:RequesterID>
                    <ns1:Password>${password}</ns1:Password>
                </ns1:XDDSAuth>
                </ns1:Authentication>
            </ns1:Request>
            </soap:Header>
            <soap:Body xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <ns2:JobSubmitRequest xmlns:ns2="http://ws.easylink.com/JobSubmit/2011/01">
                <ns2:DocumentSet>
                <ns2:Document ref="HTML_Body">
                    <ns2:DocType>HTML</ns2:DocType>
                    <ns2:DocData format="base64">${emailHtml}</ns2:DocData>
                </ns2:Document>
                <ns2:Document ref="TEXT_Body">
                    <ns2:DocType>text</ns2:DocType>
                    <ns2:Filename>TEXT_Body.txt</ns2:Filename>
                    <ns2:DocData format="base64">${emailText}</ns2:DocData>
                </ns2:Document>
                <ns2:Document ref="CSVList1">
                    <ns2:DocType>text</ns2:DocType>
                    <ns2:Filename>CSVList.csv</ns2:Filename>
                    <ns2:DocData format="base64">${dataString}</ns2:DocData>
                </ns2:Document>
                </ns2:DocumentSet>
                <ns2:Message>
                <ns2:JobOptions>
                    <ns2:Delivery>
                    <ns2:Schedule>express</ns2:Schedule>
                    </ns2:Delivery>
                    <ns2:EnhancedEmailOptions>
                    <ns2:ExpirationDays>1</ns2:ExpirationDays>
                    <ns2:Subject>${subject}</ns2:Subject>
                    <ns2:FromDisplayName>${fromName}</ns2:FromDisplayName>
                    <ns2:ReplyTo>${replyTo}</ns2:ReplyTo>
                    <ns2:HTMLOpenTracking>bottom</ns2:HTMLOpenTracking>
                    </ns2:EnhancedEmailOptions>
                </ns2:JobOptions>
                <ns2:Destinations>
                    <ns2:Table ref="CSVList_Table1">
                    <ns2:DocRef>CSVList1</ns2:DocRef>
                    </ns2:Table>
                </ns2:Destinations>
                <ns2:Contents>
                    <ns2:Part>
                    <ns2:DocRef>HTML_Body</ns2:DocRef>
                    <ns2:Treatment>body</ns2:Treatment>
                    </ns2:Part>
                    <ns2:Part>
                    <ns2:DocRef>TEXT_Body</ns2:DocRef>
                    <ns2:Treatment>body</ns2:Treatment>
                    </ns2:Part>
                </ns2:Contents>
                </ns2:Message>
            </ns2:JobSubmitRequest>
            </soap:Body>
        </soapenv:Envelope>`;

        const response = await axios.post("https://messaging.easylink.com/soap/sync", xmlString, {
            headers: { "Content-Type": "application/xml" },
            maxBodyLength: Infinity
        });

        const xml2js = require("xml2js");
        const result = await xml2js.parseStringPromise(response.data);

        const statusMessage = result.Envelope.Body[0].JobSubmitResult[0].MessageResult[0].Status[0].StatusMessage[0].toLowerCase();
        if (statusMessage === "ok") {
            return JSON.stringify(result);
        } else {
            throw new Error("Email not sent");
        }
    } catch (error) {
        console.error("Error in SMTP API call", error);
        throw error;
    }
}

export async function SmtpDotCom(postData, apiKey) {
    try {
        const { userId, firstName, to, emailHtml: base64Template, emailText: base64Text, subject, fromName, replyTo } = postData;

        const data = JSON.stringify({
            channel: "second_IP_zappian",
            recipients: { to: [{ name: firstName, address: to }] },
            originator: { from: { name: fromName, address: userId } },
            subject,
            body: { parts: [{ version: "1.0", type: "text/html", charset: "utf-8", encoding: "base64", content: base64Template }] }
        });

        const response = await axios.post("https://api:dc95adbcff9bf0f2efa9a12c1d84ac63bf169215@api.smtp.com/v4/messages", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
                maxBodyLength: Infinity
            }
        });
        return JSON.stringify(response.data);
    } catch (error) {
        console.error("Error in SMTP API call", error);
        throw error;
    }
}

export async function ElasticEmail(postData, apiKey) {
    const { to, firstName, emailHtml: base64Template, emailText: base64Text, subject, fromName } = postData;

    const config = new Configuration({ apiKey });
    const emailsApi = new EmailsApi(config);

    const emailMessageData = {
        Recipients: [{ Email: to, Fields: { name: firstName } }],
        Content: {
            Body: [
                { ContentType: "HTML", Charset: "utf-8", Content: base64Template },
                { ContentType: "PlainText", Charset: "utf-8", Content: base64Text }
            ],
            From: "harshitrathoredot@yahoo.com",
            Subject: subject
        }
    };

    try {
        const response = await emailsApi.emailsPost(emailMessageData);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error("Error in SMTP API call", error);
        throw error;
    }
}

export async function Mailtrap(postData, apiKey) {
    try {
        const { fromName, fromDomain, subject, emailHtml } = postData;

        const SENDER_EMAIL = "info@demomailtrap.com";
        const RECIPIENT_EMAIL = "shambhu@zappian.com";

        const client = new MailtrapClient({ token: apiKey });
        const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };
        const response = await client.send({
            from: sender,
            to: [{ email: RECIPIENT_EMAIL }],
            subject: subject,
            html: emailHtml
        });

        return JSON.stringify(response);
    } catch (error) {
        console.error("Error in Mailtrap:", error);
        throw error;
    }
}

export async function Sinch(postData, apiKey) {
    try {
        const { to, firstName, lastName, subject, fromName, replyTo, emailHtml, emailText } = postData;

        const data = {
            "subject": subject,
            "from": { "email": "support@erio.vivcoa.com", "name": fromName },
            "reply_to": { "email": replyTo, "name": "reply" },
            "recipients": [{
                "to": [{ "email": to, "name": firstName + ' ' + lastName }],
                "attributes": { ":name": "Mr. " + firstName, ":city": "", ":greeting": "Pleasure" },
                "unique_arguments": { "x-apiheader": "SL1589999999999" }
            }],
            "content": { "text": emailText, "html": emailHtml }
        };

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.pinchappmails.com/v1/mail/send',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            data: JSON.stringify(data)
        };

        const response = await axios.request(config);
        return JSON.stringify(response.data);
    } catch (error) {
        console.error("Error in Sinch:", error);
        throw error;
    }
}