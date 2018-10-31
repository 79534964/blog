import * as types from '../../../mutation-types/common';

const state = {
  lockFlag: false
};

const getters = {
  [types.GET_COMMON_LOCKFLAG]: (state) => {
    return state.lockFlag;
  }
};

const actions = {
  [types.ACT_COMMON_LOCKFLAG]({state, commit, rootState}, beal) {
    commit('common/set/LOCKFLAG', beal);
  }
};

const mutations = {
  [types.SET_COMMON_LOCKFLAG](state, beal) {
    state.lockFlag = beal;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
