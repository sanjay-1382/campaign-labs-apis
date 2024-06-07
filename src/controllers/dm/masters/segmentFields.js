export const getAllSegmentFields = (req, res) => {
  res.json({
    segmentFields: {
      listFields: [
        {
          type: 1,
          name: "Email",
          field_name: "email",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Domain",
          field_name: "domain",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        /*{
          type: 1,
          name: "Md5",
          field_name: "md5",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },*/
        {
          type: 1,
          name: "Firstname",
          field_name: "firstname",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Lastname",
          field_name: "lastname",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "City",
          field_name: "city",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "State",
          field_name: "state",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Country",
          field_name: "country",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Zipcode",
          field_name: "zipcode",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Mobile",
          field_name: "mobile",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        /*{
          type: 1,
          name: "Carrier",
          field_name: "carrier",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },*/
        {
          type: 1,
          name: "Gender",
          field_name: "gender",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Loanpurpose",
          field_name: "loanpurpose",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Loanamount",
          field_name: "loanamount",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Income Type",
          field_name: "income_type",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Homeowner",
          field_name: "homeowner",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Creditscore",
          field_name: "creditscore",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Age",
          field_name: "age",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Company",
          field_name: "company",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Jobtitle",
          field_name: "jobtitle",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        /*{
          type: 1,
          name: "Pan Number",
          field_name: "pan_number",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "District",
          field_name: "district",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        },
        {
          type: 1,
          name: "Marital Status",
          field_name: "marital_status",
          operator: "",
          offer_id: "",
          segment_type: "",
          abs: 1,
          operand: "",
          browser: "",
          os: "",
          state: "",
          time_range: ">=",
          condition: "AND",
          date_relative_type: "DAY",
          slot: "DAY",
          to_slot: "DAY",
          abs_date_value: "2023-12-14"
        }*/
      ],
      behaviouralFields: [
        {
          type: 2,
          name: "Sent",
          field_name: "last_sent",
          operator: 0,
          time_range: "",
          number_of_time: 0,
          repeat_operator: 0,
          repeat_from: "",
          esp_list: "",
          from_date: "",
          to_date: "",
          from: "",
          slot: "",
          to: "",
          to_slot: "",
          condition: "AND"
        },
        {
          type: 2,
          name: "Opened",
          field_name: "last_opened",
          operator: 0,
          time_range: "",
          number_of_time: 0,
          repeat_operator: 0,
          repeat_from: "",
          esp_list: "",
          from_date: "",
          to_date: "",
          from: "",
          slot: "",
          to: "",
          to_slot: "",
          condition: "AND"
        },
        {
          type: 2,
          name: "Clicked",
          field_name: "last_clicked",
          operator: 0,
          time_range: "",
          number_of_time: 0,
          repeat_operator: 0,
          repeat_from: "",
          esp_list: "",
          from_date: "",
          to_date: "",
          from: "",
          slot: "",
          to: "",
          to_slot: "",
          condition: "AND"
        }
        // ,
        // {
        //   type: 2,
        //   name: "Created Date",
        //   field_name: "added_here",
        //   operator: 0,
        //   time_range: "",
        //   from_date: "",
        //   to_date: "",
        //   from: "",
        //   slot: "",
        //   to: "",
        //   to_slot: "",
        //   condition: "AND"
        // }
      ],
      systemFields: [
        {
          type: 3,
          name: "Created_date",
          field_name: "added_here",
          abs: 1,
          operator: "",
          abs_date_value: "",
          date_relative_value: "",
          date_relative_type: "",
          condition: "AND"
        }
      ]
    }
  });
};

// This api for Event Occurs Data
export async function getListFields(req, res, next) {
  try {
    const result = [
      { label: "Equals", value: "=" },
      { label: "Not Equals", value: "!=" },
      { label: "Contains", value: "LIKE" },
      { label: "Does Not Contain", value: "NOT LIKE" },
      { label: "Begins With", value: "LIKE_" },
      { label: "Ends With", value: "_LIKE" },
      { label: "Is Empty", value: "empty" },
      { label: "Is Not Empty", value: "notempty" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getSysSlots(req, res, next) {
  try {
    const result = [
      { label: "Hour", value: "HOUR" },
      { label: "Day", value: "DAY" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getAbsolutes(req, res, next) {
  try {
    const result = [
      { label: "Before", value: "<" },
      { label: "After", value: ">" },
      { label: "Before/On", value: "<=" },
      { label: "After/On", value: ">=" },
      { label: "On", value: "=" },
      { label: "Not On", value: "!=" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getRelatives(req, res, next) {
  try {
    const result = [
      { label: "Less Than", value: ">" },
      { label: "Exactly/Less Than", value: ">=" },
      { label: "Exactly/More Than", value: "<=" },
      { label: "More Than", value: "<" },
      { label: "Exactly", value: "=" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getAbsRadios(req, res, next) {
  try {
    const result = [
      { label: "Absolute", value: 1 },
      { label: "Relative", value: 2 }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getSlots(req, res, next) {
  try {
    const result = [
      { label: "Hours", value: "HOUR" },
      { label: "Day", value: "DAY" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getConditions(req, res, next) {
  try {
    const result = [
      { label: "And", value: "AND" },
      { label: "Or", value: "OR" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function numberOfTimes(req, res, next) {
  try {
    const result = [
      { label: "Less Than", value: ">" },
      { label: "Equal To", value: "=" },
      { label: "More Than", value: "<" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getBehaviours(req, res, next) {
  try {
    const result = [
      { label: "Custom", value: "custom" },
      { label: "Between", value: "between" },
      { label: "Less Than", value: ">" },
      { label: "Less Than/Equal To", value: ">=" },
      { label: "More Than", value: "<" },
      { label: "More Than/Equal To", value: "<=" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getOperators(req, res, next) {
  try {
    const result = [
      { label: "Equals", value: "=" },
      { label: "Not Equals", value: "!=" },
      { label: "Contains", value: "LIKE" },
      { label: "Does Not Contain", value: "NOT LIKE" },
      { label: "Begins With", value: "LIKE_" },
      { label: "Ends With", value: "_LIKE" },
      { label: "Is Empty", value: "empty" },
      { label: "Is Not Empty", value: "notempty" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getSegmentCategory(req, res, next) {
  try {
    const result = [
      { label: "Email Engagement", value: "emailengagement" },
      { label: "Email Flush", value: "emailflush" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}
