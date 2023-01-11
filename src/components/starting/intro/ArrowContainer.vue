<template>
  <div class="arrow-container animate__animated" ref="arrowContainer">
    <ArrowAnimation :deg="180"></ArrowAnimation>
    <div class="animate__animated" ref="orDiv">או</div>
    <ArrowAnimation :deg="0"></ArrowAnimation>
  </div>
</template>

<script>
import ArrowAnimation from "./ArrowAnimation.vue";
import "animate.css";

export default {
  name: "ArrowContainer",
  props: ["signOption"],
  components: {
    ArrowAnimation,
  },
  data() {
    return {
      isWatching: true,
    };
  },
  created() {
    const unwatch = this.$watch('signOption', () => {
      this.$refs.arrowContainer.classList.add("animate__fadeOut");
      if (this.signOption === "sign-in") {
        this.$refs.arrowContainer.classList.add("signs-animation-d");
        this.$refs.orDiv.classList.add("signs-animation-d");
      } else {
        this.$refs.orDiv.classList.add("signs-animation-u");
        this.$refs.arrowContainer.classList.add("signs-animation-u");
      }
      unwatch()
    })
  },
};
</script>

<style scoped>
.arrow-container {
  position: absolute;
  width: 25vw;
  margin: 3vh 0;
  height: 94vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  left: 0vw;
}

.arrow-container > div {
  font-weight: bold;
  font-size: 4vh;
}
.signs-animation-d {
  animation: slide-fade-txt-d 1s ease-in-out forwards;
}
.signs-animation-u {
  animation: slide-fade-txt-u 1s ease-in-out forwards;
}
</style>
