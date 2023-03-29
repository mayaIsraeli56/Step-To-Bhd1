<template>
  <swiper
    :slidesPerView="perView"
    :spaceBetween="spaceBet"
    :centeredSlides="true"
    :initialSlide="2"
    :slideToClickedSlide="true"
    class="mySwiper homeSwiper"
    ref="mySwiper"
    @slideChange="swiperChange($event, 'change')"
    @click="swiperChange($event, 'click')"
  >
    <swiper-slide v-for="n in slideNum" :key="n" :class="'slide' + n">
      <home-swiper-slide :logoNum="n - 1"> </home-swiper-slide>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import HomeSwiperSlide from "./HomeSwiperSlide.vue";
import { toRaw } from "vue";

import "swiper/css";

export default {
  name: "HomeNavigation",
  components: {
    Swiper,
    SwiperSlide,
    HomeSwiperSlide,
  },

  data() {
    return {
      swiperChanged: 0,
      swiperClicked: false,
      swiper: null,
      perView: 3,
      spaceBet: 5,
      slideNum: 5,
      activeIndex: null,
      opacity: true,
    };
  },

  methods: {
    swiperChange(e, type) {
      if (type == "click" || this.swiperClicked) {
        this.swiperClicked = true;
        this.swiperChanged++;
        this.activeIndex = toRaw(e).activeIndex;

        if (this.swiperChanged >= 0) {
          this.swiperChanged == 1 ? this.naviAnim() : "";
          this.$emit("swiper-changed", this.activeIndex);
        }
      }
    },

    naviAnim() {
      let swiper = this.$refs.mySwiper.$el;
      swiper.style.transition = "0.7s ease";
      swiper.style.marginTop = "-8vh";

      for (let i = 1; i < this.slideNum + 1; i++) {
        this.$el.querySelector(`.slide${i}`).style.scaleX = "20%";
        this.$el.querySelector(`.slide${i}`).style.height = "45%";
        this.$el.querySelector(`.slide${i}`).style.transition = "1s";
      }
      this.slideAnim();
    },

    slideAnim() {
      for (let i = 1; i < this.slideNum + 1; i++) {
        this.$el.querySelector(`.slide${i}`).style.top = "0";
        this.$el.querySelector(`.slide${i}`).style.transition = "0.5s";
      }
    },
  },

  mounted() {
    this.$watch("activeIndex", () => {
      this.opacity = false;
      this.slideAnim();
    });

    if (this.$store.state.naviUp) this.naviAnim();
  },
};
</script>

<style scoped>
.swiper {
  position: relative;
  margin-top: 15%;
  width: 100%;
  height: 35%;
}

.swiper-slide {
  text-align: center;
  background: var(--ion-color-secondary-contrast);
  border-radius: 100%;
  height: 48%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 0.3s;
}

.swiper-slide:not(.swiper-slide-active) {
  transform: scale(80%);
  opacity: 0;
  animation: fade 0.7s ease-out 0.3s forwards;
}

.swiper-slide-next,
.swiper-slide-prev {
  opacity: 0;
  animation: fade 1s ease-out 0.3s forwards;
}

.swiper-slide-active {
  opacity: 0;
  animation: fade 1s ease-out 0.3s forwards;
  transform: translateY(20%);
  font-size:  large;
}

.up {
  transform: translateY(0%);
}
</style>
