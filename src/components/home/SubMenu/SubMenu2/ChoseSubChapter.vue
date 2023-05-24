<template>
  <chose-sub-top ></chose-sub-top>
  <sub-sec-menu></sub-sec-menu>
</template>
<script>
import SubSecMenu from "./SubSecMenu.vue";
import ChoseSubTop from "./ChoseSubTop";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ChoseSubChapter",
  components: { SubSecMenu, ChoseSubTop},

  computed: {
    ...mapState("learning", ["learnSubSec"]),
    ...mapState("returning", ["backToSubMenu2"]),
  },

  methods: {
    ...mapMutations("learning", ["notLearningChapter", "toNaviUp"]),
    ...mapMutations("returning", ["closeBackFunc"]),
    ...mapActions("returning", ["setReturningFunc"]),
  },

  mounted() {
    this.setReturningFunc(0);
  }
};
</script>

