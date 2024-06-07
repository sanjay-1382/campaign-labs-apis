export async function getAll(req, res, next) {
  try {
    const result = [
      { label: "First Name", value: "{{fname}}" },
      { label: "Last Name", value: "{{lname}}" },
      { label: "Credit Score", value: "{{creditScore}}" },
      { label: "Applied Amount", value: "{{appliedAmount}}" },
      { label: "Zip Code", value: "{{zipCode}}" },
      { label: "City", value: "{{city}}" },
      { label: "State", value: "{{state}}" },
      { label: "Date of Birth", value: "{{dateOfBirth}}" },
      { label: "Offer Link", value: "{{offerLink}}" },
      { label: "Personal Unsub Link", value: "{{personalUnsubLink}}" },
      { label: "Network Unsub Link", value: "{{networkUnsubLink}}" },
      { label: "Portal Unsub Link", value: "{{portalUnsubLink}}" },
      { label: "Email", value: "{{email}}" },
      { label: "Day", value: "{{day}}" },
      { label: "Campaign Name", value: "{{campaignName}}" },
      { label: "s1", value: "{{s1}}" },
      { label: "s2", value: "{{s2}}" },
      { label: "s3", value: "{{s3}}" },
      { label: "From Name", value: "{{fromName}}" },
      { label: "Subject Line", value: "{{subjectLine}}" },
      { label: "From Domain", value: "{{fromDomain}}" },
      { label: "From Email Name", value: "{{fromEmailName}}" },
      { label: "Current Date", value: "{{currentDate}}" },
      // { label: "Requested Amount", value: "{{requestedAmount}}" },
      // { label: "Mobile", value: "{{mobile}}" },
      // { label: "Offer Link", value: "{{link}}" },
      // { label: "List Id", value: "{{list_id}}" },
      // { label: "Mailing Id", value: "{{mailing_id}}" },
      // { label: "Segment Id", value: "{{segment_id}}" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function callapi(req, res, next) {
  try {
    const result = [{ label: "Datalake", value: "Datalake" }];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}
