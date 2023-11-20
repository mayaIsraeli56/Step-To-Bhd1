<template>
  <ion-content :class="learnSubSec != null ? 'full-page' : ''" ref="content">
    <ion-list ref="list">
      <transition-group
        tag="div"
        class="container"
        appear
        name="fadeA"
        mode="out-in"
      >
        <div
          v-for="(sec, secNum) in sections"
          :key="secNum"
          :class="[
            secNum == learnSec
              ? 'chosen-sec section'
              : learnSec != null
              ? 'close'
              : 'section',
          ]"
          :ref="'sec' + secNum"
        >
          <sec-cards
            :secNum="secNum"
            :sec="sec"
            :openTextSetting="openTextSetting"
            @click="openSubSecCard(secNum)"
            @toggleTextSetting="toggleTextSetting"
            v-if="secNum == learnSec || learnSec == null"
          ></sec-cards>

          <sub-sec-cards
            :secNum="secNum"
            :subSections="sec.subSections"
            :ref="'slide' + secNum"
            :class="[
              learnSubSec != null || openSubMenu != secNum ? 'close' : 'open',
              'sub-sec-menu',
            ]"
          >
          </sub-sec-cards>
        </div>
      </transition-group>
    </ion-list>
  </ion-content>

  <text-setting
    :openTextSetting="openTextSetting"
    @toggleTextSetting="toggleTextSetting"
  >
  </text-setting>
</template>
<script>
import SubSecCards from "./SubSecCards.vue";
import SecCards from "./SecCards.vue";
import TextSetting from "./TextSetting.vue";
import { IonContent, IonList } from "@ionic/vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "SubSecMenu",
  components: {
    SubSecCards,
    SecCards,
    IonContent,
    IonList,
    TextSetting,
  },

  data() {
    return {
      sections: null,
      unableOpening: true,
      openTextSetting: false,
    };
  },

  computed: {
    ...mapState("learning", [
      "learnChapter",
      "learnSec",
      "learnSubSec",
      "openSubMenu",
    ]),
    ...mapState("returning", ["backToSubSecMenu"]),
  },

  methods: {
    ...mapMutations("learning", ["openingSubMenu"]),

    openSubSecCard(chosenSlide) {
      if (this.unableOpening) {
        return;
      }

      if (chosenSlide == this.openSubMenu) {
        this.openingSubMenu(-1);
      } else {
        this.openingSubMenu(chosenSlide);
      }
    },

    toggleTextSetting() {
      this.openTextSetting = !this.openTextSetting;
    },
  },

  mounted() {
    this.openingSubMenu(-1);

    import(`@/json/chapters/chapter${this.learnChapter + 1}`).then((module) => {
      this.sections = module.sections;
    });

    setTimeout(() => {
      this.unableOpening = false;
    }, 500);
  },

  watch: {
    learnSec: {
      handler() {
        this.$refs.content.$el.scrollToTop();
      },
    },
  },
};
</script>

<style scoped>
ion-content {
  direction: ltr;
  --ion-background-color: transparent;
  height: 66dvh;
  transition: all 0.5s ease-in-out;
}

ion-list {
  padding: 0;
  padding-bottom: 10%;
  min-height: 66dvh;
  transition: all 0.5s ease-in-out;
}

.full-page {
  top: -5%;
  height: 90%;
}

.container {
  background-color: transparent;
}
.chosen-sec {
  width: 100%;
  margin-top: 5%;
}

.section {
  min-height: 14dvh;
  margin-top: 5%;
}

.sub-sec-menu {
  transition: all 0.5s ease-in-out;
}
.close {
  clip-path: inset(0 0 100% 0);
  height: 0 !important;
  opacity: 0;
  overflow: hidden;
}

.open {
  clip-path: inset(0);
  height: fit-content;
  opacity: 1;
}

.pop {
  position: absolute;
  bottom: 0;
  height: 40%;
  width: 100%;
  background-color: var(--setting-pop-back);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 4;
  border-radius: 4dvh 4dvh 0 0;
  padding: 5%;
}

.short-line {
  position: relative;
  height: 0.2rem;
  width: 2.5rem;
  background-color: var(--setting-pop-txt);
  margin-bottom: 2%;
}

.long-line {
  position: relative;
  height: 0.1rem;
  width: 100%;
  background-color: var(--setting-pop-txt);
  margin: 2% 0 4% 0;
}

.popSlide-enter-from {
  bottom: -40%;
  height: 40%;
  opacity: 0.5;
}

.popSlide-enter-to {
  bottom: 0;
  height: 40%;
  opacity: 1;
}

.popSlide-leave-from {
  bottom: 0;
  height: 40%;
  opacity: 1;
}

.popSlide-leave-to {
  bottom: -40%;
  height: 40%;
  opacity: 0.5;
}
.popSlide-enter-active {
  transition: all 0.5s ease;
}
.popSlide-leave-active {
  transition: all 0.5s ease;
}

.popSlide-move {
  transition: all 0.5s ease;
}

.back-drop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(59, 55, 55, 0.459);
  z-index: 3;
}

.input-line {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0%;
  flex-direction: row-reverse;
  transition: all 0.5s ease;
}

.input-line > ion-text {
  width: 30%;
  text-align: right;
}
.input-line > ion-text:first-child {
  width: 10%;
  text-align: left;
}

.input-line > .long-setting-text {
  width: 70%;
}

ion-toggle {
  --track-background-checked: var(--setting-input-range-back);
  --handle-background-checked: var(--setting-input-range-thumb);
}

.progress-bar {
  width: 60%;
  height: 0.3rem;
  background-color: var(--setting-input-range-back);
  border-radius: 2dvh;
  transition: all 0.5s ease;
}

input[type="range"] {
  -ms-appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  cursor: pointer;

  position: relative;
  left: 0;
  border-radius: 2dvh;
  background-color: var(--setting-input-range-thumb);
  direction: rtl;
}

/* Thumb: webkit */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;
  background-color: var(--setting-input-range-thumb);
  margin-top: -0.6rem;
  transition: 0.2s ease-in-out;
}

/* Thumb: Firefox */
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;
  background-color: var(--setting-input-range-thumb);
  transition: 0.2s ease-in-out;
}

/* slider track */
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background-color: var(--setting-input-range-back);
  border-radius: 0.5rem;
  height: 0.3rem;
}

input[type="range"]::-moz-range-track {
  -webkit-appearance: none;
  appearance: none;
  background: none;
}
input[type="range"]::-ms-track {
  -webkit-appearance: none;
  appearance: none;
  background: none;
}

/********** Range Input Styles **********/

/* Removes default focus */
input[type="range"]:focus {
  outline: none;
}

input[type="range"]:focus::-webkit-slider-thumb {
  border: 1px solid var(--setting-input-range-back);
  outline: 3px solid var(--setting-input-range-back);
  outline-offset: 0.125rem;
}

/******** Firefox styles ********/
/* slider track */
input[type="range"]::-moz-range-track {
  background-color: var(--setting-input-range-back);
  border-radius: 0.5rem;
  height: 0.3rem;
}

/* slider thumb */
input[type="range"]::-moz-range-thumb {
  border: none; /*Removes extra border that FF applies*/
  border-radius: 0; /*Removes default border-radius that FF applies*/

  /*custom styles*/
  background-color: var(--setting-input-range-thumb);
  height: 2rem;
  width: 1rem;
}

input[type="range"]:focus::-moz-range-thumb {
  border: 1px solid var(--setting-input-range-back);
  outline: 3px solid var(--setting-input-range-back);
  outline-offset: 0.125rem;
}
</style>
