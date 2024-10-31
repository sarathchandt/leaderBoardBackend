import { z } from "zod";

export const userSignInSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password:z.string().min(6),
    otp:z.string().length(4, { message: "OTP must be exactly 4 digits" })
  });

  export const sentOtpSchema = z.object({
    email:z.string().email({message:'Invalid email address'})
    
  })

  export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password:z.string().min(6),
    })
