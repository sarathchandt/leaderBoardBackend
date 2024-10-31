import { schemaValidate } from "../middlewares/zodeValidation.js";
import { sentOtpSchema, userSignInSchema } from "../zodeSchema/schemas.js"

const otpStore = new Map();


export const sentOtp = (req,res) => {
    try {
        schemaValidate(sentOtpSchema,req.body)
        const {email} = req.body
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        otpStore.set(email, otp);
    
    } catch (error) {
        
    }
}

export const signInFunction = (req,res) => {
    console.log('reached at route');
        try {
            schemaValidate(userSignInSchema,req.body)
            console.log('success');
        } catch (error) {
            res.status(500).json({message:'internal server error'})
        }
}