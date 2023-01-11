<template>
    <div>
      <img src="@/assets/media1/openingScreen/arrow7.gif" :style="style" />
    </div>
  </template>
  
  <script>
  export default {
    name: "ArrowAnimation",
    props: ["deg"],
    computed: {
      style() {
        return { transform: "rotate(" + this.deg + "deg)" };
      },
    },
  };
  </script>
  
  <style scoped>
  img {
    animation-name: bounceAlpha;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    width: 100%;
  }
  
  @keyframes bounceAlpha {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  </style>
  