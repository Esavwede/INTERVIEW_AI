
import { z, TypeOf} from "zod" 

export const SignupSchema = z.object(
    {
        body: z.object({ 
            firstname: z.string().min(2,'firstname length below 2').max(50,'firstname length cannot be more than 50'),
            lastname: z.string().min(2,'lastname length below 2').max(50,'lastname length cannot be more than 50'),
            email: z.string().email(' Invalid Email'),
            password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(64, "Password must be less than 64 characters"),
            confirmPassword: z.string()
        })
        .refine( data => data.password === data.confirmPassword, { message:"passwords do not match", path: ["confirm password"]} )
       
    }
)


 export type SignupInput=  TypeOf<typeof SignupSchema>