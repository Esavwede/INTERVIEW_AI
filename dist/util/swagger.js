"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerInit = swaggerInit;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const logger_1 = __importDefault(require("@src/system/logger/logger"));
function swaggerInit(app) {
    try {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'my api',
                    description: 'my api',
                    version: '1.0.0'
                }
            },
            apis: ['./src/routes/**/*.ts']
        };
        const openapiSpecs = (0, swagger_jsdoc_1.default)(options);
        app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecs));
    }
    catch (e) {
        logger_1.default.error(e, 'SWAGGER INIT ERROR');
        console.log(e);
    }
}
