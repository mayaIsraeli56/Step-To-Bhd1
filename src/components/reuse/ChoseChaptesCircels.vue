<template>
  <ion-text
    class="text-dark-plain note animate__animated"
    v-for="(line, i) in explanation"
    :key="i"
  >
    {{ line }}</ion-text
  >

  <div class="box" ref="box">
    <button
      v-for="n in noCircles"
      :key="n"
      :class="[
        circlesChosen[n - 1] ? 'circle-chosen' : '',
        'blue-circle text-dark-plain',
      ]"
      @click="choseCirc(n)"
    >
      {{ n }}
    </button>
  </div>
  <ion-text class="character-name" :style="{ opacity: opacity }">{{
    chosenTxt
  }}</ion-text>
</template>

<script>
import { IonText } from "@ionic/vue";

export default {
  name: "ChoseChaptesCircels",
  components: {
    IonText,
  },
  props: [
    "explanation",
    "noCircles",
    "textAfterChoosing",
    "circlesInfo",
    "chooseOne",
  ],
  emits: ["circlesChosen"],

  data() {
    return {
      chosenTxt: "last",
      chosenQueue: [],
      circlesChosen: [],
      noChosen: 0,
      opacity: 0,
      lastChosen: -1,
      CIRCELSECHOSEN2: [],
    };
  },

  mounted() {
    let column = "";

    for (let i = 0; i < this.noCircles / 2; i++) {
      column += "auto ";
      this.circlesChosen[i] = false;
    }

    for (let i = 0; i < this.noCircles; i++) {
      this.circlesChosen[i] = false;
    }
    this.$refs.box.style.gridTemplateColumns = column;
  },

  methods: {
    choseCirc(noCirc) {
      if (!this.chooseOne) {
        if (this.circlesChosen[noCirc - 1]) {
          // remove selected
          this.noChosen--;
          this.opacity = 0;
        } else {
          // add selected
          this.noChosen++;
          this.opacity = 1;
        }

        this.chosenTxt = this.circlesInfo[noCirc - 1];
        this.circlesChosen[noCirc - 1] = !this.circlesChosen[noCirc - 1];
        this.$emit("circlesChosen", this.circlesChosen, noCirc - 1);
      } else {
        if (this.circlesChosen[noCirc - 1]) {
          // remove selected
          this.noChosen--;
          this.opacity = 0;
          this.lastChosen = -1;
        } else if (this.lastChosen == -1) {
          // no circle was selected
          this.noChosen++;
          this.opacity = 1;
          this.lastChosen = noCirc - 1;
        } else {
          // switch circels
          this.circlesChosen[this.lastChosen] = false;
          this.lastChosen = noCirc - 1;
        }

        this.chosenTxt = this.circlesInfo[noCirc - 1];
        this.circlesChosen[noCirc - 1] = !this.circlesChosen[noCirc - 1];
        this.$emit("circlesChosen", this.circlesChosen, noCirc - 1);
      }
    },
  },
};
</script>

<style scoped>
* {
  transition: opacity 0.2s linear;
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

.circle-chosen {
  background-color: var(--ion-color-primary);
  color: var(--ion-color-secondary-tint);
}
</style>
