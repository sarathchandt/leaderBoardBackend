import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export const getAccessToken = (email,id) => {
  return jwt.sign({ email,id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "59m",
  });
};

export const getRefreshToken = (email,id) => {
  return jwt.sign({ email,id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const sentOtpWithMailer = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`,
      },
    });

    const mailOptions = {
      from: '"LeaderBoard" <joinus872@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "One Time Password", // Subject line
      text: `We received a request to verify your email address with LeaderBoard. To complete the verification process, please use the following One-Time Password (OTP):
  OTP: ${otp}
  This OTP is valid for the next 10 minutes. If you did not initiate this request, please ignore this email.
  If you have any questions or concerns, feel free to reach out to our support team at support@something.com.
  Thank you for choosing Join Us! `,
      html: `<table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none;">
    <tr>
      <td style="border: none; padding: 0;">
        <p style="margin-top: 0;">We received a request to verify your email address with LeaderBoard. To complete the verification process, please use the following One-Time Password (OTP):</p>
        <p style="font-size: 24px; font-weight: bold; margin: 20px 0;">OTP: ${otp}</p>
        <p style="margin-bottom: 0;">This OTP is valid for the next 10 minutes. If you did not initiate this request, please ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="border: none; padding: 0;">
        <p style="margin-top: 20px; margin-bottom: 0;">If you have any questions or concerns, feel free to reach out to our support team at <a href="mailto:fakeSupport@joinus.something">support@joinus.com</a>.</p>
        <p style="margin-top: 20px; margin-bottom: 0;">Thank you for choosing LeaderBoard!</p>
      </td>
    </tr>
  </table>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export const comparePasswords = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export const createUser = async (email, name, password) => {
  try {
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) return;

    const newPass = await hashPassword(password);
    const user = new userModel({ email, name, password: newPass });
   const userCreated = await user.save();
   return userCreated
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const userExist = async(email) => {
  try {
    const user =  await userModel.find({email})
    return user
  } catch (error) {
    throw new Error('error while fetching')
  }
}

export const fetchUserFunction = async(email) => {
    try {
      const user= await userModel.findOne({email})
      return user
      
    } catch (error) {
      
    }
}

export const fetchUserDetails = async(email)=> {
  try {
      const user = await userModel.findOne({email},{password:0})
      if(user){
        return user
      }
      return false
  } catch (error) {
    throw new Error('fetching error')
  }
}

export const fetchLeaderBoard = async(id) => {
  try {
    const players = await userModel.find({},{ password: 0 }).sort({score:-1,name:1}).limit(10)

    const player = await userModel.findOne({_id:id})
    const higherScoreCount = await userModel.countDocuments({ score: { $gt: player.score } });
   
    const sameScoreCount = await userModel.countDocuments({
        score: player.score,
        name: { $lt: player.name } 
    });

    const rank = higherScoreCount + sameScoreCount + 1; 

   return {rank,player,players}

    
  } catch (error) {
    throw new Error('internal server error')
  }
}

export const updateScrore = async(id,score)=>{
  try {

    await userModel.updateOne({_id:id},{$set:{score:score}})
    return true
    
  } catch (error) {
    throw new Error('internal server error')
  }
}