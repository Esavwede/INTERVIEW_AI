

import { UserDTO } from "@src/DTOs/user/user"
import { IUser, User } from "../../models/User"
import { ILearningModuleOverview } from "@src/models/learningProfile"
import logger from "@src/system/logger/logger"


export interface INewUser { _id: string }


export class UserRepository 
{

    async create( user: UserDTO ): Promise< Pick<INewUser,'_id' > >
    {
        var newUser = await User.create( user )
        var userObject = { _id: newUser._id as string }
        return userObject 
    }

    async findByEmail( email: string ): Promise<IUser | null > 
    {
            const user = await User.findOne({ email },{ _id: 1, email: 1, userHasCreatedFirstJobProfile: 1, password: 1, newUser: 1, isVerified: 1, firstname: 1, lastname: 1, learningProfile: 1 })

            if(user)
            { 
                logger.info(`User_Repo: User Found: ${ String( user._id ) }`)
                return user 
            }

                logger.info(`User_Repo: User Not Found `)
                return user 
    }

    async update( _id: string , updateBody: Partial< Pick< IUser, 'firstname' | 'lastname' | 'email' | 'password' > >): Promise< boolean | null > 
    {
        const { modifiedCount } = await User.updateOne({ _id },updateBody,{ upsert: false })

        if( !modifiedCount ) return null 
        return true 
    }


    async findById( userID: string ): Promise< IUser | null > 
    {
            const user = await User.findByIdAndUpdate({ _id: userID },{ isVerified: true })
            return user
    }  

    async setUserNewToFalse( userID: string ): Promise< number >
    {
        const { modifiedCount }  = await User.updateOne({ _id: userID },{ newUser: false }) 
        return modifiedCount
    } 

    async saveLearningModuleOverview( userID: string, learningModuleOverviewArray: ILearningModuleOverview[] ): Promise< number > 
    {
        const { matchedCount } = await User.updateOne({ _id: userID },{ $push:{ learningProfile: {$each: learningModuleOverviewArray } }})
        return matchedCount
    }
    
    async getLearningModuleOverview( userId: string, moduleId: string ): Promise< ILearningModuleOverview | null > 
    {
        const learningModuleOverview = await User.findOne(
             { _id: userId},
             { learningProfile: { $elemMatch: { moduleId: moduleId }} }
            ) 

        if( !learningModuleOverview )
        {
            return null 
        }
       
            return learningModuleOverview.learningProfile[0] 
    }
    
    async updateLearningModuleCurrentPart( userId: string, moduleId: string, newCurrentPartIndex: number )
    {
        const update = await User.updateOne(
            { 
              _id: userId, 
              "learningProfile": { $elemMatch: { moduleId: moduleId } }
            },
            { 
              $set: { "learningProfile.$.currentPart": newCurrentPartIndex } 
            }
          )

          if( update ){ console.log( update.modifiedCount )}
          console.log('-------Here !-----')
          console.log( update )
    }

    async markUserHasCreatedFirstJobProfileAsFalse
    (
        userId: string 

    ): Promise<number> 
    {
        const { modifiedCount } = await User.updateOne({ _id: userId },{ userHasCreatedFirstJobProfile: true }) 
        return modifiedCount
    }

    
}// 