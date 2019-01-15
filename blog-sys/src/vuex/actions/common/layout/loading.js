import * as types from '../../../mutation-types/common';

const state = {
  loading: false,
  btnLoading: false
};

const getters = {
  [types.GET_COMMON_LOADING]: (state) => {
    return state.loading;
  },
  [types.GET_COMMON_BTNLOADING]: (state) => {
    return state.btnLoading;
  }
};

const actions = {
  [types.ACT_COMMON_LOADING]({state, commit, rootState}, beal) {
    commit('common/set/LOADING', beal);
  },
  [types.ACT_COMMON_BTNLOADING]({state, commit, rootState}, beal) {
    commit('common/set/BTNLOADING', beal);
  }
};

const mutations = {
  [types.SET_COMMON_LOADING](state, beal) {
    state.loading = beal;
  },
  [types.SET_COMMON_BTNLOADING](state, beal) {
    state.btnLoading = beal;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
