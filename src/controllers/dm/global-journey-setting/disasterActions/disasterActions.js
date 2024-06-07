import DisasterActionSchema from "../../../models/globalJourneySettings/disasterActions/disasterActions.js";
import DisasterDropDownSchema from "../../../models/globalJourneySettings/disasterActions/disaster.js";
import ActionTypeDropDownSchema from "../../../models/globalJourneySettings/disasterActions/actionType";
import logger from "../../../Logger/logger";
import { formatDate } from "../../../helpers/commonFunction.js";

export async function save(req, res, next) {
  const { disaster, actiontype, createdBy, createdByName } = req.body;
  if (Object.keys(disaster).length === 0) {
    return res.status(400).json({
      message: "Disaster Type is Required"
    });
  } else if (Object.keys(actiontype).length === 0) {
    return res.status(400).json({
      message: "Action Type is Required"
    });
  }
  const saveDisaster = {
    disaster: disaster,
    actionType: actiontype,
    actions: "InActive",
    createdBy: Number(createdBy),
    createdByName: createdByName
  };

  try {
    const disasterCreated = await DisasterActionSchema.create(saveDisaster);
    return res.status(200).json({
      message: "Disaster Created SuccessFully"
    });
  } catch (error) {
    logger.error("Error Occured in save of disaster Action");
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const disaster = await DisasterActionSchema.findById(id);
    return res.status(200).json({
      message: "Success",
      result: disaster
    });
  } catch (error) {
    logger.error("error Occured in getById in disaster Action");
    return res.status(500).json({
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function updateById(req, res, next) {
  const { id } = req.params;
  const { disaster, actiontype, updatedBy, updatedByName } = req.body;
  const findDisaster={
    disaster: disaster,
  }
  const updatedData = {
    disaster: disaster,
    actionType: actiontype,
    actions: "InActive",
    updatedBy: Number(updatedBy),
    updatedByName: updatedByName
  };
  try {
     const existingData = await DisasterActionSchema.find({
      ...findDisaster,
      _id: { $ne: id }
    });
    if (existingData.length > 0) {
      return res.status(400).json({
        message: "Disaster already exists"
      });
    }
    const disasterUpdated = await DisasterActionSchema.findByIdAndUpdate(
      id,
      updatedData
    );
    return res.status(200).json({
      message: "Disaster Updated Successfully"
    });
  } catch (error) {
    logger.error(
      `error Occured in updateById in disaster Action ${error.message}`
    );
    return res.status(500).json({
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function getAll(req, res, next) {
  try {
    const disaster = await DisasterActionSchema.find({
      actions: { $in: ["Active", "InActive"] },
    }).sort({ createdAt: -1 });
    let dummy = disaster;
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
    logger.error(`error Occured in getAll in disaster Action${error}`);
    return res.status(500).json({
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function changeDisasterStatus(req, res, next) {
  const { id } = req.params;
  const { action } = req.body;
  try {
    if (action === 0) {
      const statusActive = await DisasterActionSchema.findByIdAndUpdate(id, {
        actions: "InActive"
      });
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (action === 1) {
      const statusInActive = await DisasterActionSchema.findByIdAndUpdate(id, {
        actions: "Active"
      });
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Bad Request"
      });
    }
  } catch (error) {
    logger.error(`This error in changeDisasterStatus part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

//dropdown apis

export async function actionTypeDropDown(req, res, next) {
  const actionType = await ActionTypeDropDownSchema.find({ status: 1 });
  try {
    res.json({
      code: 200,
      message: "Action Type Fetched Successfully",
      data: actionType
    });
  } catch (error) {
    res.json({
      code: 500,
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function disasterDropDown(req, res, next) {
  const disaster = await DisasterDropDownSchema.find({ status: 1 });
  try {
    return res.status(200).json({
      message: "Success",
      result: disaster
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function addDiasterDropDown(req, res, next) {
  const { disaster } = req.body;
  try {
    let data = { disaster: disaster, status: 1 };
    const disasterCreated = await DisasterDropDownSchema.create(data);
    return res.status(200).json({
      message: "Disaster Created Successfully"
    });
  } catch (error) {
    logger.error(
      `error Occured in AddDiasterDropDown in disaster Action ${error}`
    );
    return res.status(500).json({
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function addActionTypeDropDown(req, res, next) {
  const { actionType, actionValue } = req.body;
  try {
    let data = { actionType: actionType, actionValue: actionValue, status: 1 };
    const actionTypeCreated = await ActionTypeDropDownSchema.create(data);
    return res.status(200).json({
      message: "Action Type Created Successfully"
    });
  } catch (error) {
    logger.error(
      `error Occured in AddActionTypeDropDown in disaster Action ${error}`
    );
    return res.status(500).json({
      message: "Some error Occured",
      error: error.message
    });
  }
}

export async function changeDiasterDropDownStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({
      message: "Status is Required"
    });
  }
  try {
    if (status === 0) {
      const statusActive = await DisasterDropDownSchema.findByIdAndUpdate(id, {
        status: 0
      });
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (status === 1) {
      const statusInActive = await DisasterDropDownSchema.findByIdAndUpdate(
        id,
        {
          status: 1
        }
      );
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else if (status === 2) {
      const statusDeleted = await DisasterDropDownSchema.findByIdAndUpdate(id, {
        status: 2
      });
      return res.status(200).json({
        message: "Status Deleted SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Bad Request"
      });
    }
  } catch (error) {
    logger.error(`This error in changeDiasterDropDownStatus part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function changeActionTypeDropDownStatus(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({
      message: "Status is Required"
    });
  }
  try {
    if (status === 0) {
      const statusActive = await ActionTypeDropDownSchema.findByIdAndUpdate(
        id,
        {
          status: 0
        }
      );
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (status === 1) {
      const statusInActive = await ActionTypeDropDownSchema.findByIdAndUpdate(
        id,
        {
          status: 1
        }
      );
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else if (status === 2) {
      const statusDeleted = await ActionTypeDropDownSchema.findByIdAndUpdate(
        id,
        {
          status: 2
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
    logger.error(`This error in changeActionTypeDropDownStatus part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}
/* const result = await DisasterActionSchema.find(findDisaster);
    console.log(result);
    if (result.length > 0) {
      const disasterUpdated = await DisasterActionSchema.findOneAndUpdate(
        { createdBy: result[0].createdBy },
        { active: 0 }
      );
      await disasterUpdated.save();
      const disasterCreated = await DisasterActionSchema.create(saveDisaster);
      return res.status(200).json({
        message: "Disaster Updated SuccessFully"
      });
    } else {
      const disasterCreated = await DisasterActionSchema.create(saveDisaster);
      return res.status(200).json({
        message: "Disaster Created Successfully"
      });
    }*/
    /*
else if (action === 2) {
      const statusDeleted = await DisasterActionSchema.findByIdAndUpdate(id, {
        actions: "Deleted"
      });
      return res.status(200).json({
        message: "Status Deleted SuccessFully"
      });
    }
*/