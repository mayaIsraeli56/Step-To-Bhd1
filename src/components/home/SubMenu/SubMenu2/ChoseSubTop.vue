<template>
  <transition-group appear name="fadeA">
    <ion-img
      :src="icon"
      :key="0"
      :class="[learnSubSec != null ? 'mini' : '', 'icon', isDark? 'dark' : '']"
    ></ion-img>
    <ion-text
      :key="1"
      class
      :class="[learnSubSec != null ? 'hide' : '', 'text-dark-plain', 'note']"
      >לחצו על הפרק לפתיחת תתי - הנושאים</ion-text
    >
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
      isDark: false,
    };
  },

  mounted() {
    this.isDark = document.body.classList.contains("dark");
  },

  computed: {
    ...mapState("learning", ["learnChapter", "learnSubSec"]),
  },

  created() {
    this.icon = require(`@/assets/media1/HomePage/chapter-logo/${
      this.learnChapter + 1
    }.png`);
  },
};
</script>

<style scoped>
ion-img {
  position: relative;
  height: 12dvh;
  top: -6dvh;
}

.note {
  position: relative;
  top: -2.5dvh;
  font-size: 2.2dvh;
  transition: all 1s ease;
}

.icon {
  height: 10dvh;
  transition: all 1s ease;
}

.close {
  height: 0;
  clip-path: inset(0 0 100% 0);
  transition: all 0.5s ease;
}
.hide {
  display: none;
}
.mini {
  top: -7.5dvh;
  left: -40%;
  height: 5dvh;
  transition: all 0.5s ease;
}

.dark {
  filter: sepia(1800%) brightness(250%) grayscale(150%);
}
</style>
