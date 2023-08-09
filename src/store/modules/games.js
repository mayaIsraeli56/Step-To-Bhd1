// modules/navigation
// gameType: 1- cards, 2- time, 3- trivia, 4- think, 5- exam
export default {
  namespaced: true,
  state: {
    gameType: null,
    chosenChapters: [],
  },

  getters: {},

  mutations: {
    setGameType(state, gameType) {
      state.gameType = gameType;
    },

    cleanGameType(state) {
      state.gameType = null;
      state.chosenChapters = [];
    },

    addOrRemoveChap(state, chapterNum) {
      if (state.chosenChapters.includes(chapterNum)) {
        state.chosenChapters.splice(
          state.chosenChapters.indexOf(chapterNum),
          1
        );
      } else {
        let i = 0;
        while (state.chosenChapters[i] < chapterNum) i++;
        state.chosenChapters.splice(i, 0, chapterNum);
      }
    },
  },

  actions: {
    setGameType({ commit }, gameType) {
      commit("setGameType", gameType);
      commit("navigation/smallNavi", null, { root: true });
    },

    addOrRemoveChap({ commit }, chapterNum) {
      commit("addOrRemoveChap", chapterNum);
    },
  },
};
