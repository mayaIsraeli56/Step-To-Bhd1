<template>
  <transition-group tag="div" class="trivia" appear name="fadeA" mode="out-in">
    <count-down
      :key="0"
      @timerEnd="this.stage = 'game'"
      v-if="stage == 'timer'"
    ></count-down>

    <div class="box" v-else :key="1">
      <trivia-info
        :key="0"
        :type="type"
        :stage="stage"
        :noCorrect="noCorrect"
        :noWrong="noWrong"
        @endGame="endGame"
        :class="[stage == 'end' && type != 5 ? 'transparent' : '']"
      ></trivia-info>

      <trivia-questions
        :key="1"
        :type="type"
        :noWrong="noWrong"
        :noCorrect="noCorrect"
        :stage="stage"
        :exam="exam"
        @correct="changeCorrect"
        @wrong="changeWrong"
        @endGame="endGame"
        @tryAgain="tryAgain"
        ref="child"
      ></trivia-questions>

      <end-game
        :key="2"
        :noCorrect="noCorrect"
        :noWrong="noWrong"
        :stage="stage"
        :type="type"
        @tryAgain="tryAgain"
        @showReview="showReview"
      ></end-game>
      
    </div>
  </transition-group>
</template>

<script>
import CountDown from "./CountDown.vue";
import TriviaInfo from "./TriviaInfo.vue";
import TriviaQuestions from "./TriviaQuestions.vue";
import EndGame from "./EndGame.vue";
import {mapActions } from "vuex";

export default {
  name: "TriviaGame",
  components: { CountDown, TriviaInfo, TriviaQuestions, EndGame },
  props: ["type", "exam"],

  data() {
    return {
      stage: "timer",
      life: 3,
      noCorrect: 0,
      noWrong: 0,
    };
  },

  methods: {
    ...mapActions("games", ["resetPicked", "updatequestNum"]),

    endGame() {
      this.stage = "end";
    },

    changeCorrect(n) {
      this.noCorrect += n;
    },

    changeWrong(n) {
      this.noWrong += n;
    },

    tryAgain() {
      if (this.type == 5) this.resetPicked();
      this.stage = "game";
      this.noCorrect = 0;
      this.noWrong = 0;
    },

    showReview() {
      this.updatequestNum(0)
      this.stage = "review";
    },
  },
};
</script>

<style scoped>
.trivia {
  height: 90dvh;
  display: flex;
  align-items: space-between;
  flex-direction: column;
  padding: 1% 4% ;
}

.box {
  height: 100%;
  width: 100%;
}

.trivia-icon {
  display: inline-block;
  width: 10%;
  height: 10%;
}

.transparent {
  opacity: 0;
  transition: all 0.5s ease;
}

@media only screen and (max-height: 800px) {
  .trivia {
    padding: 4%, 1%;
  }
}
</style>
