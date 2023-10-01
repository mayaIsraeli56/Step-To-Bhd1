<template>
  <div class="on-bhd">
    <div class="text-box">
      <ion-text class="text-dark-plain" color="medium">
        הדרך אל הבה"ד ארוכה, אבל אתם מתקרבים...</ion-text
      >
    </div>
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="2"
      :initialSlide="10"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="n in 7" :key="n">
        <ion-img
          :src="require('@/assets/media1/HomePage/cards/2.png')"
        ></ion-img>
      </swiper-slide>
    </swiper>

    <div class="text-box txt2">
      <ion-text class="text-dark-plain" color="medium">
        "גם מסע בן אלף מייל מתחיל בצעד קטן אחד"</ion-text
      >

      <ion-text class="text-dark-plain credit" color="medium">
        לאו דזה</ion-text
      >
    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards, Pagination } from "swiper";

import { IonText, IonImg } from "@ionic/vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "SubMenu5",
  props: [""],
  components: {
    Swiper,
    SwiperSlide,
    IonText,
    IonImg,
  },

  data() {
    return {};
  },

  methods: {
    async handleSignOut() {
      let auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push({ name: "Start" });
      });
    },
  },
  setup() {
    return {
      modules: [EffectCards, Pagination],
    };
  },
};
</script>

<style scoped>
.on-bhd {
  position: relative;
  top: -7%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.text-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.text-dark-plain {
  font-size: 1.1rem;
}

.swiper {
  width: 100%;
  height: 53%;
}

.swiper-slide {
  border-radius: 3dvh;
  font-weight: bold;
  color: #fff;
}

ion-img {
  object-fit: cover;
}

.credit {
  font-size: 1rem;
  text-decoration: underline;
}

.txt2 {
  margin-top: 5%;
}
.swiper-slide:nth-child(1n) {
  background-color: rgb(206, 17, 17);
}

.swiper-slide:nth-child(2n) {
  background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
  background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
  background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
  background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
  background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
  background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
  background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
  background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
  background-color: rgb(54, 94, 77);
}
</style>
