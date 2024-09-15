import { BadRequestError } from "./badRequestError";
import { ForbiddenError } from "./forbiddenError";
import { NotFoundError } from "./notFoundError";
import { ServerError } from "./serverError";
import { UnauthorizedError } from "./unauthorizedError";



export type AnyAppError = ServerError | NotFoundError | ForbiddenError | BadRequestError | UnauthorizedError 