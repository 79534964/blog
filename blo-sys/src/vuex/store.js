import Vue from 'vue';
import Vuex from 'vuex';
// api
import api from './api';
// url
import config from '@/config';

// common layout
import loading from './actions/common/layout/loading';
import menuFlag from './actions/common/layout/menuFlag';
import lockFlag from './actions/common/layout/lockFlag';

// login
import login from './actions/login/login';

// article
import articleArrange from './actions/article/articleArrange';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        config,
        api,
        // common show
        menuFlag,
        loading,
        lockFlag,
        // login
        login,
        // article
        articleArrange
    }
});

export default store;
