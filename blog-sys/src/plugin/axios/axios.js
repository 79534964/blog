import axios from 'axios';
import storage from '@/common/js/storage';
import preprocess from './preprocess';
import store from '@/vuex/store';
// 正确
const OK = 200;
// token失效
const NOTOKEN = 415;

let Vue = null;

export default class Axios {
    constructor(vue) {
        this.state = '';
        this.interceptFlag = true;
        this.btnLoading = false;
        Vue = vue;
    }

    init = ({actionType, body = {}, interceptFlag = true, btnLoading = false}) => {
        this.interceptFlag = interceptFlag;
        this.btnLoading = btnLoading;
        return store.dispatch(actionType, {httpFun: this.http, body});
    }

    http = (url, list, success) => {
        return new Promise((resolve, reject) => {
            this.openLoading();
            let body = preprocess.init(list);
            let {token} = store.state.login;
            axios.post(
                url,
                token ? Object.assign({userToken: token}, body) : body
            ).then(({data: {code, data, msg}}) => {
                this.closeLoading();
                this.noToken({code});
                this.errorMsg({code, msg});
                this.success(() => {
                    success && success({code, data, body, msg});
                    resolve({code, data, body, msg});
                });
            }).catch((error) => {
                this.closeLoading();
                this.httpFail(error);
            });
        });
    };

    success = (fun) => {
        if (this.state === '' || !this.interceptFlag) {
            fun();
        }
        this.state = '';
    }

    noToken = ({code}) => {
        if (code === NOTOKEN && this.interceptFlag) {
            this.state = 'noToken';
            Vue.$alert('登陆过期，请您重新登陆', '温馨提示', {
                callback: () => {
                    storage.clearSession('userInfo');
                    storage.clearLocal('userInfo');
                    window.location.reload();
                }
            });
        }
    }

    errorMsg = ({msg, code}) => {
        if (code !== OK && code !== NOTOKEN && this.interceptFlag) {
            this.state = 'errorMsg';
            Vue.$message.error(msg);
        }
    }

    httpFail = ({response: {config, status, statusText, headers, data}}) => {
        Vue.$message.warning('请求失败，服务器异常');
        store.dispatch('common/act/LOGERROR', {
            type: 'http',
            error: {config, status, statusText, headers, data: status === 404 ? {} : data}
        });
    }

    openLoading = () => {
        if (this.interceptFlag) {
            if (this.btnLoading) {
                store.dispatch('loading/act/BTNLOADING', {flag: true});
            } else {
                store.dispatch('loading/act/LOADING', {flag: true});
            }
        }
    }

    closeLoading = () => {
        store.dispatch('loading/act/BTNLOADING', {flag: false});
        store.dispatch('loading/act/LOADING', {flag: false});
    }
}
