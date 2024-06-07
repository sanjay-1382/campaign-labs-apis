import logger from "../../../Logger/logger";
import { formatDate } from "../../../helpers/commonFunction";
import BounceSchema from "../../../models/globalJourneySettings/bounceTreatment/bounceTreatment";

export async function save(req, res, next) {
  const {
    bounceType,
    bounceIdentifier,
    bouncebehaviour,
    createdBy,
    createdByName
  } = req.body;
  if (Object.keys(bounceType).length === 0) {
    return res.status(400).json({
      message: "Bounce Type is required"
    });
  } else if (Object.keys(bounceIdentifier).length === 0) {
    return res.status(400).json({
      message: "Bounce Identifiers is required"
    });
  } else if (Object.keys(bouncebehaviour).length === 0) {
    return res.status(400).json({
      message: "Bounce Behaviour is required"
    });
  }
  let findBounceEsp = {
    bounceType: bounceType,
    bounceIdentifier: bounceIdentifier
  };
  let bounceData = {
    bounceType: bounceType,
    bounceIdentifier: bounceIdentifier,
    bounceBehaviour: bouncebehaviour,
    createdBy: createdBy,
    createdByName: createdByName
  };
  try {
    const findBounce = await BounceSchema.find(findBounceEsp);
    if (findBounce.length > 0) {
      return res.status(400).json({
        message: " This Bounce already exists"
      });
    } else {
      const savedDocs = await BounceSchema.create(bounceData);
      return res.status(200).json({
        message: "Bounce Saved SuccessFully"
      });
    }
  } catch (error) {
    logger.error(`error occured save in bounce treatment${error.message}`);
    return res.status(500).json({
      message: "Error occured while saving bounce",
      error: error.message
    });
  }
}

export async function getAllBounce(req, res, next) {
  try {
    const allBounce = await BounceSchema.find({
      actions: { $in: ["Active", "InActive"] },
      active: { $in: [1, 0] },
    }).sort({ updatedAt: -1 });
    let dummy = allBounce;
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
    logger.error(
      `error occured getAllBounce in bounce treatment${error.message}`
    );
    return res.status(500).json({
      message: "Error occured while fetching the bounce"
    });
  }
}

export async function getById(req, res, next) {
  const { id } = req.params;
  try {
    const singleBounce = await BounceSchema.findOne({ _id: id, active: 1 });
    return res.status(200).json({
      message: "Success",
      result: singleBounce
    });
  } catch (error) {
    logger.error(`error occured getById in bounce treatment${error.message}`);
    return res.status(500).json({
      message: "Error occured while fetching the bounce",
      error: error.message
    });
  }
}

export async function updateById(req, res, next) {
  const { id } = req.params;
  const {
    bounceType,
    bounceIdentifier,
    bouncebehaviour,
    updatedBy,
    updatedByName
  } = req.body;
  if (bounceType.length === 0) {
    return res.status(400).json({
      message: "Bounce Type is required"
    });
  } else if (Object.keys(bounceIdentifier).length === 0) {
    return res.status(400).json({
      message: "Bounce Identifiers is required"
    });
  } else if (Object.keys(bouncebehaviour).length === 0) {
    return res.status(400).json({
      message: "Bounce Behaviour is required"
    });
  }
  let findBounceEsp = {
    bounceType: bounceType,
    bounceIdentifier: bounceIdentifier
  };
  let bounceData = {
    bounceType: bounceType,
    bounceIdentifier: bounceIdentifier,
    bounceBehaviour: bouncebehaviour,
    updatedBy: updatedBy,
    updatedByName: updatedByName
  };

  try {
    const existingData = await BounceSchema.find({
      ...findBounceEsp,
      _id: { $ne: id }
    });
    if (existingData.length > 0) {
      return res.status(400).json({
        message: "Bounce already exists"
      });
    }
    const updateBounceInfo = await BounceSchema.findByIdAndUpdate(
      id,
      bounceData
    );
    return res.status(200).json({
      message: "Bounce Updated SuccessFully"
    });
  } catch (error) {
    logger.error(`error occured in bounce treatment${error.message}`);
    return res.status(500).json({
      message: "Error occured while update the bounce"
    });
  }
}

export async function bounceStatus(req, res, next) {
  const { id } = req.params;
  const { action } = req.body;
  try {
    if (action === 0) {
      const statusActive = await BounceSchema.findByIdAndUpdate(id, {
        active:0,
        actions: "InActive"
      });
      return res.status(200).json({
        message: "Status InActive SuccessFully"
      });
    } else if (action === 1) {
      const statusInActive = await BounceSchema.findByIdAndUpdate(id, {
        active:1,
        actions: "Active"
      });
      return res.status(200).json({
        message: "Status Active SuccessFully"
      });
    } else if (action === 2) {
      const statusDeleted = await BounceSchema.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Status Deleted SuccessFully"
      });
    } else {
      return res.status(400).json({
        message: "Bad Request"
      });
    }
  } catch (error) {
    logger.error(`This error in bounceSchemaStatus part ${error}`);
    return res.status(500).json({
      message: "Some Error Occured",
      error: error.message
    });
  }
}

export async function bounceBehaviour(req, res, next) {
  try {
    const bounceBehaviourNumber = [
      { label: "3 soft bounces will be considered hard bounce", value: 1 },
      { label: "don't suppress bounce", value: 2 },
      { label: "every bounce shall be suppressed in the future", value: 3 }
    ];

    return res.status(200).json({
      message: "Success",
      result: bounceBehaviourNumber
    });
  } catch (error) {
    logger.error(`error occured in bounce treatment${error.message}`);
    return res.status(500).json({
      message: "Error occured while fetching the bounce",
      error: error.message
    });
  }
}
export async function bounceTreatmentSelectType(req, res, next) {
  const arr = ["ESP,Server,Domain"];
  return res.status(200).json({
    message: "Success",
    result: arr
  });
}





