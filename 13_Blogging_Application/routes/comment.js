const {Router} = require("express");
const { handleAddComment } = require("../controllers/comment");
const router=Router();

router.post('/comment/:blogId', handleAddComment);

module.exports=router;