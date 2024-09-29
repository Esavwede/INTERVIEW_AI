"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ddc68693-7c85-5293-9e32-548148a681de")}catch(e){}}();

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
exports.initializeWebsocketsServer = initializeWebsocketsServer;
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./system/logger/logger"));
const AI_Interviewer_1 = require("./apps/AI_Interviewer/AI_Interviewer");
const redisCache_1 = require("./middleware/cache/redisCache");
const fetchUserResume_1 = require("./util/jobDescription/fetchUserResume");
const generateJobDescriptionFromResume_1 = require("./util/jobDescription/generateJobDescriptionFromResume");
function initializeWebsocketsServer(server) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger_1.default.info('Initializing Socket.io Server');
            const res = yield (0, redisCache_1.initializeRedis)();
            if (!(res === null || res === void 0 ? void 0 : res.RedisClient) || !res.setCache) {
                return;
            }
            const { RedisClient, setCache } = res;
            const Interviewer = new AI_Interviewer_1.AI_Interviewer();
            const io = new socket_io_1.Server(server, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
                }
            });
            io.use((socket, next) => {
                const { candidateFirstname, roleName, experienceLevel, jobDescription, resumeUrl } = socket.handshake.query;
                if (!candidateFirstname || !roleName || !experienceLevel || !jobDescription || !resumeUrl) {
                    socket.emit('INCOMPLETE_INTERVIEW_DATA', socket.handshake.query);
                }
                socket.data = { candidateFirstname, roleName, experienceLevel, jobDescription, resumeUrl };
                next();
            });
            io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
                logger_1.default.info("Client Connected To Socket Server " + socket.id);
                let data = socket.data;
                const userResume = yield (0, fetchUserResume_1.fetchUserResumeAsText)(data.resumeUrl);
                const companyName = yield (0, generateJobDescriptionFromResume_1.extractCompanyNameFromJobDescription)(data.jobDescription);
                const { candidateFirstname, roleName, experienceLevel, jobDescription } = data;
                let interviewData = { candidateFirstname, roleName, experienceLevel, jobDescription, companyName, candidateResume: userResume };
                const interviewSessionData = {
                    interviewComplete: false,
                    interviewTranscript: `Interviewer: Welcome to the Interview ${candidateFirstname}`,
                    interviewData
                };
                setCache(socket.id, interviewSessionData);
                var serverResponse = { msg: `Welcome to the interview ${candidateFirstname}`, metaData: { interviewComplete: false, audioUrl: 'audioUrl' } };
                socket.emit('INTERVIEWER_RESPONSE', serverResponse);
                socket.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
                    var interviewSessionData = yield RedisClient.get(socket.id);
                    if (!interviewSessionData) {
                        socket.emit('SERVER_ERROR', 'COULD_NOT_FIND_INTERVIEW_DATA_IN_MEMORY');
                        return;
                    }
                    var parsedInterviewSessionData = JSON.parse(interviewSessionData);
                    var candidateMessage = '\nCandidate: ' + message;
                    parsedInterviewSessionData['interviewTranscript'] = parsedInterviewSessionData['interviewTranscript'] + candidateMessage;
                    const interviewCompleted = yield Interviewer.checkInterviewCompleted(parsedInterviewSessionData['interviewTranscript']);
                    if (interviewCompleted) {
                        const interviewerResponse = { msg: 'Interview Ended', metaData: { interviewComplete: true, audioUrl: "" } };
                        socket.emit('INTERVIEW_COMPLETED', interviewerResponse);
                    }
                    else {
                        const { interviewData, interviewTranscript } = parsedInterviewSessionData;
                        var generatedInterviewerResponse = yield Interviewer.generateInterviewerNextResponse(interviewData, interviewTranscript);
                        parsedInterviewSessionData['interviewTranscript'] = parsedInterviewSessionData['interviewTranscript'] + '\n' + generatedInterviewerResponse;
                        setCache(socket.id, parsedInterviewSessionData);
                        const interviewerResponse = { msg: generatedInterviewerResponse, metaData: { interviewComplete: false, audioUrl: 'audioUrl' } };
                        socket.emit('INTERVIEWER_RESPONSE', interviewerResponse);
                    }
                }));
                socket.on('disconnect', () => {
                    logger_1.default.info("Client disconnected from socket server");
                });
            }));
            logger_1.default.info('SOCKET.io Server Initialized');
        }
        catch (e) {
            logger_1.default.error(e, "Could Not Initialize Web Socket Server");
        }
    });
}
//# sourceMappingURL=websocketsServer.js.map
//# debugId=ddc68693-7c85-5293-9e32-548148a681de
