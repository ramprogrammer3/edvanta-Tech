const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    // extract token from cookie,header,or body
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers.authorization.replace("Bearer ", "");

    // if token  is missing , return 401 unauthorized response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      // verify token
      const decode = jwt.verify(token, "ramkumar256");
      req.user = decode;
    } catch (error) {
      // if verification failed,return 401 unauthorized
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "User is not login , please login first",
    });
  }
};
