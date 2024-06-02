const User = require("../models/user");
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
  const token=setUser(user);
  // res.cookie("uid", token);
  // return res.redirect("/");
  return res.json({"token":token,"data":user})
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
