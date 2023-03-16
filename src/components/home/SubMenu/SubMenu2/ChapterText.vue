<template>
    <div>
      <ion-content>
        <ion-list>
          <transition-group tag="div" class="container" appear name="fade">
            <div class="card" v-for="(sec, index) in sections" :key="index" >
              <ion-text class="text-dark-plain num">{{ index + 1 }}</ion-text>
              <ion-text class="text-dark-plain title">{{ sec.title }}</ion-text>
            </div>
          </transition-group>
        </ion-list>
      </ion-content>
    </div>
  </template>
  <script>
  import { IonText, IonContent, IonList } from "@ionic/vue";
  
  export default {
    name: "ChoseSubChapter",
    emits: ["backToSubMenu"],
    components: { IonText, IonContent, IonList },
  
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
    methods: {
    },
  };
  </script>
  
  <style scoped>
  ion-img {
    position: relative;
    height: 12%;
    top: -6%;
  }

  .card {
    background-color: #fafafa;
    height: 14%;
    width: 85%;
    border-radius: 5vh;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: auto;
    margin-top: 2.5%;
    margin-bottom: 2.5%;
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
  .icon {
    height: 10vh;
  }
  </style>
  