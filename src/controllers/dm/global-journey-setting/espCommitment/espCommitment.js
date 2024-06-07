import EspCommitmentSchema from "../../../models/globalJourneySettings/espCommitment/espCommitment";
// import EspCommitDropDownSchema from "../../../models/globalJourneySettings/espCommitment/espCommitmentDropdown";
import logger from "../../../Logger/logger";
import { formatDate } from "../../../helpers/commonFunction";

export async function save(req, res, next) {
  const {
    esps,
    espaccountname,
    espvolume,
    periodValue,
    createdBy,
    createdByName
  } = req.body;

  if (Object.keys(esps).length === 0) {
    return res.status(400).json({
      message: "Esp Name is Required"
    });
  } else if (Object.keys(espaccountname).length === 0) {
    return res.status(400).json({
      message: "Esp Account Name is Required"
    });
  } else if (espvolume == null || espvolume == undefined || espvolume == "") {
    return res.status(400).json({
      message: "Esp Volume is Required"
    });
  } else if (Object.keys(periodValue).length === 0) {
    return res.status(400).json({
      message: "Period Value is Required"
    });
  }
  let findEspCommitment = {
    esps: esps,
    espAccountName: espaccountname
  };
  let saveEspCommitment = {
    esps: esps,
    espAccountName: espaccountname,
    espVolume: Number(espvolume),
    periodValues: periodValue,
    createdBy: Number(createdBy),
    createdByName: createdByName
  };

  try {
    const result = await EspCommitmentSchema.find(findEspCommitment);
    if (result.length > 0) {
      return res.status(400).json({
        message: "Esp Commitment Already Exists"
      });
    } else {
      const saveNewEspCommitment = await EspCommitmentSchema.create(
        saveEspCommitment
      );
      return res.status(200).json({
        message: "Esp Commitment Saved Successfully"
      });
    }
  } catch (error) {
    logger.error(`Error Occured While Saving the EspCommitment ${error}`);
    return res.status(500).json({
      message: "Error Occured While Saving the EspCommitment",
      error: error.message
    });
  }
}

export async function getAllEspCommitment(req, res, next) {
  try {
    const espCommitment = await EspCommitmentSchema.find({
      active: { $in: [1, 0] },
      actions: { $in: ["Active", "InActive"] }
    }).sort({ createdAt: -1 });
    let dummy = espCommitment;
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
      message: "Data Fetched Successfully",
      result: extractedData
    });
  } catch (error) {
    logger.error(`Error Occured ${error}`);
    return res.status(500).json({
      message: "Error Occured",
      error: error.message
    });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const singleEspCommitmentData = await EspCommitmentSchema.findOne({
      createdBy: id,
      active: 1
    });
    return res.status(200).json({
      message: "Data Fetched Successfully",
      result: singleEspCommitmentData
    });
  } catch (error) {
    logger.error(`Error Occured in GetById in Esp Commitment ${error}`);
    return res.status(500).json({
      message: "Error Occured",
      error: error.message
    });
  }
}

export async function updateById(req, res, next) {
  const { id } = req.params;
  const {
    esps,
    espaccountname,
    espvolume,
    periodValue,
    updatedBy,
    updatedByName
  } = req.body;
  if (Object.keys(esps).length === 0) {
    return res.status(400).json({
      message: "Esp Name is Required"
    });
  } else if (Object.keys(espaccountname).length === 0) {
    return res.status(400).json({
      message: "Esp Account Name is Required"
    });
  } else if (espvolume == null || espvolume == undefined || espvolume == "") {
    return res.status(400).json({
      message: "Esp Volume is Required"
    });
  } else if (Object.keys(periodValue).length === 0) {
    return res.status(400).json({
      message: "Period Value is Required"
    });
  }
  let findEspCommitment = {
    esps: esps,
    espAccountName: espaccountname
  };
  let espCommitmentUpdateData = {
    esps: esps,
    espAccountName: espaccountname,
    espVolume: Number(espvolume),
    periodValues: periodValue,
    updatedBy: Number(updatedBy),
    updatedByName: updatedByName
  };
  const existingData = await EspCommitmentSchema.find({
    ...findEspCommitment,
    _id: { $ne: id }
  });
  if (existingData.length > 0) {
    return res.status(400).json({
      message: "This Esp Commitment Data Already Exists"
    });
  }
  try {
    const espCommitment = await EspCommitmentSchema.findByIdAndUpdate(
      id,
      espCommitmentUpdateData
    );
    return res.status(200).json({
      message: "espCommitment Updated SuccessFully"
    });
  } catch (error) {
    logger.error(`Error Occured in UpdateById in Esp Commitment ${error}`);
    return res.status(500).json({
      message: "Error Occured",
      error: error.message
    });
  }
}

export async function changeEspStatus(req, res, next) {
  const { id } = req.params;
  const { action } = req.body;
  if (action === undefined || action === "") {
    return res.status(400).json({
      message: "Status is Required"
    });
  }
  try {
    if (action === 0) {
      const statusActive = await EspCommitmentSchema.findByIdAndUpdate(id, {
        active: 0,
        actions: "InActive"
      });
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (action === 1) {
      const statusInActive = await EspCommitmentSchema.findByIdAndUpdate(id, {
        active: 1,
        actions: "Active"
      });
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else if (action === 2) {
      const statusDeleted = await EspCommitmentSchema.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Status Deleted SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Bad Request"
      });
    }
  } catch (error) {
    logger.error(`This error in EspCommitmentSchema part ${error.message}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function periodValuesDropDown(req, res, next) {
  const arr = [{ label: "Perday", value: 1 }];
  return res.status(200).json({
    message: "Success",
    results: arr
  });
}

// dropdown apis
/*export async function saveDropdown(req, res, next) {
  const { labelType, labelValue, labelNumber } = req.body;
  try {
    const dropDownObject = {
      labelType: labelType,
      labelValue: labelValue,
      labelNumber: Number(labelNumber)
    };
    const dropDown = await EspCommitDropDownSchema.create(dropDownObject);
    return res.status(200).json({
      message: "Success"
    });
  } catch (error) {
    logger.error(`This error in EspCommitmentSchema DropDown part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function espDropDown(req, res, next) {
  try {
    const dropDown = await EspCommitDropDownSchema.find();
    return res.status(200).json({
      message: "Success",
      result: dropDown
    });
  } catch (error) {
    logger.error(`This error in EspCommitmentSchema DropDown part ${error}`);
    return res.status(500).json({
      message: "some error occured",
      error: error.message
    });
  }
}*/
/*try {
    let result = await EspCommitmentSchema.find(findEspCommitment);
    console.log(result);
    if (result.length > 0) {
      const espCommitment = await EspCommitmentSchema.findOneAndUpdate(
        { createdBy: result[0].createdBy },
        { active: 0 }
      );
      await espCommitment.save();
      const espCommitment1 = await EspCommitmentSchema.create(
        saveEspCommitment
      );
      return res.status(400).json({
        message: "Esp Commitment Updated OR Created SuccessFully"
      });
    } else {
      const espCommitment = await EspCommitmentSchema.create(saveEspCommitment);
      return res.status(400).json({
        message: "Esp Commitment Created SuccessFully"
      });
    }
  } catch (error) {
    logger.error(`Error Occured While Saving ${error.message}`);
    return res.status(500).json({
      message: "Error Occured While Saving",
      error: error.message
    });
  }*/