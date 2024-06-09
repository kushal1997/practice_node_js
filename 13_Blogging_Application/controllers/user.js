const User = require("../models/user");

const handleSignUp = async (req, res) => {
    console.log("handleSignUp function called:",req.body)
  const { fullName, email, password } = req.body;
  await User.create({ 
    fullName,
    email,
    password,
  });
  return res.redirect("/user/signin")
};

const handleSignIn = async (req, res) => {
    console.log("handleSignIn function called:", req.body);
    const { email, password } = req.body;
  
    try {
      const token = await User.matchedPasswordAndGenerateToken(email, password);
      // console.log("User authenticated:", user);
      // console.log("token",token)
      return res.cookie('token',token).redirect("/");
    } catch (error) {
      console.error("Authentication failed:", error.message);
      if (!res.headersSent) {
        return res.render('signin', {
          error: 'Authentication failed. Please check your email and password and try again.'
        });
      }
    }
  };

  const handleLogout=(req,res)=>{
    res.clearCookie("token").redirect("/")
  }
  
module.exports = {
    handleSignUp,
    handleSignIn,
    handleLogout
};
