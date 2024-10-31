import userModel from "../model/userModel.js"
import { getAccessToken, getRefreshToken } from "./userHandlers.js"

export const adminLogin = (userName,password) => {
    try {
        if(userName == process.env.ADMINUSER && password == process.env.ADMINPASS){
          const accessToken = getAccessToken(userName,'admin')
          const refreshToken = getRefreshToken(userName,'admin')
          return {
            accessToken,refreshToken
          }
        }
        return false
    } catch (error) {
        throw new Error('internal server error')
    }
}

export const leaderBoardFirst10 = async() => {
    try {
        const players = await userModel.find( {},{ password: 0 } ).sort({score:-1,name:1}).limit(10)
        return players
    } catch (error) {
        throw new Error('internal server error')
    }
}

export const serach=async(word)=>{
    try {
        const regex = new RegExp(word, 'i');
        const topUsers = await userModel.find({ name: { $regex: regex } }, { password: 0 } ).sort({ score: -1, name: 1 }).limit(10);
        return topUsers
    } catch (error) {
        throw new Error('internal server error')
    }
}

