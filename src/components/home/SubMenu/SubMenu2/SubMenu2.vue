<template>
  <sub-menu-swiper
    :parent="2"
    :slidesNum="slidesNum"
    @chapterChosen="openChapter"
    v-if="!openSubChapters"
  >
    <slot
      ><swiper-slide
        v-for="n in this.ChapterInfo.length"
        :key="n"
        :class="'slide' + n"
        ref="slide"
      >
        <div class="circle">{{ n }}</div>
        <div class="title">{{ this.ChapterInfo[n - 1].title }}</div>
        <div class="text">{{ this.ChapterInfo[n - 1].text }}</div>
      </swiper-slide></slot
    >
  </sub-menu-swiper>
  <chose-sub-chapter
    v-if="openSubChapters"
    @backToSubMenu="backToSubMenu"
  ></chose-sub-chapter>
</template>

<script>
import SubMenuSwiper from "../SubMenuSwiper.vue";
import { SwiperSlide } from "swiper/vue";
import ChapterInfo from "@/json/ChapterInfo";
import ChoseSubChapter from "./ChoseSubChapter.vue";

export default {
  name: "SubMenu2",
  components: { SubMenuSwiper, SwiperSlide, ChoseSubChapter },

  data() {
    return {
      slidesNum: null,
      ChapterInfo: ChapterInfo,
      openSubChapters: false,
      subchapter: null,
      animated: true,
    };
  },

  created() {
    this.slidesNum = this.ChapterInfo.length;
  },
  
  methods: {
    openChapter() {
      this.openSubChapters = true;
    },
    backToSubMenu() {
      this.openSubChapters = false;
      this.$store.commit("notLearningChapter");
      this.$store.commit("toNaviUp");
    },
  },
};
</script>

<style scoped>
.swiper-slide {
  background-color: #fafafa;
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
  top: -6vh;
  background-color: var(--ion-color-secondary-tint);
  height: 12vh;
  width: 12vh;
  border-radius: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1.5vh;
  font-size: 3.5vh;
  font-weight: 700;
  color: var(--ion-color-medium);
  text-shadow: none;
}

.title {
  position: relative;
  top: -7vh;
  width: 100%;
  height: 10vh;
  padding: 3vh;
  color: var(--ion-color-medium);
  text-shadow: none;
  font-weight: 700;
  font-size: 3vh;
  border-bottom: solid 1vh var(--ion-color-secondary-tint);
}

.text {
  position: relative;
  transform: translateY(-17%);
  font-size: 2.5vh;
  padding: 2%;
  color: var(--ion-color-medium);
  text-shadow: none;
  width: 90%;
  height: 25vh;
  font-weight: 500;
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
