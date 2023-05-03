<template>
  <transition-group tag="div"  :class="[learnSubSec != null ? 'smalle-container':'' , 'container' ]" appear name="fade">
    <div :class="[learnSubSec != null ? 'smalle-div':'' , 'cirele' ]" :key="0"></div>
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
      v-if="learnChapter != null"
      :key="3"
    ></ion-img>
  </transition-group>
</template>

<script>
import { defineComponent } from "vue";
import { IonImg, IonText } from "@ionic/vue";
import { mapState } from "vuex";

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
    };
  },

  computed: mapState("learning", ["learnChapter", "learnSubSec"]),

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
              this.$refs.text.$el.style.fontSize = "140%";
            }
          );
        } else {
          this.$refs.num.$el.style.opacity = 0;
          this.$refs.text.$el.style.top = "0";
          this.text = this.textArray[this.slideNum];
        }
      },
    },

    learnSubSec: {
      handler() {
        if (this.learnSubSec != null) {
              this.$refs.num.$el.style.opacity = 0;   
              this.$refs.text.$el.style.top = "-30%";
              this.$refs.text.$el.style.fontSize = "120%";
        } else {
          this.$refs.num.$el.style.opacity = 1;
          this.$refs.text.$el.style.top = "0";
        }
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
  font-size: 5vh;
  top: 3.2vh;
  text-shadow: none;
  font-weight: 600;
  transition: 1s;
}

.cirele {
  width: 100%;
  height: 200%;
  transform: translateY(-50%);
  border-radius: 100%;
  background-color: #83a9ad;
  position: absolute;
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
  height: 20%;
  left: 5%;
  top: 10%;
}
</style>
