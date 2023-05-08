<template>
  <chose-sub-top @backToSubMenu="$emit('backToSubMenu')" ></chose-sub-top>
  <sub-sec-menu></sub-sec-menu>
</template>
<script>
import SubSecMenu from "./SubSecMenu.vue";
import ChoseSubTop from "./ChoseSubTop";
import { mapState } from "vuex";

export default {
  name: "ChoseSubChapter",
  emits: ["backToSubMenu"],
  components: { SubSecMenu, ChoseSubTop},

  computed: {
    ...mapState("learning", ["learnSubSec"]),
  },
};
</script>

