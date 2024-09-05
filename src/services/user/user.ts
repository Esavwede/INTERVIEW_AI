
import { UserRepository, INewUser } from "@src/repos/user/user.repo";
import { UserDTO } from "@src/DTOs/user/user";

export class UserService 
{
    
    constructor( private userRepository: UserRepository)
    {
        
    }


    async create( user:  UserDTO ): Promise< INewUser >
    {
        return await this.userRepository.create( user ) 
    }

    async findByEmail( email: string )
    {
        return await this.userRepository.findByEmail( email ) 
    }


}