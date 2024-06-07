import NotificationSetting from "../../../models/globalJourneySettings/notificationSettings/notificationSettings";
import { formatDate, isEmailValid } from "../../../helpers/commonFunction";
import logger from "../../../Logger/logger";
function isValidSlackId(slackId) {
  const slackIdRegex = /^[@#][a-zA-Z0-9._-]{1,}$/;
  return slackIdRegex.test(slackId);
}

function isValidSkypeId(skypeId) {
  const skypeIdRegex = /^[a-zA-Z][a-zA-Z0-9_.-]{5,31}$/;
  return skypeIdRegex.test(skypeId);
}
export async function save(req, res, next) {
  const {
    mobilenumber,
    email,
    slack,
    skype,
    createdBy,
    createdByName,
    updatedBy,
    updatedByName
  } = req.body;

  if (mobilenumber.length === 0) {
    return res.status(400).json({
      message: "Mobile Number is required"
    });
  } else if (email.length === 0) {
    return res.status(400).json({
      message: "Email is required"
    });
  } else if (slack.length === 0) {
    return res.status(400).json({
      message: "Slack Id is required"
    });
  } else if (skype.length === 0) {
    return res.status(400).json({
      message: "Skype Id is required"
    });
  } else if (!isEmailValid(email)) {
    return res.status(400).json({
      message: "Email is InValid"
    });
  } else if (createdBy === undefined || createdBy === "") {
    return res.status(400).json({
      message: "createdBy is Required"
    });
  }
  let contactDetails = {
    mobileNumber: mobilenumber,
    emailId: email,
    slackId: slack,
    skypeId: skype,
    actions: "Active",
    createdBy: Number(createdBy),
    createdByName: createdByName,
    updatedBy: Number(updatedBy),
    updatedByName: updatedByName
  };
  try {
    const updateQuery = { active: 2 };
    const updateAllPrevious = await NotificationSetting.updateMany(
      {},
      { $set: { active: 2 } }
    );
    const notificationSettings = await NotificationSetting.create(
      contactDetails
    );
    return res.status(200).json({
      message: "New Notification Settings Details Saved SuccessFully"
    });
  } catch (error) {
    logger.error(`Error occured in save contact details${error.message}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function getContactDetails(req, res, next) {
  try {
    const contactDetails = await NotificationSetting.find({
      active: 1
    }).sort({
      createdAt: -1
    });
    let dummy = contactDetails;
    const formattedData = dummy.map((item) => ({
      ...item,
      createdAt1: formatDate(item.createdAt),
      updatedAt1: formatDate(item.updatedAt)
    }));
    let dummy2 = formattedData;
    const extractedData = dummy2.map((item) => ({
      data: item._doc,
      createdAt1: item.createdAt1,
      updatedAt1: item.updatedAt1
    }));
    return res.status(200).json({
      message: "All Details Fetch SuccessFully",
      result: extractedData
    });
  } catch (error) {
    logger.error(`Error occured in getContact details${error.message}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const contactDetails = await NotificationSetting.findOne({
      createdBy: id,
      active: 1
    });
    return res.status(200).json({
      message: "Success",
      data: contactDetails
    });
  } catch (error) {
    logger.error("Error occured in getById in Notification Settings");
    return res.status(500).json({
      message: "Some error occured while fetching",
      error: error.message
    });
  }
}
export async function changeNotificationSettingsStatus(req, res, next) {
  const { id } = req.params;
  const { action } = req.body;
  if (action === undefined || action === "") {
    return res.status(400).json({
      message: "Status is Required"
    });
  }
  try {
    if (action === 0) {
      const statusActive = await NotificationSetting.findOneAndUpdate(
        { createdBy: id },
        {
          status: "InActive"
        }
      );
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (action === 1) {
      const statusInActive = await NotificationSetting.findOneAndUpdate(
        { createdBy: id },
        {
          status: "Active"
        }
      );
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else if (action === 2) {
      const statusDeleted = await NotificationSetting.findOneAndUpdate(
        { createdBy: id },
        {
          status: "Deleted"
        }
      );
      return res.status(200).json({
        message: "Status Deleted SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Bad Request"
      });
    }
  } catch (error) {
    logger.error(
      `This error in Notification Settings notification Status part ${error}`
    );
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}
export async function updateById(req, res, next) {
  const { id } = req.params;
  const { mobilenumber, email, slack, skype, updatedBy, updatedByName } =
    req.body;
  if (mobilenumber.length === 0) {
    return res.status(400).json({
      message: "Mobile Number is required"
    });
  } else if (email.length === 0) {
    return res.status(400).json({
      message: "Email is required"
    });
  } else if (slack.length === 0) {
    return res.status(400).json({
      message: "Slack Id is required"
    });
  } else if (skype.length === 0) {
    return res.status(400).json({
      message: "Skype Id is required"
    });
  } else if (!isEmailValid(email)) {
    return res.status(400).json({
      message: "Email is InValid"
    });
  } else if (!isValidSlackId(slack)) {
    return res.status(400).json({
      message: "Slack Id is InValid"
    });
  } else if (!isValidSkypeId(skype)) {
    return res.status(400).json({
      message: "Skype Id is InValid"
    });
  }
  let data = {
    mobileNumber: mobilenumber,
    emailId: email,
    slackId: slack,
    skypeId: skype,
    updatedBy: Number(updatedBy),
    updatedByName: updatedByName
  };
  try {
    const contactDetails = await NotificationSetting.findByIdAndUpdate(
      id,
      data
    );
    return res.status(200).json({
      message: "Contact Details Updated Successfully"
    });
  } catch (error) {
    logger.error(
      `Some Error occured while updating in notificationSettings ${error}`
    );
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}
/*const findLoggedUser = await NotificationSetting.find({
      createdBy: createdBy,
      active: 1
    });
    if (findLoggedUser.length > 0) {
      const updatedContent = await NotificationSetting.findOneAndUpdate(
        findLoggedUser[0]._id,
        { active: 0 }
      );
      const userLevelCap1 = await updatedContent.save();
      console.log(userLevelCap1);
      const userLevelCap = await NotificationSetting.create(contactDetails);
      return res.status(200).json({
        message: "Notification Settings Updated SuccessFully"
      });
    } else {
      const createUpdatedDetails = await NotificationSetting.create(
        contactDetails
      );
      return res.status(200).json({
        message: "Notification Settings Saved SuccessFully"
      });
    }*/





