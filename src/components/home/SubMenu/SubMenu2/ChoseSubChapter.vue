<template>
  <transition-group tag="div" class="container" appear name="fade">
    <ion-img :src="icon" class="icon" :key="0"></ion-img>
    <ion-text class="text-dark-plain note" :key="1"
      >לחצו על הפרק לפתיחת תתי - הנושאים</ion-text
    >
    <ion-img
      :key="2"
      :src="require('@/assets/media1/HomePage/arrow-back.png')"
      class="arrow"
      @click="$emit('backToSubMenu')"
    ></ion-img>
  </transition-group>

  <div>
    <ion-content>
      <ion-list>
        <transition-group tag="div" class="container" appear name="fade">
          <div
            v-for="(sec, index) in sections"
            :key="index"
            @click="choseSubSubChapter(`slide${index}`)"
            :ref="'slide' + index"
          >
            <div class="card">
              <ion-text class="text-dark-plain num">{{ index + 1 }}</ion-text>
              <ion-text class="text-dark-plain title">{{ sec.title }}</ion-text>
            </div>

            
            <div class="card-details">
              <div class="line"></div>
              
              <div
                class="sub-container"
                v-for="(sub, i) in sec.subSections"
                :key="i"
              >
                <ion-text class="text-dark-plain num-sub">
                  {{ `${index + 1}.${i + 1}` }}</ion-text
                >
                <ion-text class="text-dark-plain title-sub">{{
                  sub.title
                }}</ion-text>
              </div>
            </div>
          </div>
        </transition-group>
      </ion-list>
    </ion-content>
  </div>
</template>
<script>
import { IonImg, IonText, IonContent, IonList } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "ChoseSubChapter",
  emits: ["backToSubMenu"],
  components: { IonImg, IonText, IonContent, IonList },

  data() {
    return {
      icon: null,
      sections: null,
    };
  },

  computed: {
    ...mapState("learning", ["learnChapter"]),
  },

  mounted() {
    this.icon = require(`@/assets/media1/HomePage/chapter-logo/${
      this.learnChapter + 1
    }.png`);

    import(`@/json/chapters/chapter${this.learnChapter + 1}`).then((module) => {
      this.sections = module.sections;
    });
  },
  methods: {
    choseSubSubChapter(chosenSlide) {
      console.log(chosenSlide);
    },
  },
};
</script>

<style scoped>
ion-img {
  position: relative;
  height: 12vh;
  top: -6vh;
}

.note {
  position: relative;
  top: -2.5vh;
  font-size: 2.2vh;
}

.card {
  background-color: #fafafa;
  height: 14vh;
  width: 85%;
  border-radius: 5vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 2.5%;
  padding: 1% 3%;
}

ion-content {
  direction: ltr;
  --ion-background-color: transparent;
  height: 66vh;
}

.num {
  font-size: 2.5rem;
  font-weight: 600;
  margin-right: 2.5vw;
}
.title {
  font-size: 1.1rem;
  margin-right: 6vw;
  text-align: right;
  width: 80%;
}

.arrow {
  position: absolute;
  height: 3.1vh;
  top: 1.5vh;
  right: 4vw;
}
.icon {
  height: 10vh;
}

.card-details {
  background-color: #fafafa;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-bottom: 5%;
  padding: 2%;
  margin-top: -10%;
  border-radius: 0 0 5vh 5vh;
}

.line {
  width: 120%;
  padding: 0.8%;
  top: -10%;
  background-color: var(--ion-color-secondary-tint);
}

.sub-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  margin: 3% 0;
}

.title-sub {
  font-size: 1rem;
  margin-right: 6vw;
  text-align: right;
  width: 80%;
}

.num-sub {
  font-size: 1rem;
  font-weight: 400;
  margin-right: 2.5vw;
}
</style>
