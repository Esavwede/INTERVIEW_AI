
import { z } from "zod"



export const ResendSignupMailValidationSchema = z.object(
                                        {
                                            body: z.object(
                                                {
                                                    email: z.string(
                                                        {
                                                            required_error: "email field required",
                                                            invalid_type_error: "invalid email"
                                                        }
                                                    ).email
                                                    (
                                                        "invalid email"  
                                                    )
                                                }
                                            )
                                        }
                                     )



export type ResendSignupMailSchema = z.infer<typeof ResendSignupMailValidationSchema>