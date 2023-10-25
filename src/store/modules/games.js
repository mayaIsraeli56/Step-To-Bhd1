// modules/navigation
// gameType: 1- cards, 2- time, 3- trivia, 4- think, 5- exam
export default {
  namespaced: true,
  state: {
    gameType: null,
    chosenChapters: [],
    // test
    _questNum: -1,
    testAnswers: [
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
      { correct: -1, picked: -1 },
    ],
  },

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

    updateCorrectAns(state, correct) {
      state.testAnswers.forEach((ques, i) => (ques.correct = correct[i]));
    },

    updatePickedAns(state, update) {
      state.testAnswers[state._questNum].picked = update.hisAnswer;
    },

    updatequestNum(state, num) {
      state._questNum = num;
    },

    resetPicked(state) {
      state.testAnswers.forEach((ques) => (ques.picked = -1));
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

    // test
    updateCorrectAns({ commit }, correct) {
      commit("updateCorrectAns", correct);
    },

    updatePickedAns({ commit }, update) {
      commit("updatePickedAns", update);
    },

    updatequestNum({ commit }, num) {
      commit("updatequestNum", num);
    },

    resetPicked({ commit }) {
      commit("resetPicked");
    },

    exitTest({commit}) {
      commit("cleanGameType");
      commit("updatequestNum", -1);
      commit("resetPicked");
    },

    exitGame({commit}) {
      commit("cleanGameType");
      commit("updatequestNum", -1);
    },
  },
};
