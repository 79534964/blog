import * as types from '../../../mutation-types/common';

const state = {
  list: []
};

const getters = {
  [types.GET_COMMON_REFERLIST]: (state) => {
    return state.list;
  }
};

const actions = {
  [types.ACT_COMMON_REFERLIST]({state, commit, rootState}, list) {
    commit('common/set/REFERLIST', list);
  }
};

const mutations = {
  [types.SET_COMMON_REFERLIST](state, list) {
    state.list = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
