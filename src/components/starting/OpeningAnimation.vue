<template>
  <transition-group name="fade" appear>
    <div ref="images" v-if="!disappear">
      <img v-for="(image, index) in images" :key="index" :class="image" :src="getImgUrl(image)" /><br />
    </div>
  </transition-group>
</template>

<script>
export default {
  name: "OpeningAnimation",
  props: ["timeForScreen"],
  data() {
    return {
      images: ["bhd-logo", "STB-logo", "solider"],
      timeToClose: this.timeForScreen - 300,
      disappear: false,
    };
  },
  methods: {
    getImgUrl(img) {
      return require("@/assets/media1/openingScreen/" + img + ".png");
    },
  },
  mounted() {
    setTimeout(() => {
      this.disappear = true;
    }, this.timeToClose);
  },
};
</script>

<style>
.STB-logo {
  height: 30vh;
  margin: 4vh;
}

.solider {
  height: 30vh;
  margin-top: 10vh;
  filter: sepia(30%);
  filter: grayscale(80%);
  filter: contrast(45%);
}

.wave1 {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 140%;
  height: 35vh;
  z-index: -1;
}
</style>
