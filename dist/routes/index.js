"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="912be883-7475-5267-8219-975354867ee2")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const user_1 = require("./user");
const logger_1 = __importDefault(require("@src/system/logger/logger"));
const learningModule_route_1 = require("./LearningModule/learningModule.route");
const quiz_route_1 = require("./quiz/quiz.route");
const learningModulePart_1 = require("./learningModulePart/learningModulePart");
const learningArea_route_1 = require("./learningArea/learningArea.route");
const learningProfile_route_1 = require("./learningProfile/learningProfile.route");
const jobProfile_route_1 = require("./jobProfile/jobProfile.route");
const jobDescription_route_1 = require("./jobDescription/jobDescription.route");
function routes(app) {
    try {
        (0, learningProfile_route_1.learningProfileRoutes)(app);
        (0, user_1.userRoutes)(app);
        (0, learningModulePart_1.learningModulePartRoutes)(app);
        (0, learningModule_route_1.learningModuleRoutes)(app);
        (0, quiz_route_1.quizModuleRoutes)(app);
        (0, learningArea_route_1.learningAreaRoutes)(app);
        (0, jobProfile_route_1.jobProfileRoutes)(app);
        (0, jobDescription_route_1.jobDescriptionRoutes)(app);
        logger_1.default.info("API ROUTES CREATED");
    }
    catch (e) {
        console.log("API ROUTES ERROR");
        console.log(e);
    }
}
//# sourceMappingURL=index.js.map
//# debugId=912be883-7475-5267-8219-975354867ee2
