<template>
  <transition-group
    tag="div"
    class="end"
    appear
    name="fadeA"
    mode="out-in"
    delay="500"
    v-if="showMe"
  >
    <div class="white-part" :key="0">
      <div class="card">
        <ion-text class="text-dark-plain endTxt"> המשחק הסתיים</ion-text>
      </div>
      <div class="line"></div>
    </div>

    <div class="txt" :key="0">
      <ion-text class="text-dark-plain good-job">
        {{ "כל הכבוד\t!\t" }}</ion-text
      >
      <div>
        <ion-text class="text-dark-plain">
          {{
            "הצלחת לפתור נכון \t" +
            noCorrect +
            "\nמתוך\t" +
            (noWrong + noCorrect) +
            "\tשאלות"
          }}
        </ion-text>
      </div>
    </div>

    <ion-button shape="round" size="large" :key="0" v-if="type == 5" @click="$emit('showReview')"
      >איפה טעיתי ?  
    </ion-button>
    <ion-button shape="round" size="large" @click="$emit('tryAgain')" :key="0"
      >בא לי שוב
    </ion-button>
  </transition-group>
</template>

<script>
import { IonText, IonButton } from "@ionic/vue";

export default {
  name: "EndGame",
  components: { IonText, IonButton },
  props: ["type", "noCorrect", "noWrong", "stage"],

  data() {
    return {
      showMe: false,
    };
  },

  watch: {
    stage: {
      handler() {
        if (this.stage == "end") {
          setTimeout(() => {
            this.showMe = true;
          }, 600);
        } else {
          this.showMe = false;
        }
      },
    },
  },
};
</script>

<style scoped>
.card {
  background-color: var(--ion-white);
  width: 100%;
  max-height: 13rem;
  border-radius: 2dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 2%;
  transition: all 0.5s ease;
  font-size: 1.2rem;
}

.white-part {
  width: 100%;
}
.end {
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 5%;
}
.end > * {
  transition: all 0.5s ease;
}

.good-job {
  font-size: 200%;
  font-weight: 700;
}

.line {
  background-color: var(--ion-white);
  width: 100%;
  margin-top: 5%;
  height: 0.4rem;
  border-radius: 2dvh;
}
</style>
