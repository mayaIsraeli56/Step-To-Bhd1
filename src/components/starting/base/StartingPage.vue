<template>
  <opening-animation v-if="!toClose" :timeForScreen="timeForScreen">
  </opening-animation>
  <connecting-users
    :signOption="signOption"
    v-else
    @signOptChanged="changeSignOpt"
  >
  </connecting-users>
  <background-animation
    :signOption="signOption"
    :openingTime="timeForScreen"
  ></background-animation>
</template>

<script>
import OpeningAnimation from "./OpeningAnimation.vue";
import ConnectingUsers from "./ConnectingUsers.vue";
import BackgroundAnimation from "./BackgroundAnimation.vue";
import { mapMutations } from "vuex";

export default {
  name: "StartingPages",
  components: {
    OpeningAnimation,
    ConnectingUsers,
    BackgroundAnimation,
  },
  data() {
    return {
      toClose: false,
      timeForScreen: 5000,
      signOption: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.toClose = true;
    }, this.timeForScreen);
  },
  methods: {
    ...mapMutations("users", ["updateSignOption"]),

    changeSignOpt(signOption) {
      this.updateSignOption(signOption);
      this.signOption = signOption;
    },
  },
};
</script>
