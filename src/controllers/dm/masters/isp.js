export async function getAll(req, res, next) {
  try {
    const result = [
      { label: "gmail.com", value: "gmail.com" },
      { label: "yahoo.com", value: "yahoo.com" },
      { label: "yahoo.in", value: "yahoo.in" },
      { label: "yahoo.co", value: "yahoo.co" },
      { label: "outlook.com", value: "outlook.com" },
      { label: "outlook.in", value: "outlook.in" },
      { label: "aol.com", value: "aol.com" },
      { label: "ymail.com", value: "ymail.com" },
      { label: "rocketmail.com", value: "rocketmail.com" }
    ];
    res.json(result);
  } catch (err) {
    console.log("Error " + err);
  }
}
