
import { Types } from "mongoose"


interface learningModulePartContent 
{
    type: string, 
    value: string 
}


export interface ICreateLearningModulePart_Req
{
    learningModuleId: string,
    content: learningModulePartContent[]
}

export interface IGetLearningModulePart_Res
{
    _id: Types.ObjectId, 
    learningModuleId: Types.ObjectId, 
    quizId: Types.ObjectId, 
    content: learningModulePartContent
}