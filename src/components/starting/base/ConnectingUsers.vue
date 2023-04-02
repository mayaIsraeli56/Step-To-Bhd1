<template>
  <swipe-area @optionChosen="onTouch"></swipe-area>
  <transition-group name="fade" appear>
    <signs-container v-if="stage" :signOption="signOption"></signs-container>
    <arrow-container v-if="stage" :signOption="signOption"></arrow-container>
    <sign-form v-if="signOption" :signOption="signOption"></sign-form>
  </transition-group>
</template>

<script>
import ArrowContainer from "../intro/ArrowContainer.vue";
import SignsContainer from "../intro/SignsContainer.vue";
import SwipeArea from "./SwipeArea.vue";
import SignForm from "../form/SignForm.vue";

export default {
  name: "ConnectingUsers",
  components: {
    ArrowContainer,
    SignsContainer,
    SwipeArea,
    SignForm,
  },
  props: ["signOption"],
  data() {
    return {
      stage: true,
    };
  },
  emits: ["signOptChanged"],
  methods: {
    onTouch(newSignOption) {
      this.$emit("signOptChanged", newSignOption);
      setTimeout(() => {
        this.stage = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>

.arrow-container {
  position: absolute;
  width: 25%;
  margin: 0;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
