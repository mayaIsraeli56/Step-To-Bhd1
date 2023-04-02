<template>
  <div>
    <img
      class="starting-pg"
      ref="waveImg"
      src="@/assets/media1/openingScreen/wave1.png"
    />
    <img
      id="wave2"
      class=""
      ref="waveImg2"
      src="@/assets/media1/openingScreen/dark-wave-back.png"
    />
  </div>
</template>

<script>
export default {
  name: "ConnectingUsers",
  props: ["signOption", "openingTime"],
  data() {
    return {
      lastChosen: null,
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.waveImg.className = "";
      this.$refs.waveImg.classList.add("to-opting-pg");
    }, this.openingTime);
  },
  watch: {
    signOption() {
      let classWave1 = "";
      let classWave2 = "";

      if (this.lastChosen) {
        if (this.signOption == "sign-in") {
          classWave1 = "wave-anim-u-r";
          classWave2 = "wave2-anim-u-r";
        } else {
          classWave1 = "wave-anim-d-r";
          classWave2 = "wave2-anim-d-r";
        }
      } else {
        if (this.signOption == "sign-in") {
          classWave1 = "wave-anim-d";
          classWave2 = "wave2-anim-d";
        } else {
          classWave1 = "wave-anim-u";
          classWave2 = "wave2-anim-u";
        }
      }

      this.$refs.waveImg.className = " ";
      this.$refs.waveImg2.className = " ";
      this.$refs.waveImg.classList.add(classWave1);
      this.$refs.waveImg2.classList.add(classWave2);
      this.lastChosen = this.signOption;
    },
  },
};
</script>

<style scoped>
img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  left: 0;
}

.starting-pg {
  top: 10%;
  left: 10%;
  transform: rotate(20deg) scale(150%);
  opacity: 0.4;
}

@keyframes from-opening {
  0% {
    top: 10%;
    left: 10%;
    opacity: 0.4;
    transform: rotate(20deg) scale(150%);
  }

  100% {
    top: 0;
    opacity: 1;
    transform: rotate(0deg);
    left: 0;
    width: 100%;
  }
}

.to-opting-pg {
  animation: from-opening 0.5s ease-out forwards;
}

@keyframes slide-down {
  0% {
    top: 0;
    transform: rotate(0deg);
    left: 0;
    width: 100%;
  }

  100% {
    top: 30%;
    left: 5%;
    transform: scaleX(130%) rotate(10deg);
  }
}

@keyframes slide-up {
  0% {
    top: 0;
    left: 0;
    width: 100%;
  }

  100% {
    top: -100%;
  }
}

@keyframes slide-up2 {
  0% {
    top: 85%;
  }

  60% {
    transform: scaleX(160%) rotate(10deg);
  }

  100% {
    top: 0vh;
    transform: scaleX(100%) rotate(0deg);
  }
}

#wave2 {
  top: 100%;
}

.wave-anim-d {
  animation: slide-down 1s ease-in-out forwards;
}
.wave-anim-u {
  animation: slide-up 2s ease-in-out forwards;
}

.wave2-anim-u {
  animation: slide-up2 2s ease-in-out forwards;
}

.wave-anim-d-r {
  top: 30%;
  left: 5%;
  transform: scaleX(130%) rotate(10deg);
  animation: slide-down-r 2s ease-in-out forwards;
}
.wave2-anim-d-r {
  top: 100%;
  animation: slide2-down-r 2s ease-in-out forwards;
}
.wave-anim-u-r {
  top: -100%;
  animation: slide-up-r 2s ease-in-out forwards;
}

.wave2-anim-u-r {
  top: 0;
  animation: slide-up2-r 2s ease-in-out forwards;
}

@keyframes slide-down-r {
  0% {
    top: 30%;
    left: 5%;
    transform: scaleX(130%) rotate(10deg);
  }

  100% {
    top: -100%;
    transform: rotate(0deg);
    left: 0;
    width: 100%;
  }
}

@keyframes slide-up-r {
  0% {
    top: -100%;
  }

  100% {
    top: 30%;
    left: 5%;
    transform: scaleX(130%) rotate(10deg);
  }
}

@keyframes slide-up2-r {
  0% {
    top: 0;
    transform: scaleX(100%) rotate(0deg);
  }

  60% {
    transform: scaleX(160%) rotate(10deg);
  }

  100% {
    top: 100%;
  }
}

@keyframes slide2-down-r {
  0% {
    top: 100%;
    transform: scaleX(100%) rotate(0deg);
  }

  60% {
    transform: scaleX(160%) rotate(10deg);
  }

  100% {
    top: 0;
  }
}
</style>
