const bodyParser = require('koa-bodyparser');

const addBodyParser = app => {
    app.use(bodyParser());
};

module.exports = {
    addBodyParser
};