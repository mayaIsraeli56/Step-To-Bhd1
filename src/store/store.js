import { createStore } from "vuex";

export default createStore({
  state: {
    learnChapter: null,
    naviUp:false
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
  },

  actions: {},

  modules: {},
});
