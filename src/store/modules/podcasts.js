// modules/podcasts

const MAX_SUB = [3, 5, 19, 8, 10, 7, 5, 1, 4, 3, 6] // num of subchapters in each chaper
export default {
  namespaced: true,
  state: {
    chapter: -1,
    subChapter: -1,
    timingMenu: false,
    newTime: -1,
  },

  getters: {},

  mutations: {
    setChapter(state, n) {
      state.chapter = n;
    },
    setSubChapter(state, n) {
      state.subChapter = n;
    },
    toggleTimingMenu(state) {
      state.timingMenu = !state.timingMenu;
    },
    updateTime(state,time) {
      state.newTime = time;
    },

    finishUpdateTime(state) {
      state.newTime = -1;
    },
  },

  actions: {
    setChapter({ commit }, chapterNum) {
      commit("setChapter", chapterNum);
    },
    setSubChapter({ commit }, subNum) {
      commit("setSubChapter", subNum);
    },

    // change sub and chapter (if needed) to the next in the playlist
    nextPodcast({ commit, state }) {
      if (state.subChapter < MAX_SUB[state.chapter]-1 ) {
        commit("setSubChapter", state.subChapter + 1)
      } else {
        commit("setSubChapter", 0);
        commit("setChapter", state.chapter + 1);
      }
    },

    // change sub and chapter (if needed) to the last in the playlist
    lastPodcast({ commit, state }) {
      if (state.subChapter > 0) { // not first
        commit("setSubChapter", state.subChapter - 1)
      } else {
        commit("setSubChapter", MAX_SUB[state.chapter-1] - 1)
        commit("setChapter", state.chapter - 1);
      }
    },

    toggleTimingMenu({ commit }) {
      commit("toggleTimingMenu");
    },

    updateTime({ commit }, time) {
      commit("updateTime", time);
    },
    finishUpdateTime({ commit }) {
      commit("finishUpdateTime");
    },
  },
};
