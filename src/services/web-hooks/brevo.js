import brevoData from "../../models/webHook/brevo";

export const saveWebhookBrevoData = async (req, res) => {
  try {
    const resData = req.body;

    let saveData = new brevoData({ response: resData });

    await saveData.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("error " + error);
    res.status(500).json({ message: "Error", error });
  }
};
