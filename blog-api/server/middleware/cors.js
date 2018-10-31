const cors = require('koa2-cors');

const addCors = app => {
    app.use(cors({
        origin: (ctx) => {
            return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }));
};

module.exports = {
    addCors
};
