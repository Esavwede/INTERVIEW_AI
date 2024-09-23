


export interface IPartContentDTO 
{
    elementType: string, 
    value: string 
}


export interface ILearningModulePartDTO
{
    learningModuleId: string, 
    quizId?: string,
    partContent: IPartContentDTO[] 
}

export interface ILearningModuleDTO 
{
    title: string, 
    area: string, 
    stage: string, 
    description: string, 
    imgSrc: string,
    parts?: ILearningModulePartDTO[] 
}


export interface IGetLearningModuleDTO  
{
    id: string 
}

export interface IUpdateLearningModuleDTO 
{
    title?: string, 
    area?: string,
    stage?: string, 
    stageName?: string, 
    stageNumber?: number, 
    description?: string,
    imgSrc?: string,
    isDraft: boolean 
}
