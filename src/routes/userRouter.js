import express from 'express'
import { isTokenValid, leaderBoardFunction, login, sentOtp, signInFunction, updateRank } from '../controller/userController.js'
import {  getNewAccessToken, verifyRefreshToken, verifyToken } from '../middlewares/tokenMidleware.js'

const router = express.Router()

router.route('/signUp').post(signInFunction)
router.route('/sentOtp').post(sentOtp)
router.route('/login').post(login)
router.route('/tokenCheck').get(verifyToken,isTokenValid)
router.route('/newAccessToken').get(verifyRefreshToken,getNewAccessToken)
router.route('/leaderBoard').get(verifyToken,leaderBoardFunction)
router.route('/updateUserScore').post(verifyToken,updateRank)


export default router