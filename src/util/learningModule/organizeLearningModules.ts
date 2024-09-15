

import { ILearningModuleUnderArea, ILearningArea } from "@src/models/area";
import { ServerError } from "../Errors/Endpoints/serverError";
import logger from "@src/system/logger/logger";




export function groupLearningAreasByStage( areas: ILearningArea[] )
{
    try 
    {
        
        // Group by stage
        const group = (areas: ILearningArea[]) => {
            return areas.reduce<Record<string, ILearningModuleUnderArea[]>>((acc, area) => {
                area.learningModulesUnderArea.forEach(module => {
                    // Initialize stage if it doesn't exist
                    if (!acc[module.stage]) {
                        acc[module.stage] = [];
                    }
                    // Add area to the module
                    module.area = area.area;
                    // Push the module to the corresponding stage
                    acc[module.stage].push(module);
                });
                return acc;
            }, {});
        }

        return group( areas ) 

    }
    catch(e)
    {
        logger.error(e,"Error Occured while Fetching Onboarding Details: learningAreasByStages ")
        throw new ServerError("Error Occured While Fetching Onboarding Details")
    }
}


