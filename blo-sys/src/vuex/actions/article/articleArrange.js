import * as types from '../../mutation-types/article';

const state = {
    list: [],
    details: ''
};

const getters = {
    [types.GET_ARTICLEARRANGE_LIST]: (state) => {
        return state.list;
    },
    [types.GET_ARTICLEARRANGE_DETAILS]: (state) => {
        return state.details;
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
    [types.ACT_ARTICLEARRANGE_DEL]({state, commit, rootState}, {httpFun, body: {file}}) {
        return httpFun(rootState.api.articleArrangeDelUrl, [{type: 'String', data: [{file}]}]);
    }
};

const mutations = {
    [types.SET_ARTICLEARRANGE_LIST](state, list) {
        state.list = list;
    },
    [types.SET_ARTICLEARRANGE_DETAILS](state, details) {
        state.details = details;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
