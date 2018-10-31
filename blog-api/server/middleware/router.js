const {Route} = require('../decorator/router');
const {resolve} = require('path');

const addRouter = (app) => {
    const routesPath = resolve(__dirname, '../routes');
    const instance = new Route(app, routesPath);
    instance.init();
};

module.exports = {
    addRouter
};
