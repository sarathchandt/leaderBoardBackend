import express from 'express'
import { editUserScore, fetchLeaderBoardfunction, loginFunctionForAdmin, searchWithName } from '../controller/adminController.js'
import { verifyToken } from '../middlewares/tokenMidleware.js'

const router = express.Router()

router.route('/login').post(loginFunctionForAdmin)
router.route('/leaderBoard').get(verifyToken,fetchLeaderBoardfunction)
router.route('/searchWithName').get(verifyToken,searchWithName)
router.route('/editScore').patch(verifyToken,editUserScore)


export default router