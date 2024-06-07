import espispSchema from "../../../models/globalJourneySettings/espIspCap/espispCap.js";
import logger from "../../../Logger/logger.js";
import { formatDate } from "../../../helpers/commonFunction.js";
import { executeQuery } from "../../../helpers/mysql/mysqlConnection.js";

export async function save(req, res, next) {
  const {
    capName,
    ispsName,
    espsIntegrated,
    espsAccount,
    capNumber,
    createdBy,
    createdByName
  } = req.body;
  if (capName.length == 0) {
    return res.status(400).json({
      message: "Cap Name is required"
    });
  } else if (Object.keys(ispsName).length === 0) {
    return res.status(400).json({
      message: "ISP Names Should not be Empty"
    });
  } else if (Object.keys(espsIntegrated).length === 0) {
    return res.status(400).json({
      message: "Esp Service Names Should not be Empty"
    });
  } else if (Object.keys(espsAccount).length === 0) {
    return res.status(400).json({
      message: "Esp Account Names Should not be Empty"
    });
  } else if (
    capNumber === undefined ||
    capNumber === null ||
    capNumber === ""
  ) {
    return res.status(400).json({
      message: "Cap Number is required"
    });
  }
  let espIspData = {
    ispsName: ispsName,
    espsIntegrated: espsIntegrated,
    espsAccount: espsAccount
  };
  let espIspData1 = {
    capName: capName,
    ispsName: ispsName,
    actions: "Active",
    espsIntegrated: espsIntegrated,
    espsAccount: espsAccount,
    capNumber: capNumber,
    createdBy: Number(createdBy),
    createdByName: createdByName
  };

  try {

    const duplicateCapName = await espispSchema.find({ capName: capName });
    if (duplicateCapName.length > 0) {
      return res.status(400).json({
        message: "This Cap Name Already Exist"
      });
    }

    const result = await espispSchema.find(espIspData);
    if (result.length > 0) {
      return res.status(400).json({
        message: "This Esp Cap Already Exist"
      });
    } else {
      let newCapValue = await espispSchema.create(espIspData1);
      return res.status(200).json({
        message: "Saved SuccessFully"
      });
    }
  } catch (error) {
    logger.error(`This error in save of espIspCap part ${error}`);
    return res.status(500).json({
      message:"Some Error Occured While Saving",
      error: error.message
    })
  }
}

export async function getAllEspData(req, res, next) {
  try {
    const result = await espispSchema
      .find({ active: { $in: [1, 0] }, actions: { $in: ["Active", "InActive"] } })
      .sort({ updatedAt: -1 });
    let dummy = result;
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
    console.log(extractedData);
    return res.status(200).json({
      result: extractedData,
      message: "All Esp Data"
    });
  } catch (error) {
    logger.error(`This error in save in getAllEspData part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured While Fetching",
      error: error.message
    });
  }
}

export async function getCapById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await espispSchema.findOne({ createdBy: id, active: 1 });
    return res.status(200).json({
      message: "Esp Data By Id",
      result: result
    });
  } catch (error) {
    logger.error(`This error  in getCapById part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured While Fetching",
      error: error.message
    });
  }
}

export async function updateById(req, res, next) {
  const { id } = req.params;
  const {
    capName,
    ispsName,
    espsIntegrated,
    espsAccount,
    capNumber,
    updatedBy,
    updatedByName
  } = req.body;
  if (capName.length === 0) {
    return res.status(400).json({
      message: "Cap Name is required"
    });
  } else if (Object.keys(ispsName).length === 0) {
    return res.status(400).json({
      message: "ISP Names Should not be Empty"
    });
  } else if (Object.keys(espsIntegrated).length === 0) {
    return res.status(400).json({
      message: "Esp Service Names Should not be Empty"
    });
  } else if (Object.keys(espsAccount).length === 0) {
    return res.status(400).json({
      message: "Esp Account Names Should not be Empty"
    });
  } else if (
    capNumber === undefined ||
    capNumber === null ||
    capNumber === ""
  ) {
    return res.status(400).json({
      message: "Cap Number is required"
    });
  }
  let espIspData = {
    ispsName: ispsName,
    espsIntegrated: espsIntegrated,
    espsAccount: espsAccount
  };

  let espIspData1 = {
    capName: capName,
    ispsName: ispsName,
    actions: "Active",
    espsIntegrated: espsIntegrated,
    espsAccount: espsAccount,
    capNumber: capNumber,
    updatedBy: Number(updatedBy),
    updatedByName: updatedByName
  };
  try {

    const duplicateCapName = await espispSchema.find({ capName: capName, _id: { $ne: id }});
    if (duplicateCapName.length > 0) {
      return res.status(400).json({
        message: "This Cap Name Already Exist"
      });
    }

    const existingData = await espispSchema.find({
      ...espIspData,
      _id: { $ne: id }
    });
    if (existingData.length > 0) {
      return res.status(400).json({
        message: "This Esp Cap Data Already Exists"
      });
    }
    const updatedData = await espispSchema.findByIdAndUpdate(id, espIspData1);
    return res.status(200).json({
      message: "Data Updated Successfully"
    });
  } catch (error) {
    logger.error(`This error in  updateById part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured While Updating",
      error: error.message
    });
  }
}

export async function changeEspIspStatus(req, res, next) {
  const { id } = req.params;
  const { action } = req.body;
  try {
    if (action === 0) {
      const statusActive = await espispSchema.findByIdAndUpdate(id, {
        actions: "InActive"
      });
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (action === 1) {
      const statusInActive = await espispSchema.findByIdAndUpdate(id, {
        actions: "Active"
      });
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else if (action === 2) {
      const statusDeleted = await espispSchema.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Status Deleted SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Bad Request"
      });
    }
  } catch (error) {
    logger.error(`This error in changeEspIspStatus part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function getIsps(req, res, next) {
  const sql = ` SELECT name,id FROM domainfamilies `;
  try {
    const result = await executeQuery(sql);
    return res.status(200).json({
      message: "Success",
      result: result
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occured ",
      error: error.message
    });
  }
}

export async function generlizeFunction(req, res, next) {
  // const { ispsName, espsIntegrated, espsAccount } = req.body;
  // const email = "naved.siddiki@zahoo.com";
  // const isps = ispsName.id;
  // const esps = espsIntegrated.esp_id;
  // const espAccountId = espsAccount.esp_account_id;
  // const result = await findIspCapCount(isps, esps, espAccountId);
  // const result2 = await findEspCommitmentPerDay(email, esps, espAccountId);
  // const domainFamily = result2?.DomainFamily;
  // const espCommitment = result2?.espCommitment;
  // return res.status(200).json({
  //   message: "Success",
  //   result:result,
  //   domainFamily: domainFamily,
  //   espCommitment: espCommitment[0].periodValues
  // });
}

export async function userLevelCapGerneralizeFunction(req, res, next) {
  //  try {
  //    const {userId}=req.body;
  //    const result = await findCapValueByUserId(userId);
  //    return res.status(200).json({
  //     result:result,
  //    })
  //  } catch (error) {
  //    return res.status(500).json({
  //      message: "Some Error Occured ",
  //      error: error.message
  //    });
  //  }
}
/*try {
    const result = await espispSchema.find(espIspData);
    if (result.length > 0) {
      const ispEspCap = await espispSchema.findOneAndUpdate(
        { createdBy: result[0].createdBy },
        { active: 0 }
      );
      await ispEspCap.save();
      const createdData = await espispSchema.create(espIspData1);
      return res.status(200).json({
        message: "Data Updated Successfully"
      });
    } else {
      let espIspData2 = {
        capName: capName,
        ispsName: ispsName,
        actions: "Active",
        espsIntegrated: espsIntegrated,
        espsAccount: espsAccount,
        capNumber: capNumber,
        createdBy: Number(createdBy),
        createdByName: createdByName
      };
      const createdData = await espispSchema.create(espIspData2);
      return res.status(200).json({
        message: "Data Created Successfully"
      });
    }
  } catch (error) {
    logger.error(`This error in save in espIspCap part ${error}`);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }*/