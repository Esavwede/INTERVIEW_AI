
import { IQuestionDTO_Req } from "../question/question.dto"



export interface IQuizDTO_Req 
{
    title: string, 
    description: string,
    moduleId: string, 
    modulePartNumber: number, 
    questions: string[] 
}


export interface IUpdateQuiz_Req 
{
    title?: string, 
    description?: string,
    moduleId?: string, 
    modulePartNumber?: number, 
    questions?: IQuestionDTO_Req[]
}


export interface IGetQuizDTO_Req 
{
    id: string 
}

export interface IGetQuizDTO_Res 
{
    _id: string, 
    title: string, 
    description: string,
    moduleId: string, 
    modulePartNumber: number, 
    questions?: string[]
}

export interface IDeleteQuizDTO_Req  
{
    _id: string 
}
