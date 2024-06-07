import { listDetails, listRecordsDetails } from "../../models/list/list";
import HttpError from "../../models/http-error";
import { Schema, model, mongoose } from "mongoose";
import logger from "../../Logger/logger";

export async function getAll(req, res, next) {
  try {
    const resultData = await listDetails.find().sort({ _id: -1 });
    res.json(resultData);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getById(req, res, next) {
  try {
    const listId = req.params.id;
    const resultData = await listDetails.findById(listId);
    res.json(resultData);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function save(req, res, next) {
  try {
    const { listName } = req.body;
    const listSaveDetails = new listDetails({
      listName
    });
    let addlist = await listSaveDetails.save();
    const lastInsertedId = addlist._id;
    res.json({
      code: 200,
      message: "Data inserted successfully",
      listId: lastInsertedId
    });
  } catch (err) {
    const error = new HttpError(
      "Save ItemsData failed, please try again later."
    );
    return next(error);
  }
}

export async function updateById(req, res, next) {
  const { listName } = req.body;
  const listId = req.params.id;
  let listUpdData;
  try {
    listUpdData = await listDetails.findById(listId);
  } catch (err) {
    const error = new HttpError("Something went wrong, list not found.", 500);
    return next(error);
  }

  listUpdData.listName = listName;

  let listUpdResult;
  try {
    listUpdResult = await listUpdData.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update list.",
      500
    );
    return next(error);
  }
  res
    .status(200)
    .json({ listUpdResult: listUpdResult.toObject({ getters: true }) });
}

export async function deleteById(req, res, next) {
  const listId = req.params.id;
  let list;
  try {
    list = await listDetails.findById(listId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, journey not found.",
      500
    );
    return next(error);
  }

  let deleteData;
  try {
    deleteData = await listDetails.deleteOne({ _id: listId });
    if (deleteData.deletedCount == 1) {
      res.json({
        message: list.listName + " list deleted successfully.",
        code: 200
      });
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete list.",
      500
    );
    return next(error);
  }
}
/******************************** List Records Details Start ****************************************************************/
export async function getAllListRecords(req, res, next) {
  try {
    const resultData = await listRecordsDetails.find().sort({ _id: -1 });
    res.json(resultData);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getListRecordsListById(req, res, next) {
  try {
    const listId = req.params.listId;
    const resultData = await listRecordsDetails.find({ listId: listId });
    res.json(resultData);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function getListRecordsById(req, res, next) {
  try {
    const listId = req.params.id;
    const resultData = await listRecordsDetails.findById(listId);
    res.json(resultData);
  } catch (err) {
    console.log("Error " + err);
  }
}

export async function saveListRecords(req, res, next) {
  try {
    const { listId, email, firstname, lastname } = req.body;
    const currentDate = new Date();
    const listSaveRecordsDetails = new listRecordsDetails({
      listId,
      email,
      firstname,
      lastname,
      addDate: currentDate
    });
    let addlist = await listSaveRecordsDetails.save();
    const lastInsertedId = addlist._id;
    res.json({
      code: 200,
      message: "Data inserted successfully",
      listRecordId: lastInsertedId
    });
  } catch (err) {
    const error = new HttpError(err);
    return next(error);
  }
}

export async function saveListMultiRecords(req, res, next) {
  try {
    const { listId, email } = req.body;
    const currentDate = new Date();
    const emailArray = email.slice(1, -1).split(",");

    const processedEmails = Promise.all(
      emailArray.map(async (useremail, index) => {
        try {
          const listSaveRecordsDetails = new listRecordsDetails({
            email: useremail,
            listId,
            addDate: currentDate
          });
          await listSaveRecordsDetails.save();
        } catch (error) {
          console.error(`Error saving email ${useremail}:`, error);
          logger.error(`This error in saveListMultiRecords part ${error}`);
          return null;
        }
      })
    );

    // Wait for all promises to resolve
    processedEmails
      .then((savedRecords) => {
        res.json({ code: 200, message: "Data inserted successfully" });
      })
      .catch((error) => {
        console.error("Error during email saving:", error);
      });
  } catch (err) {
    const error = new HttpError(err);
    return next(error);
  }
}

export async function updateListRecordsById(req, res, next) {
  const { listId, email, firstname, lastname } = req.body;
  const listRecordId = req.params.id;
  let listUpdData;
  try {
    listUpdData = await listRecordsDetails.findById(listRecordId);
  } catch (err) {
    const error = new HttpError("Something went wrong, list not found.", 500);
    logger.error(`This error in saveListMultiRecords part ${err}`);
    return next(error);
  }

  listUpdData.listId = listId;
  listUpdData.email = email;
  listUpdData.firstname = firstname;
  listUpdData.lastname = lastname;
  listUpdData.addDate = new Date();

  let listUpdResult;
  try {
    listUpdResult = await listUpdData.save();
  } catch (err) {
    const error = new HttpError(err);
    logger.error(`This error in saveListMultiRecords part ${err}`);
    return next(error);
  }
  res
    .status(200)
    .json({ listUpdResult: listUpdResult.toObject({ getters: true }) });
}

export async function deleteListRecordsById(req, res, next) {
  const listId = req.params.id;
  let list;
  try {
    list = await listRecordsDetails.findById(listId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, journey not found.",
      500
    );
    return next(error);
  }

  let deleteData;
  try {
    deleteData = await listRecordsDetails.deleteOne({ _id: listId });
    if (deleteData.deletedCount == 1) {
      res.json({
        message: list.email + " deleted successfully.",
        code: 200
      });
    }
  } catch (err) {
    console.log(err);
    logger.error(`This error in saveListMultiRecords part ${err}`);
    const error = new HttpError(
      "Something went wrong, could not delete list.",
      500
    );
    return next(error);
  }
}
