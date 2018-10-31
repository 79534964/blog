const {resolve} = require('path');
const KoaRouter = require('koa-router');
const glob = require('glob');
const R = require('ramda');
const {resolvePath, changeToArr} = require('../utils');

const pathPrefix = Symbol('pathPrefix');
const routeMap = [];

class Route {
    constructor(app, routesPath) {
        this.app = app;
        this.router = new KoaRouter();
        this.routesPath = routesPath;
    }

    init() {
        const {app, router, routesPath} = this;

        glob.sync(resolve(routesPath, '**/*.js')).forEach(require);

        R.forEach(({target, method, path, callback}) => {
                const prefix = resolvePath(target[pathPrefix]);
                router[method](prefix + path, ...callback);
            }
        )(routeMap);

        app.use(router.routes());
        app.use(router.allowedMethods());
    };
}

const Controller = path => target => (target.prototype[pathPrefix] = path);

const setRouter = method => path => (target, key, descriptor) => {
    routeMap.push({
        target,
        method,
        path: resolvePath(path),
        callback: changeToArr(target[key])
    });
    return descriptor;
};

const Get = setRouter('get');

const Post = setRouter('post');

const Put = setRouter('put');

const Delete = setRouter('Delete');

const Required = require('./required');

const Log = require('./log');

const Auth = require('./auth');

module.exports = {
    Route,
    Controller,
    Delete,
    Put,
    Post,
    Get,
    Required,
    Log,
    Auth
};
