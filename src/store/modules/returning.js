// modules/returning

export default {
  namespaced: true,
  state: {
    showBackBtn: false,
    returningFunc: "",
    funcNum: null,
    returningFuncs: ["backToSubMenu2", "backToSubSecMenu", "backToSubMenu3", "backToSubMenu1"],

    // list of Back functions
    backToSubMenu2: false,
    backToSubSecMenu: false,
    backToSubMenu3: false,
    backToSubMenu1: false,
  },

  getters: {},

  mutations: {
    toggleBackBtn(state) {
      state.showBackBtn = !state.showBackBtn;
    },

    showBackBtn(state) {
      state.showBackBtn = true;
    },

    setReturningFunc(state, funcNum) {
      state.funcNum = funcNum;
      state.returningFunc = state.returningFuncs[funcNum];
    },

    playBackFunc(state) {
      state[state.returningFunc] = true;
    },

    closeBackFunc(state) {
      state[state.returningFunc] = false;
    },
  },

  actions: {
    setReturningFunc({ commit, state }, funcNum) {
      if (!state.showBackBtn) commit("showBackBtn");
      commit("setReturningFunc", funcNum);
    },

    async playBackFunc({ commit, dispatch, state }) {
      if (state.returningFunc.substring(6, 13) == "SubMenu") {
        commit("toggleBackBtn");
        commit("navigation/toNaviUp", null, { root: true });
      }

      switch (state.funcNum) {
        case 0: // backToSubMenu2
        dispatch("learning/notLearningChapter", null, { root: true });
          break;
        case 1: // backToSubSecMenu
          dispatch("learning/removeSubAndSec", null, { root: true });
          commit("learning/openingSubMenu", -1, { root: true });
          break;
        case 2: // backToSubMenu3
          commit("navigation/bigNavi", null, { root: true });
          commit("navigation/showNavi", null, { root: true });
          commit("navigation/toggleMiniIcon", null, { root: true });
          commit("games/cleanGameType", null, { root: true });
          break;
        case 3: // backToSubMenu1
          commit("navigation/bigNavi", null, { root: true });
          commit("navigation/showNavi", null, { root: true });
          commit("navigation/toggleMiniIcon", null, { root: true });
          break;
        default:
      }

      await commit("playBackFunc");
      commit("closeBackFunc");

      commit("setReturningFunc", state.funcNum - 1);
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
