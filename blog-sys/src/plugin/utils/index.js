import object from './object';

export default {
  install(Vue, options) {
    Vue.prototype.$utils = {};
    Vue.prototype.$utils.object = object;
  }
};
