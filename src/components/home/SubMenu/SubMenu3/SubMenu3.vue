<template>
  <div class="games">
    <ion-text class="text-dark-plain note"
      >בחרו את הפרקים אותם תרצו לתרגל</ion-text
    >

    <div class="box">
      <div class="blue-circle text-dark-plain" v-for="n in noChapters" :key="n" @click="choseChap(n)">
        {{ n }}
      </div>
    </div>
    <ion-text class="character-name">xxxxxxxxxxxxxxxxxxxx</ion-text>
    <sub-menu-swiper
      :parent="2"
      :slidesNum="slidesNum"
      @chapterChosen="openChapter"
      v-if="!openSubChapters"
    >
      <slot
        ><swiper-slide
          v-for="n in this.GamesInfo.length"
          :key="n"
          :class="'slide' + n"
          ref="slide"
        >
          <div class="circle">{{ n }}</div>
          <div class="title">{{ this.GamesInfo[n - 1].title }}</div>
          <div class="text">{{ this.GamesInfo[n - 1].text }}</div>
        </swiper-slide></slot
      >
    </sub-menu-swiper>
  </div>
</template>

<script>
import SubMenuSwiper from "../SubMenuSwiper.vue";
import { SwiperSlide } from "swiper/vue";
import GamesInfo from "@/json/GamesInfo.json";
import { IonText } from "@ionic/vue";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "SubMenu3",
  components: { SubMenuSwiper, SwiperSlide, IonText },

  data() {
    return {
      slidesNum: null,
      GamesInfo: GamesInfo,
      noChapters: 10,
    };
  },

  computed: {
    ...mapState("returning", ["backToSubMenu2"]),
  },

  created() {
    this.slidesNum = this.GamesInfo.length;
  },

  methods: {

    choseChap(noChap) {
      console.log(noChap);
    },
  },

  watch: {
    backToSubMenu3: {
      handler() {
        if (this.backToSubMenu2 == true) {
          this.openSubChapters = false;
          this.notLearningChapter();
          this.toNaviUp();
        }
      },
    },
  },
};
</script>

<style scoped>
.swiper-slide {
  background-color: #fafafa;
  border-radius: 7%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 7%;
}

.circle {
  position: relative;
  top: -5vh;
  background-color: var(--ion-color-secondary-tint);
  height: 10vh;
  width: 10vh;
  border-radius: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1vh;
  font-size: 3.5vh;
  font-weight: 700;
  color: var(--ion-color-medium);
  text-shadow: none;
}

.title {
  position: relative;
  top: -7vh;
  width: 100%;
  height: 9vh;
  padding: 3vh;
  color: var(--ion-color-medium);
  text-shadow: none;
  font-weight: 700;
  font-size: 3vh;
  border-bottom: solid 1vh var(--ion-color-secondary-tint);
}

.text {
  position: relative;
  transform: translateY(-70%);
  font-size: 80%;
  padding: 0%;
  color: var(--ion-color-medium);
  text-shadow: none;
  width: 90%;
  height: 6vh;
  font-weight: 500;
}

.blue-circle {
  background: var(--ion-color-primary-tint-light);
  height: 5.5vh;
  width: 5.5vh;
  margin: 1%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100%;
  font-weight: 800;
}

.box {
  display: grid;
  width: 100%;
  height: fit-content;
  padding: 5% 10%;
  align-self: center;
  grid-template-columns: auto auto auto auto auto;
  row-gap: 10%;
  column-gap: 0%;
  margin-bottom: 3%;
  align-items: center;
  justify-items: center;
}

.character-name {
  color: var(--ion-color-primary-tint);
  text-shadow: none;
}
.note {
  position: relative;
  font-size: 80%;
  opacity: 0.8;
}

.games {
  position: relative;
  top: -7%;
}
</style>

<style>
.swiper-pagination {
  position: relative;
  top: 0;
}

.swiper-pagination-bullet-active {
  margin-top: 10vh;
  background-color: var(--ion-color-primary);
}
</style>
