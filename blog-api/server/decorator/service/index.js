const glob = require('glob');
const {resolve} = require('path');
const R = require('ramda');

const serviceMap = [];

const interArrPrefix = Symbol('interArrPrefix');

class Serve {
    constructor(servicesPath) {
        this.servicesPath = servicesPath;
        this.services = {};
    }

    init() {
        const {servicesPath} = this;
        glob.sync(resolve(servicesPath, '**/*.js')).forEach(require);
        R.forEach(({name, target, interArrPrefix}) => {
            const instance = new target();
            this.services[name] = R.map(e => R.bind(e)(instance))(R.pick(interArrPrefix)(instance));
        })(serviceMap);
    };
}

const Index = (name) => (target) => {
    serviceMap.push({
        name,
        target,
        interArrPrefix: target.prototype[interArrPrefix]
    });
};

const Interface = (target, name, descriptor) => {
    R.is(Array)(target[interArrPrefix]) || (target[interArrPrefix] = [])
    target[interArrPrefix].push(name);
    return descriptor;
}

module.exports = {
    Serve,
    Service: Index,
    Interface
};
