<template>
  <div class="signs-container" ref="signsContainer">
    <sign-in-up option="signIn" class="animate__animated animate__fadeInDown"></sign-in-up>
    <sign-in-up option="signUp" class="animate__animated animate__fadeInUp"></sign-in-up>
  </div>
</template>

<script>
import SignInUp from "./SignInUp.vue";
import "animate.css";

export default {
  name: "ConnectingUsers",
  props: ["signOption"],
  components: {
    SignInUp,
  },
  data() {
    return {
      isWatching: true,
    };
  },
  created() {
    const unwatch = this.$watch('signOption', () => {
      if (this.signOption == "sign-in") {
        this.$refs.signsContainer.classList.add("signs-animation-d");
      } else {
        this.$refs.signsContainer.classList.add("signs-animation-u");
      }
      unwatch()
    })
  },
};
</script>

<style scoped>
.signs-container {
  position: absolute;
  width: 100vw;
  height: 76vh;
  margin: 12vh 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.signs-animation-d {
  animation: slide-fade-txt-d 1s ease-in-out forwards;
}
.signs-animation-u {
  animation: slide-fade-txt-u 1s ease-in-out forwards;
}
</style>
