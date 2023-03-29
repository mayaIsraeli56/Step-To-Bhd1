<template>
  <div>
    <img :src="getImgUrl(logoNum)" />
    <h2>{{text[logoNum]}}</h2>
  </div>
</template>

<script>
export default {
  name: "HomeSwiperSlide",
  props: ["logoNum"],
  data() {
    return {
      icons: ["people", "exam", "book", "play", "microphone"],
      text: ["אנשים", "בחנים", "מקראות", "משחקים", "הסכתים"],
    };
  },
  methods: {
    getImgUrl(num) {
      return require("@/assets/media1/HomePage/icons-nevi/" + this.icons[num] + ".png");
    },
  },
};
</script>

<style scoped>
h2 {
  position: relative;
  color: var(--ion-color-medium);
  font-size: x-large !important;
  margin-top: 5%;
  text-shadow: none;
}

img {
  position: relative;
  transform: scale(80%);
  margin-top: 30%;
  transition: 0.3s;
}
</style>
