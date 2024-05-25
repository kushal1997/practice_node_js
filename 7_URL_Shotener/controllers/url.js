const URL = require("../models/url");
const generateNewShortUrl = async (req, res) => {
  const { nanoid } = await import("nanoid");
  const body = req.body;
  if (!body || !body.url)
    return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visistHistory: [],
  });
  return res.status(201).json({ id: shortID, msg: "URL shortened properly" });
};

const getShortId = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visistHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

const getAnalystics=async(req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visistHistory.length,
        analytics:result.visistHistory
    })
}
module.exports = {
  generateNewShortUrl,
  getShortId,
  getAnalystics
};
