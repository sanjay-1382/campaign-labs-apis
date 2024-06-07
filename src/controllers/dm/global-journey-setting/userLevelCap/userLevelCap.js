import logger from "../../../Logger/logger";
import UserLevelCapSchema from "../../../models/globalJourneySettings/userLevelCap/userLevelCap";
import { formatDate } from "../../../helpers/commonFunction";

export async function save(req, res, next) {
  const {
    emailPerDay,
    emailPerWeek,
    emailPerMonth,
    emailPerYear,
    userId,
    createdBy,
    createdByName,
    updatedBy,
    updatedByName
  } = req.body;

  if (emailPerDay === undefined || emailPerDay === "") {
    return res.status(400).json({
      message: "emailPerDay is required"
    });
  } else if (emailPerWeek === undefined || emailPerWeek === "") {
    return res.status(400).json({
      message: "emailPerWeek is required"
    });
  } else if (emailPerMonth === undefined || emailPerMonth === "") {
    return res.status(400).json({
      message: "emailPerMonth is required"
    });
  } else if (emailPerYear === undefined || emailPerYear === "") {
    return res.status(400).json({
      message: "emailPerYear is required"
    });
  } else if (createdBy === undefined) {
    return res.status(400).json({
      message: "createdBy is required"
    });
  }

  let userLevelCapData = {
    emailPerDay: Number(emailPerDay),
    emailPerWeek: Number(emailPerDay*7),
    emailPerMonth: Number(emailPerDay*30),
    emailPerYear: Number(emailPerDay*365),
    userId: Number(userId),
    createdBy: Number(createdBy),
    createdByName: createdByName,
    updatedBy: Number(updatedBy),
    updatedByName: updatedByName
  };
  console.log(userLevelCapData);
  try {

    const updateQuery = { active: 2 };
    const updateAllPrevious = await UserLevelCapSchema.updateMany(
      {},
      { $set: { active: 2 } }
    );
    const userLevelCap = await UserLevelCapSchema.create(userLevelCapData);
    return res.status(200).json({
      message: "New User Level Cap Saved SuccessFully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function getAllCaps(req, res, next) {
  try {
    const userLevelCaps = await UserLevelCapSchema.find({ active: 1 }).sort({
      createdAt: -1
    });
    let dummy = userLevelCaps;
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
      message: "Success",
      result: extractedData
    });
  } catch (error) {
    logger.error(`This error in getAllCaps of User Level Cap  ${error}`);
    return res.json({
      message: "Some Error Occured While Fetching",
      error: error.message
    });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const userLevelCap = await UserLevelCapSchema.findOne({
      createdBy: Number(id),
      active: 1
    });
    return res.status(200).json({
      message: "Success",
      result: userLevelCap
    });
  } catch (error) {
    logger.error(`This error in getByID of User Level Cap  ${error}`);
    return res.json({
      message: "Some Error Occured While Fetching",
      error: error.message
    });
  }
}

export async function updateById(req, res, next) {
  const id = req.params.id;
  const {
    emailPerDay,
    emailPerWeek,
    emailPerMonth,
    emailPerYear,
    updatedBy,
    updatedByName
  } = req.body;

  if (emailPerDay.length === 0) {
    return res.status(400).json({
      message: "Email Per Day is required"
    });
  } else if (emailPerWeek.length === 0) {
    return res.status(400).json({
      message: "Email Per Week is required"
    });
  } else if (emailPerMonth.length === 0) {
    return res.status(400).json({
      message: "Email Per Month is required"
    });
  } else if (emailPerYear.length === 0) {
    return res.status(400).json({
      message: "Email Per Year is required"
    });
  }
  try {
    let data = {
      emailPerDay: Number(emailPerDay),
      emailPerWeek: Number(emailPerDay*7),
      emailPerMonth: Number(emailPerDay*30),
      emailPerYear: Number(emailPerDay*365),
      updatedBy: Number(updatedBy),
      updatedByName: updatedByName
    };
    const userLevelCap = await UserLevelCapSchema.findByIdAndUpdate(id, data, {
      new: true
    });
    return res.status(200).json({
      message: "Updated SuccessFully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occured"
    });
  }
}
/* const findUserForUserLevelCap = await UserLevelCapSchema.find({
      userId: userId,
      active: 1
    });
    if (findUserForUserLevelCap.length > 0) {
      const updatedContent = await UserLevelCapSchema.findOneAndUpdate(
        findUserForUserLevelCap[0]._id,
        { active: 0 }
      );
      const userLevelCap1 = await updatedContent.save();
      console.log(userLevelCap1);
      const userLevelCap = await UserLevelCapSchema.create(userLevelCapData);
      return res.status(200).json({
        message: "User Level Cap Updated SuccessFully"
      });
    } else {
      const userNotFoundThenCreate = await UserLevelCapSchema.create(
        userLevelCapData
      );
      return res.status(200).json({
        message: "User Level Cap Created SuccessFully"
      }); }*/