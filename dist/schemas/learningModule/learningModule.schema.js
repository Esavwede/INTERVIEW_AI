"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4cee3e0e-9738-5bb6-b6fa-eb8d20263693")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLearningModulesUnderStageValidationSchema = exports.GetLearningModulePartValidationSchema = exports.SaveLearningModuleSummaryValidationSchema = exports.DeleteLearningModuleSchema = exports.UpdateLearningModuleSchema = exports.GetLearningModuleSchema = exports.PublishLearningModuleValidationSchema = exports.CreateLearningModuleSchema = exports.LearningModuleOverviewSchema = exports.LearningModuleOverviewSchema2 = void 0;
const zod_1 = require("zod");
exports.LearningModuleOverviewSchema2 = zod_1.z.object({
    _id: zod_1.z.string({
        required_error: "Module Id Not In Request",
        invalid_type_error: "Module Id Must Be of Type String",
    })
        .min(1, 'Invalid Length For Module Id'),
    area: zod_1.z.string({
        required_error: "Learning Area Not Found In Request",
        invalid_type_error: "Learning Area Must Be of Type String",
    })
        .min(2, "Learning Area Length Cannot Be less than 2"),
    stage: zod_1.z.string({
        required_error: "Stage not Found In Request Body",
        invalid_type_error: "Stage Must Be Of Type String",
    })
        .min(1, 'Stage Length Cannot Be less Than 1'),
    stageName: zod_1.z.string({
        required_error: "StageName not Found In Request Body",
        invalid_type_error: "StageName Must Be Of Type String",
    })
        .min(1, 'Stage Name Length Cannot Be less Than 1'),
    stageNumber: zod_1.z.number({
        required_error: "StageNumber not Found In Request Body",
        invalid_type_error: "StageNumber Must Be Of Type String",
    })
        .min(1, 'Stage Number Cannot Be less Than 1'),
    title: zod_1.z.string({
        required_error: "Title not Found In Request Body",
        invalid_type_error: "Title Must Be Of Type String",
    })
        .min(1, 'Title Length Cannot Be less than 1'),
    description: zod_1.z.string({
        required_error: "Description not Found In Request Body",
        invalid_type_error: "User Id Incorrect. Must be type: string",
    })
        .min(1, "Description Length Cannot Be less than 1"),
    imgSrc: zod_1.z.string({
        required_error: "imgSrc not Found In Request Body",
        invalid_type_error: "imgSrc Must Be A String",
    })
        .min(1, "imgSrc Length Cannot be less than 1"),
    totalParts: zod_1.z.number({
        required_error: "totalParts not Found In Request Body",
        invalid_type_error: "total Parts must be type: number",
    }),
    partsMetaData: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string({ required_error: "part title not found", invalid_type_error: "must be string" }),
        hasBeenCompleted: zod_1.z.boolean()
    }))
});
exports.LearningModuleOverviewSchema = zod_1.z.object({
    _id: zod_1.z.string({
        required_error: "Module Id Not In Request",
        invalid_type_error: "Module Id Must Be of Type String",
    })
        .min(1, 'Invalid Length For Module Id'),
    area: zod_1.z.string({
        required_error: "Learning Area Not Found In Request",
        invalid_type_error: "Learning Area Must Be of Type String",
    })
        .min(2, "Learning Area Length Cannot Be less than 2"),
    stage: zod_1.z.string({
        required_error: "Stage not Found In Request Body",
        invalid_type_error: "Stage Must Be Of Type String",
    })
        .min(1, 'Stage Length Cannot Be less Than 1'),
    stageName: zod_1.z.string({
        required_error: "StageName not Found In Request Body",
        invalid_type_error: "StageName Must Be Of Type String",
    })
        .min(1, 'Stage Name Length Cannot Be less Than 1'),
    stageNumber: zod_1.z.number({
        required_error: "StageNumber not Found In Request Body",
        invalid_type_error: "StageNumber Must Be Of Type String",
    })
        .min(1, 'Stage Number Cannot Be less Than 1'),
    title: zod_1.z.string({
        required_error: "Title not Found In Request Body",
        invalid_type_error: "Title Must Be Of Type String",
    })
        .min(1, 'Title Length Cannot Be less than 1'),
    description: zod_1.z.string({
        required_error: "Description not Found In Request Body",
        invalid_type_error: "User Id Incorrect. Must be type: string",
    })
        .min(1, "Description Length Cannot Be less than 1"),
    imgSrc: zod_1.z.string({
        required_error: "imgSrc not Found In Request Body",
        invalid_type_error: "imgSrc Must Be A String",
    })
        .min(1, "imgSrc Length Cannot be less than 1"),
    totalParts: zod_1.z.number({
        required_error: "totalParts not Found In Request Body",
        invalid_type_error: "total Parts must be type: number",
    })
});
exports.CreateLearningModuleSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Please Input Title'),
        area: zod_1.z.string().min(1, 'Please Input Knowledge Area'),
        stage: zod_1.z.string().min(1, 'Please Input Stage'),
        stageName: zod_1.z.string().min(1, "stage Id cannot be less than 1"),
        stageNumber: zod_1.z.number().int(),
        description: zod_1.z.string().min(1, 'Please Input Description'),
        imgSrc: zod_1.z.string().url("Please input Valid Url"),
        isDraft: zod_1.z.boolean()
    })
});
exports.PublishLearningModuleValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Please Input Title'),
        area: zod_1.z.string().min(1, 'Please Input Knowledge Area'),
        stage: zod_1.z.string().min(1, 'Please Input Stage'),
        stageName: zod_1.z.string().min(1, "stage Id cannot be less than 1"),
        stageNumber: zod_1.z.number().int(),
        description: zod_1.z.string().min(1, 'Please Input Description'),
        imgSrc: zod_1.z.string().url("Please input Valid Url"),
        totalParts: zod_1.z.number(),
        isDraft: zod_1.z.boolean().refine(val => val === false, {
            message: "isDraft must be false",
        })
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(5, 'Invalid id Length')
    })
});
exports.GetLearningModuleSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Please Input Learning Module Id')
    })
});
exports.UpdateLearningModuleSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'check title length').optional(),
        area: zod_1.z.string().min(1, 'check title length').optional(),
        stage: zod_1.z.string().min(1, 'check title length').optional(),
        stageName: zod_1.z.string().min(2, "stage name length cannot be less than 2").optional(),
        stageNumber: zod_1.z.number().min(2, "stage number length cannot be less than 2").optional(),
        description: zod_1.z.string().min(1, 'check title length').optional(),
        imgSrc: zod_1.z.string().min(1, 'check title length').optional()
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Input Params "ObjectId"')
    })
});
exports.DeleteLearningModuleSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'INPUT LEARNING MODULE ID')
    })
});
exports.SaveLearningModuleSummaryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        learningModules: zod_1.z.array(exports.LearningModuleOverviewSchema2)
    })
});
exports.GetLearningModulePartValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        totalParts: zod_1.z.string({ required_error: " totalParts not found in request body", invalid_type_error: "totalParts must be of type number" })
    }),
    params: zod_1.z.object({
        moduleId: zod_1.z.string().min(1, 'Learning Module Id length cannot be less than 1 '),
        partNumber: zod_1.z.string({ required_error: "partNumber is required", invalid_type_error: "partNumber must be of type Number" })
    })
});
exports.GetLearningModulesUnderStageValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string({
            required_error: "page must be include in request query"
        })
            .min(1, 'page not included in request query'),
        limit: zod_1.z.string({
            required_error: "limit must be included in request query"
        })
            .min(1, 'limit must be included in request query '),
        stageNumber: zod_1.z.string({
            required_error: "stageNumber must be included in request params",
            invalid_type_error: "stageNumber must be of type string"
        })
    })
});
//# sourceMappingURL=learningModule.schema.js.map
//# debugId=4cee3e0e-9738-5bb6-b6fa-eb8d20263693
