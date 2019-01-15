import confirm from './confirm';

export default {
    install(Vue, options) {
        Vue.prototype.$ele = {};
        Vue.prototype.$ele.confirm = confirm;
    }
};
