import { createStore } from "vuex";

export default createStore({
  state: {
    learnChapter: null,
    naviUp:false,
    openMe: "",
    subChapter: 0,
  },
  getters: {
  },
  mutations: {
    changeSubChapter(state, activeIndex) {
      state.learnChapter = activeIndex;
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
  },

  actions: {},

  modules: {},
});
