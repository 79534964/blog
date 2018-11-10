import * as types from '../../mutation-types/article';

const state = {
  list: [],
  details: '',
  imgs: []
};

const getters = {
  [types.GET_ARTICLEARRANGE_LIST]: (state) => {
    return state.list;
  },
  [types.GET_ARTICLEARRANGE_DETAILS]: (state) => {
    return state.details;
  },
  [types.GET_ARTICLEARRANGE_IMGS]: (state) => {
    return state.imgs;
  }
};

const actions = {
  [types.ACT_ARTICLEARRANGE_LIST]({state, commit, rootState}, {httpFun}) {
    return httpFun(rootState.api.articleArrangeUrl, [], ({data}) => {
      commit('articleArrange/set/LIST', data);
    });
  },
  [types.ACT_ARTICLEARRANGE_DETAILS]({state, commit, rootState}, {httpFun, body: {file}}) {
    return httpFun(rootState.api.articleArrangeDetailsUrl, [{
      type: 'String',
      data: [{file}]
    }], ({data}) => {
      commit('articleArrange/set/DETAILS', data);
    });
  },
  [types.ACT_ARTICLEARRANGE_IMGS]({state, commit, rootState}, {httpFun, body: {file}}) {
    return httpFun(rootState.api.articleArrangeImgsUrl, [{
      type: 'StringToFile',
      data: [{file}]
    }], ({data}) => {
      commit('articleArrange/set/IMGS', data);
    });
  },
  [types.ACT_ARTICLEARRANGE_ADD]({state, commit, rootState}, {
    httpFun,
    body: {file, content}
  }) {
    return httpFun(rootState.api.articleArrangeAddUrl, [{
      type: 'String',
      data: [{content}]
    }, {
      type: 'FileToString',
      data: [{file}]
    }]);
  },
  [types.ACT_ARTICLEARRANGE_UPDATE]({state, commit, rootState}, {
    httpFun,
    body: {file, content}
  }) {
    return httpFun(rootState.api.articleArrangeUpdateUrl, [{
      type: 'String',
      data: [{content}]
    }, {
      type: 'FileToString',
      data: [{file}]
    }]);
  },
  [types.ACT_ARTICLEARRANGE_DEL]({state, commit, rootState}, {httpFun, body: {file, img}}) {
    return httpFun(rootState.api.articleArrangeDelUrl, [{
      type: 'String',
      data: [{file}]
    }, {
      type: 'StringToFile',
      data: [{img}]
    }]);
  },
  [types.ACT_ARTICLEARRANGE_IMGDEL]({state, commit, rootState}, {httpFun, body: {img}}) {
    return httpFun(rootState.api.articleArrangeImgDelUrl, [{type: 'String', data: [{img}]}]);
  },
  [types.ACT_ARTICLEARRANGE_BACKUPS]({state, commit, rootState}, {httpFun}) {
    return httpFun(rootState.api.articleArrangeBackupsUrl, []);
  }
};

const mutations = {
  [types.SET_ARTICLEARRANGE_LIST](state, list) {
    state.list = list;
  },
  [types.SET_ARTICLEARRANGE_DETAILS](state, details) {
    state.details = details;
  },
  [types.SET_ARTICLEARRANGE_IMGS](state, list) {
    state.imgs = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
