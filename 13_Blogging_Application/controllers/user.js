const User = require("../models/user");

const handleSignUp = async (req, res) => {
    console.log("handleSignUp function called:",req.body)
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/")
};

const handleSignIn = async (req, res) => {
    console.log("handleSignIn function called:", req.body);
    const { email, password } = req.body;
  
    try {
      const user = await User.matchedPassword(email, password);
      console.log("User authenticated:", user);
      return res.redirect("/");
    } catch (error) {
      console.error("Authentication failed:", error.message);
      return res.status(401).send("Authentication failed: " + error.message);
    }
  };
  
module.exports = {
    handleSignUp,
    handleSignIn
};
