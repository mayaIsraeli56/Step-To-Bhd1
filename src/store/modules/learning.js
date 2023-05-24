// modules/learning

export default {
  namespaced: true,
  state: {
    learnChapter: null,
    learnSec: null,
    learnSubSec: null,
    naviUp: false,
    openMe: "",
    subChapter: 0,
    bookmark: [],
  },

  getters: {},

  mutations: {
    changeChapter(state, activeIndex) {
      state.learnChapter = activeIndex;
    },

    removeSubAndSec(state) {
      state.learnSec = null;
      state.learnSubSec = null;
    },

    changeSec(state, sec) {
      state.learnSec = sec;
    },

    changeSubSec(state, subsec) {
      state.learnSubSec = subsec;
    },

    notLearningChapter(state) {
      state.learnChapter = null;
    },

    toNaviUp(state) {
      state.naviUp = true;
    },

    toOpen(state, componentName) {
      state.openMe = componentName;
    },

    toggleBookMark(state, chapterToAdd) {
      let index = state.bookmark.indexOf(chapterToAdd);

      if (index == -1) state.bookmark.push(chapterToAdd);
      else state.bookmark.splice(index, 1);
    },
  },

  actions: {},
};
