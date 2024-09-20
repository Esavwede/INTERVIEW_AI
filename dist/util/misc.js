"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c2a08631-245f-5e3c-bb27-3b602f9f5f00")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = getRandomInt;
exports.tick = tick;
function getRandomInt() {
    return Math.floor(Math.random() * 1000000000000);
}
function tick(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}
//# sourceMappingURL=misc.js.map
//# debugId=c2a08631-245f-5e3c-bb27-3b602f9f5f00
