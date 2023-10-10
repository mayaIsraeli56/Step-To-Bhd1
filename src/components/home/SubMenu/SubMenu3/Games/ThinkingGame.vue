<template>
  <div class="think">
    <ion-text class="text-dark-plain note">
      לחצו על הכרטיסייה כדי לראות את התשובה</ion-text
    >

    <ion-content>
      <ion-list>
        <transition-group
          tag="div"
          class="container"
          appear
          name="fadeA"
          mode="out-in"
        >
          <div
            v-for="(ques, i) in questions"
            :key="i"
            class="card-structure"
            :ref="'card' + i"
          >
            <ion-card @click="toggleCard(i)" class="card">
              <ion-text class="text-dark-plain qes">
                {{ questions[i].qes }}</ion-text
              >
            </ion-card>

            <ion-card
              :class="['card ans', isCardShown(i) ? 'open' : 'close']"
              @click="toggleCard(i)"
            >
              <ion-text class="text-dark-plain">
                {{ questions[i].ans }}</ion-text
              >
            </ion-card>
          </div>
        </transition-group>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
import { IonList, IonText, IonContent, IonCard } from "@ionic/vue";
import { mapState } from "vuex";
import allQuestions from "@/json/games/thinkingGame.json";

export default {
  name: "ThinkingGame",
  components: { IonList, IonText, IonContent, IonCard },

  data() {
    return {
      questions: [],
      cardNum: 0,
      cardVisible: [],
    };
  },

  computed: {
    ...mapState("games", ["chosenChapters"]),
  },

  beforeMount() {
    allQuestions.forEach((chap, i) => {
      chap.forEach((ques) => {
        if (this.chosenChapters.includes(i)) this.questions.push(ques);
      });
    });
  },

  mounted() {
    for (let i = 0; i < this.questions.length; i++) {
      this.cardVisible[i] = false;
    }
  },

  methods: {
    toggleCard(cardNum) {
      this.cardVisible[cardNum] = !this.cardVisible[cardNum];
    },

    isCardShown(cardNum) {
      return this.cardVisible[cardNum];
    },
  },
};
</script>

<style scoped>
ion-content {
  direction: ltr;
  --ion-background-color: var(--ion-color-secondary-tint);
  height: 90%;
  transition: all 0.5s ease-in-out;
}

ion-list {
  padding: 0;
  padding-bottom: 30%;
  min-height: 100%;
  transition: all 0.5s ease-in-out;
  --ion-background-color: var(--ion-color-secondary-tint);
}

.think {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
}
.note {
  font-size: 80%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.card {
  background-color: var( --ion-thinking-game);
  height: 10dvh;
  width: 85%;
  border-radius: 3dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 0;
  padding: 1% 3%;
  flex-wrap: wrap;
  transition: all 0.5s ease;
  box-shadow: rgba(0, 0, 0, 0.228) 0px 3px 5px;
  z-index: 1;
}

.ans {
  background-color: var(--ion-white);
  border-radius: 0 0 3dvh 3dvh;
  height: fit-content;
  margin-top: -10%;
  font-size: 1.1rem;
  padding: 15% 5% 5% 5%;
  z-index: 0;
  transition: all 0.5s ease;
  box-shadow: none;
}

.qes {
  font-size: 100%;
}

.close {
  clip-path: inset(0 0 100% 0);
  opacity: 0;
  height: 0;
  padding: 5% 5% 5% 5%;
}

.open {
  clip-path: inset(0);
  opacity: 1;
}

</style>
