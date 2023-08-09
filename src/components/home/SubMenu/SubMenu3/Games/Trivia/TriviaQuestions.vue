<template>
  <transition appear name="fadeA">
    <div class="ques" v-if="stage == 'game'">
      <div class="ques-part" :key="0">
        <div class="ques-card">
          <ion-text class="text-dark-plain" v-model="questNum">
            {{ questions[questNum].ques }}</ion-text
          >
        </div>
        <div class="line"></div>
      </div>

      <div class="answers">
        <button
          :disabled="answered"
          :class="['ans']"
          v-for="n in 4"
          :key="n"
          @click="ansPicked(n)"
          :ref="'ans' + n"
        >
          <ion-text class="text-dark-plain" v-model="questNum">
            {{ questions[questNum][n] }}</ion-text
          >
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { IonText } from "@ionic/vue";
import allQuestions from "@/json/games/trivia.json";
import test from "@/json/games/trivia.json";
import { mapState } from "vuex";

export default {
  name: "TriviaQuestions",
  props: ["type", "noWrong", "stage", "noCorrect", "exam"],
  components: { IonText },

  data() {
    return {
      questions: [],
      nofQuestions: 0,
      questNum: 0,
      answered: false,
    };
  },

  computed: {
    ...mapState("games", ["chosenChapters"]),
  },

  beforeMount() {
    // copy all relavent questions
    if (this.type != 5) {
      allQuestions.forEach((chap, i) => {
        chap.forEach((ques) => {
          ques.answered = false;
          if (this.chosenChapters.includes(i + 1))
            this.questions.push({ ...ques });
        });
      });
    } else {
      test[this.exam].forEach((ques) => {
        ques.answered = false;
        this.questions.push({ ...ques });
      });
    }

    this.nofQuestions = this.questions.length;
    this.questNum = this.getNext();
  },

  methods: {
    getNext() {
      let next;

      do {
        next = Math.floor(Math.random() * (this.nofQuestions - 0));
      } while (this.questions[next].answered);

      return next;
    },

    reset() {
      this.answered = false;

      this.questions.forEach((ques) => {
        ques.answered = false;
      }); // restart - all questions were not answered

      this.questNum = this.getNext();
      this.$emit("EndGame"); // hearts game and gime ended
    },

    ansPicked(hisAnswer) {
     
      if (this.type != 5) {
        let correct = this.questions[this.questNum].correct; // num of correct ans
        this.answered = true;

        this.$refs["ans" + hisAnswer][0].style.backgroundColor = "#edd1d1";
        this.$refs["ans" + correct][0].style.backgroundColor = "#c9d4b9";

        if (hisAnswer == correct) {
          this.questions[this.questNum].answered = true;
          this.$emit("correct");
        } else {
          this.$emit("wrong");
        }

        setTimeout(() => {
          if (
            (this.type == 3 && this.noWrong == 3) ||
            this.noCorrect == this.nofQuestions
          ) {
            this.reset();
            return;
          }

          this.questNum = this.getNext();
          this.answered = false;
          this.$refs["ans" + hisAnswer][0].style.backgroundColor = "#d9e3e4";
          this.$refs["ans" + correct][0].style.backgroundColor = "#d9e3e4";
        }, 1200);
      }
    },
  },
};
</script>

<style scoped>
.ques {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 0 5% 0;
  max-height: 85%;
  margin: 1% 0;
}

.ques-card {
  background-color: #fafafa;
  width: 100%;
  max-height: 13rem;
  border-radius: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 2%;
  transition: all 0.5s ease;
  font-size: 1.2rem;
}

.line {
  background-color: #fafafa;
  width: 95%;
  margin-top: 5%;
  height: 0.3rem;
  border-radius: 2vh;
  height: 0.4rem;
}

.answers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 5% 0%;
}

@media only screen and (max-width: 600px) {
  .answers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 2% 0;
  }
}

.ans {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9e3e4;
  margin: 3% 0%;
  width: 100%;
  padding: 4% 0;
  border-radius: 3vh;
  transition: all 0.5s ease;
}

.endTxt {
  font-weight: 700;
  font-size: 100%;
}

.ques-part {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
