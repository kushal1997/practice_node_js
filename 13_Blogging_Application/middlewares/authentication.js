const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      console.log('User payload:', userPayload); // Debug log
      req.user = userPayload;
    } catch (err) {
      console.error("Invalid token:", err.message); // Log the error for debugging
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
