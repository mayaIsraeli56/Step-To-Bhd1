<template>
    <div
      class="swipe-area"
      v-touch:swipe.prevent="onTouch"
      v-touch:tap.prevent="onTouch"
      ref="swipeArea"
    ></div>
  </template>
  
  <script>
  
  export default {
    name: "SwipeArea",
    data() {
      return {
        signOption: null,
      };
    },
    methods: {
      onTouch(e) {
        let screenY = e.changedTouches ? e.changedTouches[0].clientY : e;
        if (!this.signOption) {
          if (screenY < window.screen.height / 2 || e == "bottom") {
            this.signOption = "sign-in";
          } else {
            this.signOption = "sign-up";
          }
          this.$refs.swipeArea.classList.add("swipe-area-d");
        } else if (this.signOption === "sign-in") {
          this.signOption="sign-up"
        } else {
          this.signOption="sign-in"
        }
        this.$emit("optionChosen", this.signOption)
      },
    },
  };
  </script>
  
  <style scoped>
  .swipe-area {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 2;
  }
  .swipe-area-d {
    height: 30vh;
    top: 70vh;
  }
  </style>
  