// modules/navigation

export default {
  namespaced: true,
  state: {
    naviUp: false,
    bigNavi: true,
    showNavi: true,
    stage: 2,
    miniIcon: false, // left top corner mini icon
  },

  mutations: {
    showNavi(state) {
      state.showNavi = true;
    },

    hideNavi(state) {
      state.showNavi = false;
    },

    toggleNavi(state) {
      state.showNavi = !state.showNavi;
    },

    toggleMiniIcon(state) {
      state.miniIcon = !state.miniIcon;
    },

    ///////////////

    toNaviUp(state) {
      state.naviUp = true;
    },

    toggleNaviSize(state) {
      state.bigNavi = !state.bigNavi;
    },

    smallNavi(state) {
      state.bigNavi = false;
    },

    bigNavi(state) {
      state.bigNavi = true;
    },

    setStage(state, stage) {
      state.stage = stage;
    },

    resetStage(state) {
      state.stage = 2;
    },
  },
};
