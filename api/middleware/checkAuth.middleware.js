const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verify);
    if (verify.userType == "admin") {
      next();
    }else{
        return res.status(401).json({
            message:'You are not Admin'
        })
    }
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
    });
  }
};
