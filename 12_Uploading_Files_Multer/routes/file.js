const express=require('express');
const router=express.Router();
const multer  = require('multer')

//using the easy method but had a problem storing files in disk

// const upload = multer({ dest: 'uploads/' })



const storage=multer.diskStorage({
    destination(req, file, cb) {
        return cb(null,"./uploads");
    },
    filename(req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
});
const upload =multer({storage});


router.post("/upload",upload.single('profileImage'),(req,res)=>{
   console.log(req.body);
   console.log(req.file);

   return res.redirect('/');
})
module.exports=router;