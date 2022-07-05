const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

JWT_Secret = "kjgaskuhfkuahfkahkf";

const loginrequired = async (req, res, next) => {
  const token = req.cookies["access-token"];
  if (token) {
    const validatetoken = await jwt.verify(token, JWT_Secret);
    if (validatetoken) {
      res.user = validatetoken.id;
      next();
    } else {
      console.log("token expires");
    }
  } else {
    console.log("token not found");
  }
};

module.exports = { loginrequired };
