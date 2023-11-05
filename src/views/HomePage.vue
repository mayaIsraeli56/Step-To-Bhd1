<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-content-start no-scroll">
      <div class="back">
        <home-top-logo
          :firstOpened="firstOpened"
          :slideNum="slideNum"
        ></home-top-logo>
        <home-navigation
          v-if="showNavi"
          @swiper-changed="swiperChanged"
        ></home-navigation>
        <home-bottom :firstOpened="firstOpened"></home-bottom>
        <home-sub-menu v-if="!firstOpened" :slideNum="slideNum"></home-sub-menu>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import HomeTopLogo from "@/components/home/base/HomeTopLogo.vue";
import HomeNavigation from "@/components/home/base/HomeNavigation.vue";
import HomeBottom from "@/components/home/base/HomeBottom.vue";
import HomeSubMenu from "@/components/home/base/HomeSubMenu.vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    HomeTopLogo,
    HomeNavigation,
    HomeBottom,
    HomeSubMenu,
  },

  data() {
    return {
      firstOpened: true,
      slideNum: null,
      openChapter: null,
      openNavi: true,
    };
  },

  computed: {
    ...mapState("navigation", ["showNavi"]),
  },

  methods: {
    ...mapMutations("navigation", ["resetStage"]),

    swiperChanged(slideNum) {
      this.firstOpened = false;
      this.slideNum = slideNum;
    },
  },

  mounted() {
    this.resetStage();

    const isDarkMode = () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isDarkMode && !document.body.classList.contains("dark")) {
      document.body.classList.add("dark");
    }
  },
});
</script>

<style scoped>
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ion-color-secondary-tint);
}
</style>
