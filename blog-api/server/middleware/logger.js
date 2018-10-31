const logger = require('koa-logger');

const addLogger = app => {
    app.use(
        logger((str, args) => {
            console.log(`---------------${str}`);
        })
    );
};

module.exports = {
    addLogger
};