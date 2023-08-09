<template>
  <transition-group tag="div" class="trivia" appear name="fadeA" mode="out-in">
    <count-down
      :key="0"
      @timerEnd="this.stage = 'game'"
      v-if="stage == 'timer'"
    ></count-down>

    <div v-else :key="1">
      <trivia-info
        :key="0"
        :type="type"
        :stage="stage"
        :noCorrect="noCorrect"
        :noWrong="noWrong"
        @endGame="endGame"
        :class="[stage == 'end' ? 'transparent' : '']"
      ></trivia-info>

      <trivia-questions
        :key="1"
        :type="type"
        :noWrong="noWrong"
        :noCorrect="noCorrect"
        :stage="stage"
        :exam="exam"
        @correct="noCorrect++"
        @wrong="noWrong++"
        @endGame="endGame"
      ></trivia-questions>

        <end-game
          :key="2"
          :noCorrect="noCorrect"
          :noWrong="noWrong"
          :stage="stage"
          @tryAgain="tryAgain"
        ></end-game>

    </div>
  </transition-group>
</template>

<script>
import CountDown from "./CountDown.vue";
import TriviaInfo from "./TriviaInfo.vue";
import TriviaQuestions from "./TriviaQuestions.vue";
import EndGame from "./EndGame.vue";

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
    endGame() {
      this.stage = "end";
    },

    tryAgain() {
      this.stage = "game";
      this.noCorrect = 0;
      this.noWrong = 0;
    },
  },
};
</script>

<style scoped>
.trivia {
  height: 90vh;
  display: flex;
  align-items: space-between;
  flex-direction: column;
  padding: 5%;
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
</style>
