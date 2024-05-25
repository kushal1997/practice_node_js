const express=require('express');
const {generateNewShortUrl,getShortId,getAnalystics}=require("../controllers/url");
const router=express.Router();

router.post('/',generateNewShortUrl);
router.get('/:shortId',getShortId);
router.get('/analytics/:shortId',getAnalystics);
module.exports=router;