<template>
  <div :class="[type == 5 ? 'info-test' : '', 'info']">
    <div
      v-if="type == 2 || type == 5"
      :class="[
        type == 5 ? 'clock-part-test' : '',
        stage == 'end' ? 'transparent' : '',
        'clock-part',
      ]"
    >
      <ion-img
        :class="[type == 5 ? 'clock-icn-test' : '',  isDark? 'dark' : '',
        'trivia-icon clock-icn']"
        :src="require(`@/assets/media1/HomePage/games/trivia/time.png`)"
      ></ion-img>

      <div class="time">
        <div class="text-dark-plain" v-if="sec > 9">
          {{ min + ":" + sec }}
        </div>
        <div class="text-dark-plain" v-else>
          {{ min + ":0" + sec }}
        </div>
      </div>
    </div>

    <div class="hearts" v-else-if="type == 3">
      <ion-img
        v-for="n in life"
        :key="n"
        :class="[n > noWrong ? 'popIn' : 'popOut', isDark? 'dark-img' : '', 'trivia-icon heart']"
        :src="require(`@/assets/media1/HomePage/games/trivia/like.png`)"
      ></ion-img>
    </div>

    <div class="test" v-if="type == 5">
      <ion-button
        v-for="n in 10"
        :key="n"
        :class="['circle', circleClass(n)]"
        @click="changeQuest(n)"
        >{{ n }}</ion-button
      >
    </div>

    <div class="checkd-part" v-if="type == 2 || type == 3">
      <ion-img
        :class="[ isDark? 'dark-img' : '', 'trivia-icon mark']"
        :src="require(`@/assets/media1/HomePage/games/trivia/check.png`)"
      ></ion-img>
      <ion-text class="text-dark-plain checked-num"> {{ noCorrect }}</ion-text>
    </div>
  </div>
</template>

<script>
import { IonImg, IonText, IonButton } from "@ionic/vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "TriviaGame",
  components: { IonImg, IonText, IonButton },
  props: ["type", "noCorrect", "noWrong", "stage"],

  data() {
    return {
      life: 3,
      min: 1,
      sec: 0,
      isPicked: false,
      timeout: null,
      isDark: false,
    };
  },

  computed: {
    ...mapState("games", ["testAnswers", "_questNum"]),
  },

  mounted() {
    this.isDark = document.body.classList.contains("dark");
  },

  methods: {
    ...mapActions("games", ["updatequestNum"]),

    countDownTimer() {
      if (this.min == 0 && this.sec == 0) {
        this.$emit("endGame");
        return;
      }

      this.timeout = setTimeout(() => {
        if (this.sec > 0) this.sec--;
        else {
          this.min--;
          this.sec = 59;
        }
        this.countDownTimer();
      }, 1000);
    },

    changeQuest(n) {
      // n = 1-10
      this.updatequestNum(n - 1);
    },

    circleClass(n) {
      if (this.stage == "game") {
        return this.testAnswers[n - 1].picked == -1 ? "" : "answered";
      } else {
        return this.testAnswers[n - 1].correct == this.testAnswers[n - 1].picked
          ? "correct"
          : "wronge";
      }
    },
  },

  watch: {
    stage: {
      immediate: true,
      handler() {
        if (this.stage == "game") {
          if (this.type == 2) {
            // tirivia
            this.min = 1;
            this.sec = 0;
            this.countDownTimer();
          } else if (this.type == 5) {
            // test
            this.min = 10;
            this.sec = 0;
            this.countDownTimer();
          }
        } else if (this.stage == "end") {
          clearTimeout(this.timeout);
        }
      },
    },
  },
};
</script>

<style scoped>
.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-test {
  flex-direction: column;
}

.time {
  font-size: 100%;
}

.trivia-icon {
  display: inline-block;
  width: 30%;
  height: 30%;
}

.hearts,
.clock-part {
  width: 50%;
  display: flex;
}

.hearts {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.clock-part-test {
  width: 100%;
  height: 40%;
  margin-bottom: 1%;
  align-items: baseline;
}
.heart {
  margin: 2%;
  width: 15%;
  position: relative;
  right: 0;
}
.checkd-part {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mark {
  margin: 2%;
  width: 15%;
  position: relative;
  right: 0;
}

.checked-num {
  margin: 0 4% 0 4%;
  font-size: 1.8rem;
}

.clock-icn {
  margin: 2%;
  margin-left: 5%;
  width: 15%;
  height: 100%;
  position: relative;
  right: 0;
}

.clock-icn-test {
  margin: 0%;
  height: 1.5rem;
  width: 10%;
  align-content: start;
  padding: 0;
  --padding: 0;
  margin-left: 2%;
  transform: translateY(15%);
}
.test {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  align-items: center;
  margin: 1% 0;
  padding: 0 1%;
  justify-content: space-between;
}

.circle {
  min-width: 0px;
  --border-radius: 100%;
  --margin: 0;
  margin: 0;
  --background: var(--ion-color-primary-tint-light);
  color: var(--ion-color-medium);
  font-weight: 700;
  width: 2.5em;
  height: 2.5em;
  aspect-ratio: 1/1;
}

.answered {
  transition: all 1s ease;
  color: var(--ion-color-secondary);
  --background: var(--ion-color-primary);
}

.popIn {
  animation: popIn 1s ease-in-out;
  -webkit-animation: popIn 1s ease-in-out;
}

.transparent {
  opacity: 0;
  transition: all 0.5s ease;
}

.correct {
  --background: var(--ion-color-success);
}
.wronge {
  --background: var(--ion-color-danger);
}

.dark {
  filter: sepia(900%) contrast(100%) brightness(400%);
}

@media only screen and (min-height: 800px) {
  .info-test {
    height: 10%;
  }

  .time {
    font-size: 120%;
  }

  .circle {
    width: 95%;
  }
}

@media only screen and (min-height: 1000px) {
  .circle {
    width: 110%;
  }
}

@media only screen and (max-height: 800px) {
  .circle {
    width: 80%;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes popIn {
  from {
    -webkit-transform: scale(0);
  }
  80% {
    -webkit-transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
.popOut {
  animation: popOut 1s ease-in-out forwards;
  -webkit-animation: popOut 1s ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes popOut {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
@-webkit-keyframes popOut {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
</style>
