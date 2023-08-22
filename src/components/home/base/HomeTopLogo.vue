<template>
  <div class="container" ref="container">
    <transition-group appear name="fadeA">
      <div class="circle" ref="circle" :key="0"></div>

      <ion-img
        :src="stepLogoSrc"
        alt="step-logo"
        class="step-logo"
        v-if="firstOpened"
        :key="1"
      ></ion-img>

      <ion-img
        :src="bhdlogoSrc"
        alt="bhd-logo"
        class="bhd-logo"
        v-if="firstOpened"
        :key="2"
      ></ion-img>

      <ion-text
        :key="3"
        ref="num"
        :class="[
          learnChapter != null && learnSubSec == null
            ? ''
            : 'hide no-transition',
          'num',
        ]"
        >פרק {{ learnChapter + 1 }}
      </ion-text>

      <div class="circle sub-circle" ref="circle" v-if="showHeading" :key="3">

        <ion-img
          :src="arrowSrc"
          ref="arrow"
          :class="[!bigNavi ? 'arrow-small' : '', showBackBtn? '' : 'hide', 'arrow']"
  
          @click="playBackFunc()"
        ></ion-img>

        <ion-text v-if="showHeading" ref="text" class="text" :key="5">
          {{ text }}</ion-text
        >

        <ion-img :key="6"
          :class="[!miniIcon || bigNavi  || !showBackBtn ? 'hide' : '', 'mini-icon']"
          :src="require(`@/assets/media1/HomePage/icons-nevi/${stage}.png`)"
        ></ion-img>

        <!-- <ion-img
      :src="searchSrc"
      alt="search-icon"
      class="search"
      v-show="learnChapter != null && learnSubSec == null"
      :key="3"
    ></ion-img> -->
      </div>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { IonImg, IonText } from "@ionic/vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "HomeTopLogo",
  components: { IonImg, IonText },
  props: ["firstOpened", "slideNum"],

  data() {
    return {
      bhdlogoSrc: require("@/assets/media1/openingScreen/bhd-logo.png"),
      stepLogoSrc: require("@/assets/media1/openingScreen/horizontal-logo-text.png"),
      searchSrc: require("@/assets/media1/HomePage/magnifying-glass.png"),
      arrowSrc: require("@/assets/media1/HomePage/arrow-back.png"),
      text: "",
      showHeading: false,
      textArray: ["אנשים", "בחנים", "מקראות", "משחקים", "הסכתים"],
      icon: null,
    };
  },

  computed: {
    ...mapState("learning", ["learnChapter", "learnSubSec"]),
    ...mapState("games", ["gameType"]),
    ...mapState("navigation", ["bigNavi", "stage", "miniIcon"]),
    ...mapState("returning", [
      "showBackBtn",
      "backToSubMenu2",
      "backToSubSecMenu",
    ]),
  },

  methods: {
    ...mapActions("returning", ["playBackFunc"]),

    miniTop() {
      this.$refs.container.style.height = "10%";
      this.$refs.circle.style.height = "200%";
      this.$refs.circle.style.borderRadius = "4vh";
    },

    maxTop() {
      this.$refs.container.style.height = "18%";
      this.$refs.circle.style.height = "200%";
      this.$refs.circle.style.borderRadius = "100%";
    },
  },

  created() {
    const unwatch = this.$watch("firstOpened", () => {
      setTimeout(() => {
        this.showHeading = true;
        unwatch();
      }, 500);
    });
  },

  watch: {
    slideNum: {
      handler() {
        this.text = this.textArray[this.slideNum];
      },
    },

    learnChapter: {
      handler() {
        if (this.learnChapter != null) {
          import(`@/json/chapters/chapter${this.learnChapter + 1}`).then(
            (module) => {
              this.text = module.title;
            }
          );
        } else {
          this.text = this.textArray[this.slideNum];
        }
      },
    },

    gameType: {
      handler() {
        if (this.gameType != null && this.gameType < 5) { // a game but not a test
          import(`@/json/games/gamesInfo`).then((module) => {
            this.text = module[this.gameType - 1].title;
          });
        } else {
          this.text = this.textArray[this.slideNum];
        }
      },
    },

    bigNavi: {
      handler() {
        this.bigNavi ? this.maxTop() : this.miniTop();
      },
    },
  },
});
</script>

<style scoped>
.container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 18%;
  transition: all 1s ease;
}
.bhd-logo {
  position: relative;
  height: 35%;
  top: 22%;
}

.step-logo {
  position: relative;
  height: 50%;
  top: 15%;
}

ion-text {
  position: relative;
  font-size: 150%;
  text-shadow: none;
  font-weight: 600;
  transition: all 1s ease;
}

.circle {
  width: 100%;
  height: 200%;
  transform: translateY(-50%);
  border-radius: 100%;
  background-color: #83a9ad;
  position: absolute;
  transition: all 1s ease;
}

.smalle-container {
  height: 10dvh;
}
.smalle-div {
  border-radius: 4dvh;
  height: 20dvh;
}
.num {
  position: relative;
  font-size: 90%;
  top: 7%;
  opacity: 1;
  margin-bottom: 1.5%;
  z-index: 2;
  transition: all 1s ease;
}

.search {
  position: absolute;
  height: 3dvh;
  top: 1.5dvh;
  left: 4dvw;
}

.text {
  position: relative;
  font-size: 2rem;
}

.arrow {
  position: relative;
  transition: all 1s ease;
  height: 3dvh;
  width: 7dvh;
}

.mini-icon {
  position: relative;
  transition: all 1s ease;
  height: 6dvh;
  width: 7dvh;
}

.sub-circle {
  background-color: #83a9ad;
  display: flex;
  flex-direction: row;
  align-content: flex-end;
  justify-content: space-evenly;
  align-items: center;
  top: 0;
}
.sub-circle > * {
  position: relative;
  transition: all 1s ease;
  top: 20%;
}

.hide {
  opacity: 0;
  transition: all 0.5s ease;
}

.no-transition {
  transition: none;
}
</style>
