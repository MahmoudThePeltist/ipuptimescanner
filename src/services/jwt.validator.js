const jwt = require("jsonwebtoken");
const _ = require("lodash");

const knex = require("./knex.service");
const config = require("../../config");

let verifyJWT = (token, next) => {
  console.log("verifyJWT: ", token);
  try {
    var decoded = jwt.verify(token, config.secret);
    return { ...decoded, expired: false };
  } catch (err) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        var decoded = jwt.decode(token);
        return decoded ? { ...decoded, expired: true } : false;
      } else return false;
    }
  }
};

exports.JWTAuth = async (req, res, next) => {
  console.log("exports.JWTAuth: ", req);
  let token = undefined;
  try {
    token = req.headers["x-authorization"];
  } catch (error) {
    res.status(403).json({status: 403, message: "Error: User does not have a valid token."});
  }
  if (token) {
    req.token = token;
    console.log("jwt auth: ", req.token);
    try {
      const decodedToken = verifyJWT(req.token, next);

      console.log("decodedToken: ", decodedToken);
      !decodedToken && res.status(403).json({status: 403, message: "Error: User does not have a valid token"});

      if (decodedToken.expired) {
        res.status(403).json({status: 403, message: "Error: Token expired."});
      } else {
        next();
      }
    } catch (err) {
      res.status(403).json({status: 403, message: "Error: with your token.", error: err});
    }
  } else {
    res.status(403).json({status: 403, message: "Error: User does not have a valid token."});
  }
};