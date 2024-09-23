
// src/types/express.d.ts

import { ILearningProfile } from "@src/models/learningProfile";
import { Request } from "express-serve-static-core";

export interface IUser {
  _id: string,
  firstname?: string,
  lastname?: string,
  userHasCreatedFirstJobProfile: boolean,
  email?: string,
  learningProfile?: ILearningProfile[],
  newUser?: boolean 
}

declare global {
  namespace Express {
    interface Request {
      ops?: string; // ops is optional
      user?: IUser; // user is optional
    }
  }
}
