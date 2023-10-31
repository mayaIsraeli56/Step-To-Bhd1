<template>
  <ion-text
    class="text-dark-plain note animate__animated"
    v-for="(line, i) in explanation"
    :key="i"
  >
    {{ line }}</ion-text
  >

  <div class="box" ref="box">
    <ion-text
      v-for="n in noCircles"
      :key="n"
      class="blue-circle text-dark-plain"
      @click="choseCirc(n)"
    >
      <ion-text class="text-dark-plain chap-num"> {{ n }}</ion-text>
      <ion-text class="text-dark-plain names"
        >{{
          chapNames[n - 1].length < maxChar
            ? chapNames[n - 1]
            : chapNames[n - 1].substring(0, maxChar) + "... "
        }}
      </ion-text>
    </ion-text>
  </div>
</template>

<script>
import { IonText } from "@ionic/vue";

export default {
  name: "ChoseChapBtns",
  components: {
    IonText,
  },
  props: [
    "explanation",
    "noCircles",
    "textAfterChoosing",
    "chapNames",
    "chooseOne",
  ],
  emits: ["circlesChosen"],

  data() {
    return {
      circlesChosen: [],
      noChosen: 0,
      opacity: 0,
      lastChosen: -1,
      maxChar: 45,
    };
  },

  mounted() {
    let column = "";

    for (let i = 0; i < this.noCircles; i++) {
      this.circlesChosen[i] = false;
      if (i < this.noCircles / 2) column += "auto ";
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

.blue-circle {
  background: var(--ion-color-secondary-contrast);
  height: 8rem;
  width: 45%;
  margin: 3% 0%;
  border-radius: 5dvh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  font-size: 100%;
  font-weight: 800;
  transition: 0.2s linear;
  padding: 3% 4%;
}

.box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: fit-content;
  padding: 5% 0%;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
}

.note {
  position: relative;
  font-size: 2.2dvh;
  opacity: 0.8;
}

.chap-num {
  font-weight: 900;
  font-size: larger;
}

.names {
  font-size: 90%;
}
</style>
