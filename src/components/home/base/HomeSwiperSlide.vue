<template>
  <img :src="getImgUrl(logoNum)" />
  <h2>{{ text[logoNum] }}</h2>
</template>

<script>
export default {
  name: "HomeSwiperSlide",
  props: ["logoNum"],
  data() {
    return {
      text: ["הגדרות", "בחנים", "מקראות", "משחקים", "הסכתים", "על הבה\"ד"],
    };
  },
  methods: {
    getImgUrl(num) {
      return require("@/assets/media1/HomePage/icons-nevi/" + num + ".png");
    },
  },
};
</script>

<style scoped>
h2 {
  position: absolute;
  color: var(--ion-color-medium);
  font-size: 80% !important;
  text-shadow: none;
  top: 90%;
}

img {
  position: relative;
  transform: scale(80%);
  transition: 0.3s;
  top: -5%;
}

@media only screen and (max-height: 600px) {
  h2 {
    font-size: 70% !important;
  }
}

@media only screen and (max-height: 400px) {
  h2 {
    margin-top: 10%;
    font-size: 50% !important;
  }
}

@media only screen and (min-height: 900px) {
  h2 {
    margin-top: 15%;
    font-size: 130% !important;
  }
}
</style>
