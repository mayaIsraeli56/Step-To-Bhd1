<template>
  <sub-menu-swiper
    :parent="2"
    :slidesNum="slidesNum"
    @chapterChosen="openChapter"
    v-if="!openSubChapters"
    class="sub-menu2-swiper"
  >
    <slot
      ><swiper-slide
        v-for="n in this.ChapterInfo.length"
        :key="n"
        :class="'slide' + n"
        ref="slide"
      >
        <ion-img
          :src="require('@/assets/media1/HomePage/bookmark.png')"
          :key="0"
          class="bookmark"
        ></ion-img>
        <div class="circle">{{ n }}</div>
        <div class="title">{{ this.ChapterInfo[n - 1].title }}</div>
        <div class="text">{{ this.ChapterInfo[n - 1].text }}</div>
      </swiper-slide></slot
    >
  </sub-menu-swiper>
  <chose-sub-chapter v-if="openSubChapters"></chose-sub-chapter>
</template>

<script>
import { IonImg } from "@ionic/vue";
import { SwiperSlide } from "swiper/vue";
import SubMenuSwiper from "../SubMenuSwiper.vue";

import ChapterInfo from "@/json/chapters/ChapterInfo";
import ChoseSubChapter from "./ChoseSubChapter.vue";

import { mapState, mapMutations } from "vuex";


export default {
  name: "SubMenu2",
  components: { IonImg, SubMenuSwiper, SwiperSlide, ChoseSubChapter },

  data() {
    return {
      slidesNum: null,
      ChapterInfo: ChapterInfo,
      openSubChapters: false,
      subchapter: null,
      animated: true,
    };
  },

  computed: {
    ...mapState("returning", ["backToSubMenu2"]),
  },

  created() {
    this.slidesNum = this.ChapterInfo.length;
  },

  methods: {
    ...mapMutations("navigation", ["toNaviUp"]),

    openChapter() {
      this.openSubChapters = true;
    },
  },

  watch: {
    backToSubMenu2: {
      handler() {
        if (this.backToSubMenu2) {
          this.openSubChapters = false;
        }
      },
    },
  },
};
</script>

<style scoped>
.swiper-slide {
  background-color: var(--ion-white);
  height: 90%;
  border-radius: 7%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

.swiper {
  margin-top: -6%;
}

.circle {
  position: relative;
  top: -6dvh;
  background-color: var(--ion-color-secondary-tint);
  height: 12dvh;
  width: 12dvh;
  border-radius: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.5dvh;
  font-size: 3.5dvh;
  font-weight: 700;
  color: var(--ion-color-medium);
  text-shadow: none;
}

.bookmark {
  position: absolute;
  height: 8%;
  left: 10%;
}

.title {
  position: relative;
  top: -7dvh;
  width: 100%;
  height: 10dvh;
  padding: 3dvh;
  color: var(--ion-color-medium);
  text-shadow: none;
  font-weight: 700;
  font-size: 3dvh;
  border-bottom: solid 1dvh var(--ion-color-secondary-tint);
}

.text {
  position: relative;
  transform: translateY(-17%);
  font-size: 2.5dvh;
  padding: 2%;
  color: var(--ion-color-medium);
  text-shadow: none;
  width: 90%;
  height: 25dvh;
  font-weight: 500;
}

.sub-menu2-swiper {
  animation: fade-scale 0.7s 1 forwards;
}
</style>

<style>
.swiper-pagination {
  position: relative;
  top: 0;
}

.swiper-pagination-bullet-active {
  margin-top: 10dvh;
  background-color: var(--ion-color-primary);
}
</style>
