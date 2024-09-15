import logger from "@src/system/logger/logger";
import { Request, Response} from "express-serve-static-core"
import { QuestionRepo } from "@src/repos/question/question.repo";
import { QuestionService } from "@src/services/question/question.service";
import { QuizSservice } from "@src/services/quiz/quiz.service";
import { QuizRepo } from "@src/repos/quiz/quiz.repo";
import { CreateQuizSchema, DeleteQuizSchema, FindQuizSchema, UpdateQuizSchema } from "@src/schemas/quiz/quiz.schema";
import { NotFoundError } from "@src/util/Errors/Endpoints/notFoundError";
import { ServerError } from "@src/util/Errors/Endpoints/serverError";


export class QuizController  
{

    private questionService 
    private quizService 

    constructor( ) 
    {
        
        const questionRepo = new QuestionRepo() 
        this.questionService = new QuestionService( questionRepo ) 

        const quizRepo = new QuizRepo() 
        this.quizService = new QuizSservice( quizRepo ) 
    
    }


    async create(req: Request<{},{}, CreateQuizSchema["body"]>, res: Response )
    {
        try 
        {

            logger.info("CONTROLLER: Creating New Quiz ") 
            
           const { questions, description, title, moduleId, modulePartNumber  } = req.body 

           const questionIds  = await this.questionService.create( questions )

            

            const quizBody = { description, title, moduleId, modulePartNumber, questions: questionIds }

            const quizCreated = await this.quizService.create( quizBody ) 

            if( !quizCreated )
            {
                return res.status(500).json({ success: false, msg:"SERVER ERROR" })
            }
            
            return res.status(201).json({ success: true, msg:"QUIZ CREATED" })

        }
        catch(e: any)
        {
            logger.error(e,'')
        }
    }

    async get( req: Request< FindQuizSchema['params']>, res: Response ) 
    {
        try 
        {
               const quiz = await this.quizService.find( req.params.id )

               return res.status(200).json({ success: true, data: quiz })

        }
        catch(e: any)
        {

                if( e instanceof NotFoundError )
                {
                    return res.status(e.statusCode).json({ success: false, msg: e.message })
                }

                if( e instanceof ServerError )
                {
                    return res.status( e.statusCode ).json({ success: false, msg: e.message })
                }
        }
    }

    async update( req: Request<UpdateQuizSchema["params"],{}, UpdateQuizSchema["body"]>, res: Response )
    {
        try 
        {   
            await this.quizService.update(  req.params.id,  req.body )
           
            return res.status(200).json({ success: true, msg:"Quiz updated successfully "})
        }
        catch(e: any)
        {   
                return res.status( e.statusCode ).json({ success: false, msg: e.message })
        }
    }

    async delete( req: Request<DeleteQuizSchema["params"]>, res: Response )
    {
        try 
        {   
            const deletedCount = await this.quizService.delete( req.params.id )
            
            if( deletedCount !== 1 ) 
            {
                return res.status(200).json({ success: true, msg:"Quiz Does Not Exist In Database "})
            }
                return res.status(200).json({ success: true, msg:"Quiz Deleted Successfully "})
        }
        catch(e: any )
        {
            return res.status( e.statusCode ).json({ success: false, msg: e.message })
        }
    }

}