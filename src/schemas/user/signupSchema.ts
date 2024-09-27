
import { z, TypeOf} from "zod" 

export const SignupSchema = z.object(
    {
        body: z.object
        ({ 
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
                    
export const SaveUserFirstAndLastNameValidationSchema = z.object
                                    (
                                        {
                                            body: z.object 
                                                    (
                                                        {
                                                            firstname: z.string(
                                                                                    {
                                                                                        invalid_type_error:"Firstname Must be of Type String"
                                                                                    }
                                                                                ).optional(),
                                                            lastname:   z.string(
                                                                                    {
                                                                                        invalid_type_error: "Lastname must be of type string" 
                                                                                    }
                                                                                 ).optional(),
                                                            email:   z.string(
                                                                                    {
                                                                                        invalid_type_error: "email must be of type string" 
                                                                                    }
                                                                                 ).optional() 
                                                        }
                                                    )
                                        }
                                    )

export const markLearningModulePartAsCompletedValidationSchema = z.object
                                                    (
                                                        {
                                                            body: z.object      
                                                                    (
                                                                        {
                                                                           _id: z.string
                                                                            ({
                                                                             required_error:"learning id required", 
                                                                             invalid_type_error:"learning id must be of type string"
                                                                            }),
                                                                            partTitle: z.string
                                                                            ({
                                                                             required_error:"partTitle required", 
                                                                             invalid_type_error:"partTitle must be of type string"
                                                                            })  
                                                                        }
                                                                    )
                                                        }
                                                    )

 export type SignupInput =  TypeOf<typeof SignupSchema>
 export type VerifyUserSchema = z.infer<typeof VerifyUserValidationSchema> 
 export type SaveUserFirstAndLastNameSchema = z.infer<typeof SaveUserFirstAndLastNameValidationSchema> 
 export type MarkLearningModuleAsCompletedSchema = z.infer<typeof markLearningModulePartAsCompletedValidationSchema>