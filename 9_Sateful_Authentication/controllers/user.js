const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Uername or Password",
    });
  }
  const sessidId = uuidv4();
  setUser(sessidId, user);
  res.cookie("uid", sessidId);
  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
