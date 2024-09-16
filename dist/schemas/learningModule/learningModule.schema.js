"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLearningModulePartValidationSchema = exports.SaveLearningModuleSummaryValidationSchema = exports.DeleteLearningModuleSchema = exports.UpdateLearningModuleSchema = exports.GetLearningModuleSchema = exports.PublishLearningModuleValidationSchema = exports.CreateLearningModuleSchema = exports.LearningModuleOverviewSchema = void 0;
const zod_1 = require("zod");
exports.LearningModuleOverviewSchema = zod_1.z.object({
    moduleId: zod_1.z.string({
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
        learningModules: zod_1.z.array(exports.LearningModuleOverviewSchema)
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
//# sourceMappingURL=learningModule.schema.js.map