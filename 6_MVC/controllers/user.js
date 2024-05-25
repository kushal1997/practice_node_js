const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});
  res.send(allDbUsers);
};
const createUser = async (req, res) => {
  const body = req.body;
  console.log("Body", body);
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ id:result._id,msg: "Success", data: result });
};

const getUserById=async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).send("User not found");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Internal server error");
      }
}

const updateUserById=async(req,res)=>{
    const id = req.params.id;
    const updates = req.body;
    if (!updates) {
      return res
        .status(400)
        .send("Please provide properties to update in the request body");
    }
    try {
      const user = await User.findByIdAndUpdate(id, updates, { new: true }); // Return updated user
      if (user) {
        res.status(201).json({ msg: "Success", data: user });
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Internal server error");
    }
}

const deleteUserById=async(req,res)=>{
    const id = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        res.status(200).send("User is successfully deleted");
      } else {
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Internal server error");
    }
}

module.exports = {
  handleGetAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById
};
