// modules/navigation

export default {
  namespaced: true,
  state: {
    gameType: null,
  },

  getters: {},

  mutations: {
    setGameType(state, gameType) {
      state.gameType = gameType;
    },

    cleanGameType(state) {
      state.gameType = null;
    },
  },

  actions: {
    setGameType({commit}, gameType) {
      commit("setGameType", gameType);
      commit("navigation/smallNavi", null, { root: true });
    },
  },
};
