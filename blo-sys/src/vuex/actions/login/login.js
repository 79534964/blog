import * as types from '../../mutation-types/login';
import storage from '@/common/js/storage';

let userInfo = storage.getLocal({key: 'userInfo'}) || storage.getSession({key: 'userInfo'}) || {};

const state = {
  userInfo,
  token: userInfo.userToken || ''
};

const getters = {
  [types.GET_LOGIN_USERINFO]: (state) => {
    return state.userInfo;
  }
};

const actions = {
  [types.ACT_LOGIN_LOGIN]({state, commit, rootState}, {httpFun, body: {account, password, radio}}) {
    return httpFun(rootState.api.loginUrl, [{
      type: 'String',
      data: [{account}, {password}]
    }], ({data}) => {
      if (data.menu.length === 0) {
        window.alert('您缺少访问权限，请联系管理员！');
        return;
      }
      commit('login/set/USERINFO', data);
    });
  }
};

const mutations = {
  [types.SET_LOGIN_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
    state.token = userInfo.userToken;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
