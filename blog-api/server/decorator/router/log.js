const {convert} = require('../utils');

let logTimes = 0;
const Log = convert(async (ctx, next) => {
    logTimes++;
    console.time(`${logTimes}: ${ctx.method} - ${ctx.url}`);
    await next();
    console.timeEnd(`${logTimes}: ${ctx.method} - ${ctx.url}`);
});

module.exports = Log;
