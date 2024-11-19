

import { query } from "express"
import { z } from "zod"


// Reset Password Schema
export const ResetPasswordValidationSchema = z.object  
                        (
                            {
                                body: z.object
                                        (
                                            {
                                                password: z.string
                                                        (
                                                            {
                                                                required_error:"new password required",
                                                                invalid_type_error:"new password must be of type string" 
                                                            }
                                                        ),
                                                confirmPassword: z.string 
                                                        (
                                                            {
                                                                required_error: "confirm password field required",
                                                                invalid_type_error:"confirm password field must be of type string" 
                                                            }
                                                        )
                                                       
                                            }
                                        )
                                        .refine( data => data.confirmPassword === data.password,{ message:"confirm password and password don't match", path:['confirmPassword']} ),
                                query: z.object
                                        (
                                            {
                                                token: z.string
                                                (
                                                    {
                                                        required_error:"password reset token required",
                                                        invalid_type_error:"password reset token must be of type string"
                                                    }
                                                )
                                            }
                                        )
                            }
                        )


// Reset Password Request Schema 
export const GetPasswordResetEmailValidationSchema = z.object  
                        (
                            {
                                body: z.object
                                        (
                                            {
                                                email: z.string
                                                        (
                                                            {
                                                                required_error:"email required",
                                                                invalid_type_error:"email must be of type string"
                                                            }
                                                        )
                                                        .email({ message:"please input a valid email"})
                                            }
                                        )
                            }
                        )


export type GetPasswordResetEmailSchema = z.infer<typeof GetPasswordResetEmailValidationSchema> 
export type ResetPasswordSchema = z.infer<typeof ResetPasswordValidationSchema> 