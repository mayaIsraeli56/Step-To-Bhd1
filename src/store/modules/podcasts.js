// modules/podcasts
export default {
  namespaced: true,
  state: {
    chapter: -1,
    subChapter: -1,
  },

  getters: {},

  mutations: {
    setChapter(state, n) {
      state.chapter = n;
    },
    setSubChapter(state, n) {
      state.subChapter = n;
    },
  },

  actions: {
    setChapter({ commit }, chapterNum) {
      commit("setChapter", chapterNum);
    },
    setSubChapter({ commit }, subNum) {
      commit("setSubChapter", subNum);
    },
  },
};
