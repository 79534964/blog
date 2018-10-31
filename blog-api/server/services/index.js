const {Serve} = require('../decorator/service');
const {resolve} = require('path');

const servicesPath = resolve(__dirname, './');
console.log(servicesPath);
const instance = new Serve(servicesPath);
instance.init();

module.exports = instance.services;
