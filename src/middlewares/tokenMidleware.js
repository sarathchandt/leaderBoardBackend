
import jwt from "jsonwebtoken";
import { getAccessToken } from "../handlers/userHandlers.js";

export  const verifyRefreshToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }
  
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {

          return res
            .status(403)
            .json({ message: "Failed to authenticate token." });
        }
  
        req.user = decoded;
        next();
      }
    );
  };

  export  const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }
  
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
            console.log(err,"herer");
          return res
            .status(401)
            .json({ message: "Failed to authenticate token." });
        }
  
        req.user = decoded;
        next();
      }
    );
  };

  export const getNewAccessToken = async (req,res) => {
    try {
      const token = getAccessToken(req.user.email)
      res.json({token}).status(200)
    } catch (error) {
      res.json({token:false}).status(500)
    }
  }