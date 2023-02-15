<template>
  <transition-group name="fade" appear>
    <div ref="images" v-if="!disappear">
      <img
        v-for="(image, index) in images"
        :key="index"
        :class="image"
        :src="getImgUrl(image)"
      /><br />
    </div>
  </transition-group>

  <transition name="fade" appear>
    <img
      :src="require('@/assets/media1/openingScreen/solider-animate.gif')"
      class="anim"
      v-if="!disappear"
    />
  </transition>
</template>

<script>
export default {
  name: "OpeningAnimation",
  props: ["timeForScreen"],

  data() {
    return {
      images: ["bhd-logo", "STB-logo"],
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

<style scoped>
.bhd-logo {
  display: block;
  margin: auto;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.STB-logo {
  height: 28vh;
  margin: 3vh;
}

.wave1 {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 140%;
  height: 35vh;
  z-index: -1;
}

.anim {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 70vh;
}
</style>
