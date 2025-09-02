import { Express } from "express-serve-static-core";
import { userRoutes } from "./user";
import logger from "@src/system/logger/logger";
import { learningModuleRoutes } from "./LearningModule/learningModule.route";
import { quizModuleRoutes } from "./quiz/quiz.route";
import { learningModulePartRoutes } from "./learningModulePart/learningModulePart";
import { jobProfileRoutes } from "./jobProfile/jobProfile.route";
import { jobDescriptionRoutes } from "./jobDescription/jobDescription.route";
import { sendMail } from "@src/util/mail/sendMain";

export function routes(app: Express) {
  try {
    userRoutes(app);
    learningModulePartRoutes(app);
    learningModuleRoutes(app);
    quizModuleRoutes(app);
    jobProfileRoutes(app);
    jobDescriptionRoutes(app);

    // Temporary
    app.post("/postmail", (req, res) => {
      const { email } = req.body;
      try {
        const emailBody = {
          email: "ogaga@ogaga.tech",
          subject: "New User registered",
          text: "User registered: " + email,
          html: "user registered: " + email,
        };
        sendMail(emailBody);
        res.status(200).send({ message: "Mail sent successfully!" });
      } catch (e: any) {
        logger.error(e, "Mail_Error");
        res.status(500).send({ message: e.message });
      }
    });

    logger.info("API ROUTES CREATED");
  } catch (e: any) {
    logger.error(e, "Routes_Error");
  }
}
