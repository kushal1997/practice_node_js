const Comment = require("../models/comment");

const handleAddComment = async (req, res) => {
  await Comment.create({
    comment: req.body.commentContent,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
};
module.exports = {
  handleAddComment,
};
