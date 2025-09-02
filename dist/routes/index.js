"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e1d2598b-a9be-51cb-ac2c-76485ad6d976")}catch(e){}}();

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
const jobProfile_route_1 = require("./jobProfile/jobProfile.route");
const jobDescription_route_1 = require("./jobDescription/jobDescription.route");
const sendMain_1 = require("@src/util/mail/sendMain");
function routes(app) {
    try {
        (0, user_1.userRoutes)(app);
        (0, learningModulePart_1.learningModulePartRoutes)(app);
        (0, learningModule_route_1.learningModuleRoutes)(app);
        (0, quiz_route_1.quizModuleRoutes)(app);
        (0, jobProfile_route_1.jobProfileRoutes)(app);
        (0, jobDescription_route_1.jobDescriptionRoutes)(app);
        app.post("/postmail", (req, res) => {
            const { email, firstname, lastname, jobTitle } = req.body;
            try {
                const emailBody = {
                    email: "ogaga@ogaga.tech",
                    subject: "New User registered",
                    text: "User registered: " + email,
                    html: `user registered: ${email}. Name: ${firstname} ${lastname}. Job Title: ${jobTitle}`,
                };
                (0, sendMain_1.sendMail)(emailBody);
                res.status(200).send({ message: "Mail sent successfully!" });
            }
            catch (e) {
                logger_1.default.error(e, "Mail_Error");
                res.status(500).send({ message: e.message });
            }
        });
        logger_1.default.info("API ROUTES CREATED");
    }
    catch (e) {
        logger_1.default.error(e, "Routes_Error");
    }
}
//# sourceMappingURL=index.js.map
//# debugId=e1d2598b-a9be-51cb-ac2c-76485ad6d976
