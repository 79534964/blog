import Vuex from 'vuex';
import Router from 'vue-router';
import Element from 'element-ui';

export default {
    install(Vue, options) {
        Vue.use(Vuex);
        Vue.use(Router);
        Vue.use(Element, {size: 'medium'});
    }
};
