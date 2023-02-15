<template>
  <SubMenu0 v-if="slideNum===0"></SubMenu0>
  <SubMenu1 v-if="slideNum===1"></SubMenu1>
  <SubMenu2 v-if="slideNum===2"></SubMenu2>
  <SubMenu3 v-if="slideNum===3"></SubMenu3>
  <SubMenu4 v-if="slideNum===4"></SubMenu4>
</template>

<script>
import SubMenu0 from "./SubMenu/SubMenu0.vue";
import SubMenu1 from "./SubMenu/SubMenu1.vue";
import SubMenu2 from "./SubMenu/SubMenu2/SubMenu2.vue";
import SubMenu3 from "./SubMenu/SubMenu3.vue";
import SubMenu4 from "./SubMenu/SubMenu4.vue";

export default {
  name: "HomeSubMenu",
  props: ["slideNum"],
  components: { SubMenu0, SubMenu1, SubMenu2, SubMenu3, SubMenu4 },

  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
