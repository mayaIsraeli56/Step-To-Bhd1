<template>
  <div class="container" v-if="!inExam">
    <card-with-line :title="title">
      <chose-chaptes-circels
        :explanation="explanation"
        :noCircles="noCircles"
        :circlesInfo="circlesInfo"
        :chooseOne="true"
        @circlesChosen="circlesChosen"
      ></chose-chaptes-circels>
      <ion-button @click="startExam" class="btn" :disabled="exam == -1" 
        >בחן אותי</ion-button
      >
    </card-with-line>
  </div>
  <trivia-game :type="5" :exam="exam" v-else></trivia-game>
</template>

<script>
import CardWithLine from "@/components/reuse/CardWithLine.vue";
import ChoseChaptesCircels from "@/components/reuse/ChoseChaptesCircels.vue";
import TriviaGame from "../SubMenu3/Games/Trivia/TriviaGame.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { IonButton } from "@ionic/vue";

export default {
  name: "SubMenu1",
  components: { CardWithLine, ChoseChaptesCircels, TriviaGame, IonButton },

  data() {
    return {
      explanation: [
        "עומדים לרשותכם מבחנים לדוגמה, ",
        "בחרו את המבחן אותו תרצו לפתור.",
      ],
      circlesInfo: [],
      noCircles: 6,
      title: "בחר מבחן",
      exam: -1,
      disableBtn: true,
      inExam: false,
    };
  },

  computed: {
    ...mapState("returning", ["backToSubMenu1"]),
  },

  mounted() {
    for (let i = 0; i < this.noCircles; i++)
      this.circlesInfo[i] = "מבחן " + (i + 1);
  },

  methods: {
    ...mapMutations("navigation", ["hideNavi", "toggleMiniIcon", "smallNavi"]),
    ...mapActions("games", ["setGameType", "addOrRemoveChap"]),
    ...mapActions("returning", ["setReturningFunc"]),

    circlesChosen(listOfCircles, exam) {
      this.exam = exam;
    },

    startExam() {
      this.inExam = true;
      
      this.setReturningFunc(3);
      this.hideNavi();
      this.smallNavi();
      this.setGameType(5)

      setTimeout(() => {
        this.toggleMiniIcon();
      }, 500);

    
    },
  },

  watch: {
    backToSubMenu1: {
      handler() {
        if (this.backToSubMenu1) {
          this.exam = -1;
          this.inExam = false;
        }
      },
    },
  },
};
</script>

<style scoped>
* {
  transition: all 0.5s ease;
}
.container {
  width: 100%;
  height: fit-content;
  border-radius: 2dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4% 0 4%;
  transition: all 0.5s ease;
  font-size: 1.2rem;
  flex-direction: column;
  position: relative;
  top: -6%;
}

.btn {
  --border-radius: 3dvh;
  font-size: 100%;
}
</style>
