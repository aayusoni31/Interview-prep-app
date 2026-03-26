const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; //exact token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(404).json({ message: "Not authorized , no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};
module.exports = { protect };

// It protects private routes by checking if the user is authenticated (logged in).
// It reads the JWT token from Authorization header (Bearer token), verifies it using jwt.verify().
// User Identification:
// After verification, it extracts user ID from token and fetches user from database → attaches it to req.user.
// Flow Control:
// If token is valid → next() → request goes to controller
// If invalid/missing → returns 401 Unauthorized
