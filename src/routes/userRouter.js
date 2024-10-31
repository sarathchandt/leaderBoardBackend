import express from 'express'
import { signInFunction } from '../controller/userController.js'

const router = express.Router()

router.route('/signUp').post(signInFunction)

export default router