<template>
  <transition-group tag="div" class="container" appear name="fadeA" >
    <ion-img :src="icon" :key="0" :class="[learnSubSec != null? 'close' : '', 'icon']"></ion-img>
    <ion-text :key="1" :class="[learnSubSec != null? 'close' : '', 'text-dark-plain', 'note']"
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
    ...mapState("learning", ["learnChapter", "learnSubSec"]),
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

.close {
  height: 0;
  clip-path: inset(0 0 100% 0);
  transition: all 0.5s ease;
}

</style>
