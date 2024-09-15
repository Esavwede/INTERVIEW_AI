

interface IOption
{
    char: string,
    value: string    
}


export interface IQuestionDTO_Req
{
    text: string,
    area: string, 
    stage: string, 
    options: IOption[] 
    answer: IOption 
}


export interface IQuestionDTO_Res 
{
    ids: string[] 
}