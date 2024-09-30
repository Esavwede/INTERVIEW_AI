"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="77b502e6-8941-5447-9669-1a4bb4a2f9ca")}catch(e){}}();

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
require("./pre-start");
const EnvVars_1 = __importDefault(require("@src/common/EnvVars"));
const server_1 = __importDefault(require("./server"));
const http_1 = require("http");
const logger_1 = __importDefault(require("./system/logger/logger"));
const connect_1 = require("./system/database/connect");
const mongoose_1 = __importDefault(require("mongoose"));
const swagger_1 = require("./util/swagger");
const websocketsServer_1 = require("./websocketsServer");
var db = mongoose_1.default.connection;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        var db = yield (0, connect_1.createDatabaseConnection)();
        (0, swagger_1.swaggerInit)(server_1.default);
        const server = (0, http_1.createServer)(server_1.default);
        yield (0, websocketsServer_1.initializeWebsocketsServer)(server);
        const SERVER_START_MSG = ('Express server started on port: ' + EnvVars_1.default.Port.toString());
        server.listen(EnvVars_1.default.Port, () => logger_1.default.info(SERVER_START_MSG));
        process.on("SIGINT", () => { gracefulShutdown(); });
        process.on("SIGTERM", () => { gracefulShutdown(); });
        function gracefulShutdown() {
            try {
                console.log(' Attempting Graceful Shutdown ');
                server.close((e) => {
                    if (e) {
                        console.log("Error occured while closing the server ");
                        console.log(e);
                    }
                    console.log(" Graceful Shutdown Successful ");
                    process.exit(0);
                });
            }
            catch (e) {
                console.log("Error occured while attempting graceful shutdown ");
                console.log(e);
            }
        }
    });
}
start();
//# sourceMappingURL=index.js.map
//# debugId=77b502e6-8941-5447-9669-1a4bb4a2f9ca
