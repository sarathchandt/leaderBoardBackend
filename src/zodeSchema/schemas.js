import { z } from "zod";

export const userSignInSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    passWord:z.string().min(6)
  });

  export const sentOtpSchema = z.object({
    email:z.string().email({message:'Invalid email address'})
    
  })