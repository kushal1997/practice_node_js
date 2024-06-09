const {Router} = require("express");
const { handleAddBlog, handleGetBlog } = require("../controllers/Blog");
const upload = require("../config/multerBlog");

const router=Router();

router.get("/new",(req,res)=>{
    return res.render('addBlog',{
        user:req.user,
    })
})
router.post('/new',upload.single("coverImageFile"),handleAddBlog);

router.get("/:id",handleGetBlog)

module.exports=router;