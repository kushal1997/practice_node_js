const Blog = require("../models/blog");

const handleAddBlog = async (req, res) => {
    console.log("handleAddBlog", req.body, req.file);
    const { title, body, imageOption, coverImageUrl } = req.body;
    let blog;
  
    if (imageOption === "upload") {
      blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`, // Corrected path
      });
    } else {
      blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageUrl,
      });
    }
  
    return res.redirect(`/blog/${blog._id}`); // Corrected _d to _id
  };
  
  

module.exports = {
  handleAddBlog,
};
