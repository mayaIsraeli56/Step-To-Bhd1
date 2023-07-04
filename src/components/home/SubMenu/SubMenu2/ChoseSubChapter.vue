<template>
  <chose-sub-top></chose-sub-top>
  <sub-sec-menu></sub-sec-menu>
</template>
<script>
import SubSecMenu from "./SubSecMenu.vue";
import ChoseSubTop from "./ChoseSubTop";
import { mapActions } from "vuex";

export default {
  name: "ChoseSubChapter",
  components: { SubSecMenu, ChoseSubTop },

  methods: {
    ...mapActions("returning", ["setReturningFunc"]),
  },

  mounted() {
    this.setReturningFunc(0);
  },
};
</script>
