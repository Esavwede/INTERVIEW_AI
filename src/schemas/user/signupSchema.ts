
import { z, TypeOf} from "zod" 

export const SignupSchema = z.object(
    {
        body: z.object
        ({ 
            firstname: z.string
            (
                {
                    required_error: "firstname not Found In Request Body",
                    invalid_type_error: "firstname must be of type String",
                }
            )
            .min(2,'firstname length below 2')
            .max(50,'firstname length cannot be more than 50'),


            lastname: z.string
            (
                {
                    required_error: "lastname not Found In Request Body",
                    invalid_type_error: "lastname must be of type String",
                }
            )
            .min(2,'lastname length below 2')
            .max(50,'lastname length cannot be more than 50'),

            email: z.string
            (
                {
                    required_error: "email not Found In Request Body",
                    invalid_type_error: "email must be of type String",
                }
            )
            .email(' Invalid Email'),

            password: z.string
            (
                {
                    required_error: "password not Found In Request Body",
                    invalid_type_error: "password must be of type String",
                }
            )
            .min(5, "Password must be at least 5 characters long")
            .max(64, "Password must be less than 64 characters"),
            
            confirmPassword: z.string
            (
                {
                    required_error: "confirmPassword not Found In Request Body",
                    invalid_type_error: "confirmPassword must be of type String",
                }
            )
        })
        .refine( data => data.password === data.confirmPassword, { message:"passwords do not match", path: ["confirm password"]} )
       
    }
)


export const VerifyUserValidationSchema = z.object 
                    (
                        {
                            query: z.object 
                                (
                                    {
                                        token: z.string
                                        (
                                            {
                                                required_error: "token not Found In Request QueryParams",
                                                invalid_type_error: "token must be of type String",
                                            }
                                        )
                                        .min(6,'VERIFICATION TOKEN NOT VALID') 
                                    }
                                )
                        }
                    )
                    

 export type SignupInput =  TypeOf<typeof SignupSchema>
 export type VerifyUserSchema = z.infer<typeof VerifyUserValidationSchema> 