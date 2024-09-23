"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="71aef683-e6b8-5b42-b364-c81c6cec1853")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const Sentry = __importStar(require("@sentry/node"));
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("express-async-errors");
const signinWithGoogle_1 = __importDefault(require("./middleware/googleAuth/signinWithGoogle"));
exports.passport = signinWithGoogle_1.default;
const EnvVars_1 = __importDefault(require("@src/common/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
const classes_1 = require("@src/common/classes");
const misc_1 = require("@src/common/misc");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.CookieProps.Secret));
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use((0, cookie_session_1.default)({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || 'random-cookie-key']
}));
app.use(signinWithGoogle_1.default.initialize());
app.use(signinWithGoogle_1.default.session());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Dev.valueOf()) {
    app.use((0, morgan_1.default)('dev'));
}
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Production.valueOf()) {
    app.use((0, helmet_1.default)());
}
(0, routes_1.routes)(app);
app.get('/sentry-test', (req, res) => { throw new Error("I'm disappointed withh sentry's documentation "); });
Sentry.setupExpressErrorHandler(app);
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
    return res.status(200).json({ success: true, "msg": "Welcome to the Interview AI API" });
});
app.get('/auth/google', signinWithGoogle_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
exports.default = app;
//# sourceMappingURL=server.js.map
//# debugId=71aef683-e6b8-5b42-b364-c81c6cec1853
