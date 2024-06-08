const multer = require("multer");
const path=require('path');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.resolve(__dirname,`../public/uploads/`))
    },
    filename(req, file, cb) {
        const filename=`${Date.now()}-${file.originalname}`;
        cb(null,filename)
    }
  })
  
  const upload = multer({ storage });


  module.exports=upload;