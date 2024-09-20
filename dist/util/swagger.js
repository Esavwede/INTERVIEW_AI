"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="2335b53d-6d8c-5efc-aea6-b84dac770975")}catch(e){}}();

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
                    title: 'Interview AI',
                    description: 'A documentation of all API Routes, **excluding admin Routes**',
                    version: '1.0.0'
                }
            },
            apis: ['./src/docs/**/*.ts']
        };
        const openapiSpecs = (0, swagger_jsdoc_1.default)(options);
        app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapiSpecs));
    }
    catch (e) {
        logger_1.default.error(e, 'SWAGGER INIT ERROR');
        console.log(e);
    }
}
//# sourceMappingURL=swagger.js.map
//# debugId=2335b53d-6d8c-5efc-aea6-b84dac770975
