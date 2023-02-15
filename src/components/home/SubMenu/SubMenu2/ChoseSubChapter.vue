<template>
  <ion-img :src="icon"></ion-img>
  <ion-text class="text-dark-plain note"
    >לחצו על הפרק לפתיחת תתי - הנושאים</ion-text
  >
  <ion-img
    :src="require('@/assets/media1/HomePage/arrow-back.png')"
    class="arrow"
    @click="$emit('backToSubMenu')"
  ></ion-img>
  <div>
    <ion-content>
      <ion-list>
        <div class="card" v-for="(sec, index) in sections" :key="index">
          <ion-text class="text-dark-plain num">{{ index + 1 }}</ion-text>
          <ion-text class="text-dark-plain title">{{ sec.title }}</ion-text>
        </div>
      </ion-list>
    </ion-content>
  </div>
</template>
<script>
import { IonImg, IonText, IonContent, IonList } from "@ionic/vue";

export default {
  name: "ChoseSubChapter",
  emits: ["backToSubMenu"],
  components: { IonImg, IonText, IonContent, IonList },

  data() {
    return {
      chapterNum: this.$store.state.learnChapter,
      icon: null,
      sections: null,
    };
  },
  mounted() {
    this.icon = require(`@/assets/media1/HomePage/chapter-logo/${
      this.chapterNum + 1
    }.png`);

    import(`@/json/chapters/chapter${this.chapterNum + 1}`).then((module) => {
      this.sections = module.sections;
    });
  },
  methods: {},
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
  top: -2vh;
  font-size: 2.5vh;
}

.card {
  background-color: #fafafa;
  height: 14vh;
  width: 85vw;
  border-radius: 5vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
  padding: 1vh 3vw;
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
</style>
