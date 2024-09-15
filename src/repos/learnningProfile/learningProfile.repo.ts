import { ILearningProfile, LearningProfile } from "@src/models/learningProfile";
import { Types } from "mongoose";





export class LearningProfileRepo
{

    constructor()
    {

    }


    async create( profileDoc: Pick< ILearningProfile, 'userId' | 'learningModules' > ): Promise< void > 
    {
        await LearningProfile.create( profileDoc )
    }


    async findOne( userId: string | Types.ObjectId  ): Promise< Pick<ILearningProfile, 'userId'> | null > 
    {
        const profile = await LearningProfile.findOne({ userId },{ _id: 0, userId: 1}).lean().exec()  
        return profile
    }


}