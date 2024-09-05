

import { UserDTO } from "@src/DTOs/user/user"
import { IUser, User } from "../../models/User"
import logger from "@src/system/logger/logger"


export interface INewUser { _id: string }


export class UserRepository 
{

    async create( user: UserDTO ): Promise<INewUser> 
    {
        var newUser = await User.create( user )
        var userObject: INewUser = { _id: newUser._id as string }
        return userObject 
    }

    async findByEmail( email: string ): Promise<IUser | null > 
    {
        try 
        {
            const user = await User.findOne({ email },{ _id: 0, email: 1, password: 1 })
            return user 
        }
        catch(e) 
        {
            logger.error(e,'DATABASE ERROR') 
            return null
        }
    }  
}