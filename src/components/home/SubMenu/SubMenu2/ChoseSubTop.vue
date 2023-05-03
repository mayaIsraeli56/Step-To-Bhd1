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
</template>
<script>
import { IonImg, IonText } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "ChoseSubTop",
  emits: ["backToSubMenu"],
  components: { IonImg, IonText },

  data() {
    return {
      icon: null,
      openSubMenu: -1,
      closeSubMenu: -1,
    };
  },

  computed: {
    ...mapState("learning", ["learnChapter"]),
  },

  mounted() {
    this.icon = require(`@/assets/media1/HomePage/chapter-logo/${
      this.learnChapter + 1
    }.png`);
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
