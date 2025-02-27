"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b7272d06-8dff-5061-9881-7e0367778f34")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCache = exports.redisClient = exports.passport = void 0;
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
const passport_1 = __importDefault(require("./middleware/passportAuth/passport"));
exports.passport = passport_1.default;
const EnvVars_1 = __importDefault(require("@src/common/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/common/HttpStatusCodes"));
const classes_1 = require("@src/common/classes");
const misc_1 = require("@src/common/misc");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
var redisClient;
var SetCache;
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.CookieProps.Secret));
app.use((0, cors_1.default)({
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use((0, cookie_session_1.default)({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || 'random-cookie-key']
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
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
    return res.status(200).json({ success: true, "msg": "Welcome to the Interview AI API" });
});
function access(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}
app.get('/auth/google', access, passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/linkedin', (req, res) => {
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&state=${process.env.LINKEDIN_AUTH_CSRF_STRING}&scope=profile%20email%20openid`;
    res.redirect(url);
});
app.get('/api/v1/auth/linkedin/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var { state, code } = req.query;
    if (!state)
        return res.status(400).json({ success: false, msg: "unauthorized" });
    if (!code)
        return res.status(400).json({ success: false, msg: "unauthorized" });
    if (state !== process.env.LINKEDIN_AUTH_CSRF_STRING)
        return res.status(400).json({ success: false, msg: "unauthorized" });
    const url = 'https://www.linkedin.com/oauth/v2/accessToken';
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI
    });
    try {
        const response = yield fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!response.ok) {
            throw new Error(`Error fetching access token: ${response.statusText}`);
        }
        const data = yield response.json();
        console.log('Access Token Response:', data);
        return res.json(data);
    }
    catch (err) {
        console.log("Error while signing user in with linkedin");
        console.log(err);
        return res.status(500).json({ success: false, msg: "server error" });
    }
}));
exports.default = app;
//# sourceMappingURL=server.js.map
//# debugId=b7272d06-8dff-5061-9881-7e0367778f34
