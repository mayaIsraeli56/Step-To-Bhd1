<template>
  <div class="games" v-if="gameType == null">
    <ion-text class="text-dark-plain note animate__animated" ref="note"
      >בחרו את הפרקים אותם תרצו לתרגל</ion-text
    >

    <chose-chaptes-circels
      :explanation="[]"
      :noCircles="noChapters"
      :circlesInfo="circlesInfo"
      :chooseOne="false"
      @circlesChosen="circlesChosen"
    ></chose-chaptes-circels>

    <sub-menu-swiper :parent="3" :slidesNum="slidesNum">
      <slot
        ><swiper-slide
          v-for="n in this.gamesInfo.length"
          :key="n"
          :class="'slide' + n"
          ref="slide"
          @click="choseGame(n)"
        >
          <div class="circle">
            <ion-img
              class="game-icon"
              :src="require(`@/assets/media1/HomePage/games/icons/${n}.png`)"
            ></ion-img>
          </div>
          <div class="title">{{ this.gamesInfo[n - 1].title }}</div>
          <div class="text">{{ this.gamesInfo[n - 1].text }}</div>
        </swiper-slide></slot
      >
    </sub-menu-swiper>
  </div>

  <cards-game v-if="gameType == 1"></cards-game>
  <trivia-game
    v-if="gameType == 3 || gameType == 2"
    :type="gameType"
    :exam="-1"
  ></trivia-game>
  <thinking-game v-if="gameType == 4"></thinking-game>
</template>

<script>
import SubMenuSwiper from "../SubMenuSwiper.vue";
import ThinkingGame from "./Games/ThinkingGame.vue";
import CardsGame from "./Games/CardsGame.vue";
import TriviaGame from "./Games/Trivia/TriviaGame.vue";
import ChoseChaptesCircels from "@/components/reuse/ChoseChaptesCircels.vue";

import { SwiperSlide } from "swiper/vue";
import gamesInfo from "@/json/games/gamesInfo.json";
import ChapterInfo from "@/json/chapters/ChapterInfo";
import { IonText, IonImg } from "@ionic/vue";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "SubMenu3",
  components: {
    SubMenuSwiper,
    SwiperSlide,
    IonImg,
    IonText,
    ThinkingGame,
    CardsGame,
    TriviaGame,
    ChoseChaptesCircels,
  },

  data() {
    return {
      slidesNum: null,
      gamesInfo: gamesInfo,
      ChapterInfo: ChapterInfo,
      circlesInfo: [],
      noChapters: 10,
    };
  },

  computed: {
    ...mapState("returning", ["backToSubMenu3"]),
    ...mapState("games", ["gameType", "chosenChapters"]),
  },

  created() {
    this.slidesNum = this.gamesInfo.length;
    for (let i = 0; i < this.noChapters; i++)
      this.circlesInfo[i] = this.ChapterInfo[i].title;
  },

  methods: {
    ...mapMutations("navigation", ["hideNavi", "toggleMiniIcon"]),
    ...mapActions("games", ["setGameType", "addOrRemoveChap"]),
    ...mapActions("returning", ["setReturningFunc"]),

    choseGame(noGame) {
      if (this.chosenChapters.length == 0) {
        this.$refs.note.$el.classList.add("animate__flash");

        setTimeout(() => {
          this.$refs.note.$el.classList.remove("animate__flash");
        }, 500);
        return;
      }

      setTimeout(() => {
        this.toggleMiniIcon();
      }, 500);

      this.setReturningFunc(2);
      this.setGameType(noGame);
      this.hideNavi();
    },

    circlesChosen(listOfCircles, noChap) {
      this.addOrRemoveChap(noChap)
    },
  },
};
</script>

<style scoped>
.games > * {
  transition: opacity 0.2s linear;
}
.swiper-slide {
  background-color: var(--ion-white);
  border-radius: 7%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 7%;
}

.circle {
  position: relative;
  top: -5dvh;
  background-color: var(--ion-color-secondary-tint);
  height: 10dvh;
  width: 10dvh;
  border-radius: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 1dvh;
  font-size: 3.5dvh;
  font-weight: 700;
  color: var(--ion-color-medium);
  text-shadow: none;
}
.game-icon {
  width: 7dvh;
  height: 7dvh;
}

.title {
  position: relative;
  top: -7dvh;
  width: 100%;
  height: 9dvh;
  padding: 3dvh;
  color: var(--ion-color-medium);
  text-shadow: none;
  font-weight: 700;
  font-size: 3dvh;
  border-bottom: solid 1dvh var(--ion-color-secondary-tint);
}

.text {
  position: relative;
  transform: translateY(-70%);
  font-size: 2.5dvh;
  padding: 0%;
  color: var(--ion-color-medium);
  text-shadow: none;
  width: 90%;
  height: 6dvh;
  font-weight: 500;
}

.blue-circle {
  background: var(--ion-color-primary-tint-light);
  height: 5dvh;
  width: 5dvh;
  margin: 1%;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100%;
  font-weight: 800;
  transition: 0.2s linear;
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
  align-items: center;
  justify-items: center;
}

.character-name {
  color: var(--ion-color-primary-tint);
  text-shadow: none;
  font-size: 2.5dvh;
}
.note {
  position: relative;
  font-size: 2.7dvh;
  opacity: 0.8;
}

.games {
  position: relative;
  top: -7%;
}

.circle-chosen {
  background-color: var(--ion-color-primary);
  color: var(--ion-color-secondary-tint);
}

.mySwiper {
  margin-top: 2dvh;
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
