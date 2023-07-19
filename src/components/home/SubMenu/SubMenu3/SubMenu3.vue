<template>
  <div class="games" v-if="gameType == null">
    <ion-text class="text-dark-plain note animate__animated" ref="note"
      >בחרו את הפרקים אותם תרצו לתרגל</ion-text
    >

    <div class="box">
      <div
        v-for="n in noChapters"
        :key="n"
        :class="[
          chapterChosen[n - 1] ? 'circle-chosen' : '',
          'blue-circle text-dark-plain',
        ]"
        @click="choseChap(n)"
      >
        {{ n }}
      </div>
    </div>
    <ion-text class="character-name" :style="{ opacity: opacity }">{{
      lastChosen
    }}</ion-text>

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
  <time-game v-if="gameType == 2"></time-game>
  <trivia-game v-if="gameType == 3"></trivia-game>
  <thinking-game v-if="gameType == 4"></thinking-game>
</template>

<script>
import SubMenuSwiper from "../SubMenuSwiper.vue";
import TimeGame from "./Games/TimeGame.vue";
import ThinkingGame from "./Games/ThinkingGame.vue";
import CardsGame from "./Games/CardsGame.vue";
import TriviaGame from "./Games/TriviaGame.vue";

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
    IonText,
    IonImg,
    TimeGame,
    ThinkingGame,
    CardsGame,
    TriviaGame,
  },

  data() {
    return {
      slidesNum: null,
      gamesInfo: gamesInfo,
      ChapterInfo: ChapterInfo,
      noChapters: 10,
      lastChosen: "last",
      chapterChosen: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      opacity: 0,
    };
  },

  computed: {
    ...mapState("returning", ["backToSubMenu3"]),
    ...mapState("games", ["gameType"]),
  },

  created() {
    this.slidesNum = this.gamesInfo.length;
  },

  methods: {
    ...mapActions("games", ["setGameType"]),
    ...mapMutations("navigation", ["hideNavi", "toggleMiniIcon"]),
    ...mapActions("returning", ["setReturningFunc"]),

    choseChap(noChap) {
      this.opacity = !this.chapterChosen[noChap - 1] ? 1 : 0;
      this.lastChosen = this.ChapterInfo[noChap - 1].title;
      this.chapterChosen[noChap - 1] = !this.chapterChosen[noChap - 1];
    },

    choseGame(noGame) {
      if (this.lastChosen == "last") {
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
  },

  watch: {
    backToSubMenu3: {
      handler() {
        if (this.backToSubMenu3) {
          this.toggleMiniIcon();
        }
      },
    },
  },
};
</script>

<style scoped>
.games > * {
  transition: opacity 0.2s linear;
}
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
.game-icon {
  width: 7vh;
  height: 7vh;
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
  font-size: 2.5vh;
  padding: 0%;
  color: var(--ion-color-medium);
  text-shadow: none;
  width: 90%;
  height: 6vh;
  font-weight: 500;
}

.blue-circle {
  background: var(--ion-color-primary-tint-light);
  height: 5vh;
  width: 5vh;
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
  font-size: 2.5vh;
}
.note {
  position: relative;
  font-size: 2.5vh;
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
  margin-top: 2vh;
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
