import * as types from '../../../mutation-types/common';

const state = {
  menuFlag: true
};

const getters = {
  [types.GET_COMMON_MENUFLAG]: (state) => {
    return state.menuFlag;
  }
};

const actions = {
  [types.ACT_COMMON_MENUFLAG]({state, commit, rootState}) {
    commit('common/set/MENUFLAG');
  }
};

const mutations = {
  [types.SET_COMMON_MENUFLAG](state) {
    state.menuFlag = !state.menuFlag;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
