<template>
  <transition appear name="justFade">
    <div
      class="back-drop"
      @click="$emit('toggleTextSetting')"
      v-if="openTextSetting"
    ></div>
  </transition>

  <transition appear name="popSlide">
    <div class="pop" v-if="openTextSetting">
      <div class="short-line" @click="$emit('toggleTextSetting')"></div>
      <ion-text class="text-dark-plain" @click="$emit('toggleTextSetting')"
        >הגדרות</ion-text
      >
      <div class="long-line"></div>

      <div class="input-line">
        <ion-text class="text-dark-plain">{{ fontSize }} </ion-text>
        <div class="progress-bar">
          <input
            type="range"
            min="3"
            max="8"
            v-model="fontSize"
            @input="updateStyle(fontSize, 'fontSize')"
          />
        </div>
        <ion-text class="text-dark-plain">גודל גופן </ion-text>
      </div>

      <div class="input-line">
        <ion-text class="text-dark-plain">{{ lineHeight }} </ion-text>
        <div class="progress-bar">
          <input
            type="range"
            min="3"
            max="8"
            v-model="lineHeight"
            @input="updateStyle(lineHeight, 'lineHeight')"
          />
        </div>
        <ion-text class="text-dark-plain">רווח</ion-text>
      </div>

      <div class="input-line">
        <ion-toggle
          v-model="textAlign"
          @ionChange="() => updateStyle(textAlign, 'textAlign')"
        ></ion-toggle>
        <ion-text class="text-dark-plain long-setting-text"
          >יישור ל-2 הצדדים</ion-text
        >
      </div>
    </div>
  </transition>
</template>
<script>
import { IonText, IonToggle } from "@ionic/vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "SubSecMenu",
  components: {
    IonText,
    IonToggle,
  },

  props: ["openTextSetting"],
  emits: ["toggleTextSetting"],

  data() {
    return {
      fontSize: 4,
      lineHeight: 5,
      textAlign: false,
    };
  },

  computed: {
    ...mapState("learning", ["styleTxtObj"]),
  },
  mounted() {
    this.fontSize = this.styleTxtObj.fontSize;
    this.lineHeight = this.styleTxtObj.lineHeight;
    this.textAlign = this.styleTxtObj.textAlign;
  },

  methods: {
    ...mapActions("learning", ["updateTextStyle"]),

    updateStyle(newValue, key) {
      this.updateTextStyle([newValue, key]);
    },
  },
};
</script>

<style scoped>
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
  margin: 2% 0 8% 0;
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
