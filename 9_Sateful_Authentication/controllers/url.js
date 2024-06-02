const URL = require("../models/url");

const getAllURLs=async(req,res)=>{
  const allURLs=await URL.find({});
  // return res.status(200).json({data:allURLs})

  return res.render("home",{
    urls:allURLs
  })
}
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
    createdBy:req.user._id
  });
  if(!req.user) return res.redirect('/login');

  const allURLs=await URL.find({createdBy:req.user._id});
  // return res.status(201).json({ id: shortID, msg: "URL shortened properly" });
  return res.render("home",{
    id:shortID,
    urls:allURLs,
  })
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
  getAllURLs,
  generateNewShortUrl,
  getShortId,
  getAnalystics
};
