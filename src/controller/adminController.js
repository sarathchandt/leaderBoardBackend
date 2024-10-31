import { adminLogin, leaderBoardFirst10, serach } from "../handlers/adminHandler.js"
import { updateScrore } from "../handlers/userHandlers.js"

export const loginFunctionForAdmin = (req,res) => {
    try {

        const {userName, password} = req.body

        const isLogin = adminLogin(userName,password)
        res.status(200).json({isLogin})
    } catch (error) {
        res.status(500).json({islogin:false})

    }
}


export const fetchLeaderBoardfunction=async(req,res)=>{
    try {
        const leaderBoard = await leaderBoardFirst10()
        res.status(200).json(leaderBoard)
    } catch (error) {
        res.status(500).json({leaderBoard:false})
    }
}

export const searchWithName = async(req,res) => {
    try {
        const word= req.query.word

        const result = await serach(word)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({result:false})
    }
}

export const editUserScore =async (req,res) => {
    try {
        if(req.user.id == 'admin'){
            const {id,score} = req.body
          await updateScrore(id,score)
          res.status(200).json({updated:true})
          return
        }
        res.status(403).json({upadted:false})
    } catch (error) {
        res.status(500).json({updated:false})
    }
}