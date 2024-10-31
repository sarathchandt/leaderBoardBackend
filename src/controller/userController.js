import {
  comparePasswords,
  createUser,
  fetchLeaderBoard,
  fetchUserDetails,
  fetchUserFunction,
  getAccessToken,
  getRefreshToken,
  sentOtpWithMailer,
  updateScrore,
  userExist,
} from "../handlers/userHandlers.js";
import { schemaValidate } from "../middlewares/zodeValidation.js";
import {
  loginSchema,
  sentOtpSchema,
  userSignInSchema,
} from "../zodeSchema/schemas.js";

const otpStore = new Map();

export const sentOtp = async (req, res) => {
  try {
    schemaValidate(sentOtpSchema, req.body);
    const { email } = req.body;
    const isUserExist = await userExist(email);
    if (isUserExist.length !== 0) {
      res.json({ isOtpSented: false, userExist: true }).status(409);
      return;
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStore.set(email, otp);
    await sentOtpWithMailer(email, otp);
    console.log({ otp });

    res.json({ isOtpSented: true }).status(200);
  } catch (error) {
    res.json({ isOtpSented: false }).status(500);
  }
};

export const signInFunction = async (req, res) => {
  try {
    schemaValidate(userSignInSchema, req.body);
    const { email, otp, name, password } = req.body;
    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
      res.json({ isOtpVerified: false }).status(404);
      return;
    }
    if (storedOtp === otp.toString()) {
      const user = await createUser(email, name, password);
      const accessToken = getAccessToken(email, user._id);
      const refreshToken = getRefreshToken(email, user._id);
      res.json({ isOtpVerified: true, accessToken, refreshToken }).status(200);
      return;
    }
    res.json({ isOtpVerified: false }).status(400);
  } catch (error) {
    console.log(error);

    res.json({ isOtpVerified: false }).status(500);
  }
};

export const login = async (req, res) => {
  try {
    schemaValidate(loginSchema, req.body);

    const { email, password } = req.body;
    const fetchUser = await fetchUserFunction(email);
    if (fetchUser) {
      const isValidPass = await comparePasswords(password, fetchUser.password);
      if (isValidPass) {
        const accessToken = getAccessToken(email, fetchUser._id);
        const refreshToken = getRefreshToken(email, fetchUser._id);
        res.json({ isLogined: true, accessToken, refreshToken }).status(200);
      } else {
        res.json({ isLogined: false }).status(401);
      }
    } else {
      res.json({ isLogined: false, notSignedup: true }).status(401);
    }
  } catch (error) {
    res.json({ isLogined: false }).status(500);
  }
};

export const isTokenValid = async (req, res) => {
  try {
    if (req.user.id == "admin") {
      res.json({ isValid: true, isAdmin: true }).status(200);

      return;
    }
    const userDetails = await fetchUserDetails(req.user.email);
    const { email, score, name } = userDetails;
    res.json({ isValid: true, email, score, name, isAdmin: false }).status(200);
  } catch (error) {
    res.json({ isValid: true, dataBaseError: true }).status(500);
  }
};

export const leaderBoardFunction = async (req, res) => {
  try {
    const { id } = req.user;

    const players = await fetchLeaderBoard(id);
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ isError: true });
  }
};

export const updateRank = async (req, res) => {
  try {
    const { score } = req.body;
    const { id } = req.user;
    if (score > -1) {
      await updateScrore(id, score);
      res.status(200).json({ isUpdated: true });
      return;
    }
    res.status(404).json({ isUpdated: false });
  } catch (error) {
    res.status(500).json({ isError: true });
  }
};
