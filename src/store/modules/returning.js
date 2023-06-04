// modules/returning

export default {
  namespaced: true,
  state: {
    showBackBtn: false,
    returningFunc: "",
    funcNum: null,
    returningFuncs: ["backToSubMenu2", "backToSubSecMenu"],

    // list of Back functions
    backToSubMenu2: false,
    backToSubSecMenu: false,
  },

  getters: {},

  mutations: {
    toggleBackBtn(state) {
      state.showBackBtn = !state.showBackBtn;
    },

    setReturningFunc(state, funcNum) {
      state.funcNum = funcNum;
      state.returningFunc = state.returningFuncs[funcNum];
      state.showBackBtn = true;
    },

    playBackFunc(state) {
      state[state.returningFunc] = true;
    },

    closeBackFunc(state) {
      state[state.returningFunc] = false;
    },
  },

  actions: {
    setReturningFunc({ commit }, funcName) {
      commit("toggleBackBtn");
      commit("setReturningFunc", funcName);
    },

    async playBackFunc({ commit, state }) {
      if (state.returningFunc == "backToSubMenu2") {
        commit("toggleBackBtn");
      }
      if (state.returningFunc == "backToSubSecMenu") {
        commit("learning/removeSubAndSec", null, { root: true });
        commit("learning/openingSubMenu", -1, { root: true });
      }

      await commit("playBackFunc");
      commit("closeBackFunc");

      commit("setReturningFunc", state.funcNum -1);
    },
    someAction({ dispatch, commit, getters, rootGetters }) {
      // getters.someGetter // -> 'foo/someGetter'
      // rootGetters.someGetter // -> 'someGetter'
      // rootGetters['bar/someGetter'] // -> 'bar/someGetter'

      dispatch("someOtherAction"); // -> 'foo/someOtherAction'
      // dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

      // commit('someMutation') // -> 'foo/someMutation'
      // commit('someMutation', null, { root: true }) // -> 'someMutation'
    },
    someOtherAction(ctx, payload) {
      console.log(ctx);
      console.log(payload);
    },
  },
};
