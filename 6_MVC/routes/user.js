const express = require("express");
const {
  handleGetAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

const router = express.Router();

//ROUTES
router.route("/")
.get(handleGetAllUsers)
.post(createUser);

//dynamic path parameters
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
