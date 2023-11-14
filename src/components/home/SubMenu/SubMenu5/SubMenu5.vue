<template>
  <transition name="fade" appear>
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
        :initialSlide="0"
        :pagination="true"
        :modules="modules"
        class="mySwiper mySwiperCards"
      >
        <swiper-slide v-for="n in 8" :key="n">
          <ion-img
            :src="require(`@/assets/media1/HomePage/cards/${n}.png`)"
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
  </transition>
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
  components: {
    Swiper,
    SwiperSlide,
    IonText,
    IonImg,
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
  top: -10%;
  height: 65%;
  padding-bottom: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.txt2 {
  margin-top: 5%;
}
.swiper {
  width: 100%;
  height: 60%;
  transform: scale(120%);
}

.swiper-slide {
  border-radius: 10%;
}

ion-img {
  width: 100%;
  height: 100%;
  border-radius: 3dvh;
  object-fit: fill;
}

.credit {
  font-size: 1rem;
  text-decoration: underline;
}
</style>

<style>
.mySwiperCards > .swiper-pagination-bullets {
  direction: ltr;
}
</style>
