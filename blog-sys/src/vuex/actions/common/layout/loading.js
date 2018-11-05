import * as types from '../../../mutation-types/common';

const state = {
  loading: false,
  btnLoading: false
};

const getters = {
  [types.GET_LOADING_LOADING]: (state) => {
    return state.loading;
  },
  [types.GET_LOADING_BTNLOADING]: (state) => {
    return state.btnLoading;
  }
};

const actions = {
  [types.ACT_LOADING_LOADING]({state, commit, rootState}, {flag}) {
    commit('loading/set/LOADING', flag);
  },
  [types.ACT_LOADING_BTNLOADING]({state, commit, rootState}, {flag}) {
    commit('loading/set/BTNLOADING', flag);
  }
};

const mutations = {
  [types.SET_LOADING_LOADING](state, beal) {
    state.loading = beal;
  },
  [types.SET_LOADING_BTNLOADING](state, beal) {
    state.btnLoading = beal;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
