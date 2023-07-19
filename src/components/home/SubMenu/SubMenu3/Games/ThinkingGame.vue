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
            v-for="(card, i) in cards"
            :key="i"
            class="section"
            :class="[secNum == learnSec ? 'chosen-sec' : '', 'section']"
            :ref="'sec' + secNum"
          >
            <sec-cards
              :secNum="secNum"
              :sec="sec"
              @click="openSubSecCard(i)"
              v-if="secNum == learnSec || learnSec == null"
            ></sec-cards>
  
            <sub-sec-cards
              :secNum="secNum"
              :subSections="sec.subSections"
              :key="secNum + 1"
              :ref="'slide' + secNum"
              class="sub-sec-menu"
              v-if="learnSubSec == null"
            >
            </sub-sec-cards>
          </div>
        </transition-group>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
import { IonList, IonText, IonContent } from "@ionic/vue";
import cards from "@/json/games/cards.json";

export default {
  name: "ThinkingGame",
  components: { IonList, IonText, IonContent },

  data() {
    return {
      cards: cards,
    };
  },

  methods: {},
};
</script>

<style scoped>
.think {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
}
.note {
  font-size: 80%;
}

.card {
  background-color: #d9e3e4;
  height: 14vh;
  width: 85%;
  border-radius: 3vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 1.8%;
  padding: 1% 3%;
  flex-wrap: wrap;
  transition: all 1s ease;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}

ion-content {
  direction: ltr;
  --ion-background-color: transparent;
  height: 90%;
  transition: all 1s ease-in-out;
}

ion-list {
  padding: 0;
  min-height: 50vh;
  transition: all 1s ease-in-out;
  background-color: #ecadad6f;
}

.ans {
  background-color: #fafafa;
}
</style>
