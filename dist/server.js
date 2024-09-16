"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="04f55a8b-f026-5d55-9755-e5ae0691b698")}catch(e){}}();

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const jet_logger_1 = __importDefault(require("jet-logger"));
require("express-async-errors");
const EnvVars_1 = __importDefault(require("@src/common/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
const classes_1 = require("@src/common/classes");
const misc_1 = require("@src/common/misc");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.CookieProps.Secret));
const allowedOrigins = [
    'https://yourproductiondomain.com',
    'http://localhost:3000',
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return;
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Dev.valueOf()) {
    app.use((0, morgan_1.default)('dev'));
}
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Production.valueOf()) {
    app.use((0, helmet_1.default)());
}
(0, routes_1.routes)(app);
app.use((err, _, res, next) => {
    if (EnvVars_1.default.NodeEnv !== misc_1.NodeEnvs.Test.valueOf()) {
        jet_logger_1.default.err(err, true);
    }
    let status = HttpStatusCodes_1.default.BAD_REQUEST;
    if (err instanceof classes_1.RouteError) {
        status = err.status;
    }
    return res.status(status).json({ error: err.message });
});
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
app.get('/', (_, res) => {
    return res.status(200).json({ success: true, "msg": "Welcome to the Interview AI API" });
});
app.get('/users', (_, res) => {
    throw new Error("Sample Error");
    return res.status(200).json({ success: true, "msg": "Welcome to the Interview AI API" });
});
exports.default = app;
//# sourceMappingURL=server.js.map
//# debugId=04f55a8b-f026-5d55-9755-e5ae0691b698
