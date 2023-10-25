// modules/learning

export default {
  namespaced: true,
  state: {
    learnChapter: null,
    learnSec: null,
    learnSubSec: null,
    openSubMenu: -1,
    lastChapter: 0,
    bookmark: [],
  },

  mutations: {
    ////////////////Chapter////////////////
    changeChapter(state, activeIndex) {
      state.learnChapter = activeIndex;
    },

    notLearningChapter(state) {
      state.lastChapter = state.learnChapter;
      state.learnChapter = null;
    },

    ////////////////Sec////////////////

    changeSec(state, sec) {
      state.learnSec = sec;
    },

    ////////////////Sub////////////////
    removeSubAndSec(state) {
      state.learnSec = null;
      state.learnSubSec = null;
    },

    changeSubSec(state, subsec) {
      state.learnSubSec = subsec;
    },

    ////////////////Other////////////////
    openingSubMenu(state, sub) {
      state.openSubMenu = sub;
    },

    toggleBookMark(state, chapterToAdd) {
      let index = state.bookmark.indexOf(chapterToAdd);

      if (index == -1) state.bookmark.push(chapterToAdd);
      else state.bookmark.splice(index, 1);
    },
  },

  actions: {
    changeChapter({ commit }, activeIndex) {
      commit("changeChapter", activeIndex);
      commit("navigation/hideNavi", null, { root: true });
    },

    notLearningChapter({ commit }) {
      commit("notLearningChapter");
      commit("navigation/showNavi", null, { root: true });
    },

    changeSubSec({ commit }, subsec) {
      commit("changeSubSec", subsec);
      commit("navigation/smallNavi", null, { root: true });
    },

    removeSubAndSec({ commit }) {
      commit("removeSubAndSec");
      commit("navigation/bigNavi", null, { root: true });
    },
  },
};
