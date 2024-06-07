import NetworComplianceData from "../../models/networkCompliance/networkCompliance";

const addnetworkCompliance = async (req, res) => {
  let resData = req.body;

  let id = await NetworComplianceData.find({}).sort({ _id: -1 });
  let lastId = id[0]?.networkId == null ? 1000 : id[0].networkId + 1;

  const newData = new NetworComplianceData({
    networkName: resData.networkName,
    networkId: lastId,
    description: resData.description,
    createdBy: resData.createdBy,
    createdByName: resData.createdByName
  });

  await newData
    .save()
    .then((savedData) => {
      res.status(200).json({
        status: 200,
        message: "Data added successfully.",
        data: savedData
      });
    })
    .catch((error) => {
      console.error("Error adding data: ", error);
      res
        .status(500)
        .json({ status: 500, message: "Failed to add data.", error: error });
    });
};

const getnetworkCompliance = async (req, res) => {
  await NetworComplianceData.find()
    .sort({ _id: -1 })
    .then((data) => {
      res.status(200).json({
        status: 200,
        message: "Data Found",
        data: data
      });
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      res
        .status(500)
        .json({ status: 500, message: "Failed to add data: ", error: error });
    });
};

const getnetworkCompliancelist = async (req, res) => {
  await NetworComplianceData.find()
    .sort({ networkName: 1 })
    .then((data) => {
      res.status(200).json({
        status: 200,
        message: "Data Found",
        data: data.map((item) => ({
          label: item.networkName,
          value: item.networkId
        }))
      });
    })
    .catch((error) => {
      console.error("Error adding data:", error);
      res
        .status(500)
        .json({ status: 500, message: "Failed to add data: ", error: error });
    });
};

const updatenetworkCompliancelist = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedData = await NetworComplianceData.findByIdAndUpdate(id, data, {
      new: true
    });
    if (updatedData !== null) {
      res
        .status(200)
        .send({ status: 200, message: "Data Updated.", data: updatedData });
    } else {
      res.status(404).send({ status: 404, message: "Data not found." });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send({ status: 500, message: "Internal server error." });
  }
};

export {
  addnetworkCompliance,
  getnetworkCompliance,
  getnetworkCompliancelist,
  updatenetworkCompliancelist
};
