<template>
  <transition-group
    tag="div"
    class="container"
    ref="container"
    appear
    name="fadeA"
  >
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

    <ion-text class="num" :key="3" ref="num"
      >פרק {{ learnChapter + 1 }}
    </ion-text>
    <ion-text v-if="showHeading" :key="2" ref="text" class="text">
      {{ text }}</ion-text
    >

    <ion-img
      :src="searchSrc"
      alt="search-icon"
      class="search"
      v-show="learnChapter != null && learnSubSec == null"
      :key="3"
    ></ion-img>

    <ion-img
      :key="3"
      :src="require('@/assets/media1/HomePage/arrow-back.png')"
      class="arrow"
      v-if="showBackBtn"
      @click="playBackFunc()"
    ></ion-img>

    <ion-img
      v-if="miniIcon"
      :key="4"
      :src="require(`@/assets/media1/HomePage/icons-nevi/${stage}.png`)"
      class="mini-icon"
    ></ion-img>

    <ion-img :key="4" v-if="icon != null" :src="icon" class="arrow"></ion-img>
  </transition-group>
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
      this.$refs.num.$el.style.opacity = 0;
      this.$refs.text.$el.style.top = "-15%";
      this.$refs.text.$el.style.fontSize = "130%";
      this.$refs.container.$el.style.height = "10vh";
      this.$refs.circle.style.height = "20vh";
      this.$refs.circle.style.borderRadius = "4vh";
    },

    maxTop() {
      this.$refs.text.$el.style.top = "0";
      this.$refs.container.$el.style.height = "18%";
      this.$refs.circle.style.height = "200%";
      this.$refs.circle.style.borderRadius = "100%";
      this.$refs.text.$el.style.fontSize = "180%";
      if (this.learnChapter != null) this.$refs.num.$el.style.opacity = 1;
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
              this.$refs.num.$el.style.opacity = 1;
            }
          );
        } else {
          this.$refs.num.$el.style.opacity = 0;
          this.text = this.textArray[this.slideNum];
        }
      },
    },

    gameType: {
      handler() {
        if (this.gameType != null) {
          import(`@/json/games/gamesInfo`).then((module) => {
            this.text = module[this.gameType-1].title;
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
  font-size: 180%;
  top: 3vh;
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
  height: 10vh;
}
.smalle-div {
  border-radius: 4vh;
  height: 20vh;
}
.num {
  display: block;
  font-size: 90%;
  top: 10%;
  opacity: 0;
  margin-bottom: 1.5%;
}

.text {
  position: relative;
  top: 0;
}

.search {
  position: absolute;
  height: 3vh;
  top: 1.5vh;
  left: 4vw;
}

.arrow {
  position: absolute;
  height: 3vh;
  top: 1.5vh;
  right: 4vw;
}

.mini-icon {
  position: absolute;
  transition: all 1s ease;
  top: 15%;
  left: 5%;
  height: 7vh;
}
</style>
