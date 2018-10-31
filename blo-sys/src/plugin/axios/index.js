import axios from 'axios';
import qs from 'qs';
import Axios from './axios';
import config from '@/config';

axios.defaults.baseURL = config.state.baseUrl;

axios.interceptors.request.use((config) => {
    if (!window.navigator.onLine) {
        window.alert('连接失败,请检查您的网络');
        return;
    }
    config.data = qs.stringify(config.data);
    return config;
}, (error) => {
    return Promise.reject(error);
});

let instance = null;

export default {
    install(Vue, options) {
        Vue.prototype.$axios = function (...args) {
            !instance && (instance = new Axios(this));
            return instance.init(args[0]);
        };
    }
};
