<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-content-start no-scroll">
      <div class="back">
        <home-top-logo :firstOpened="firstOpened" :slideNum="slideNum"></home-top-logo>
        <home-navigation v-if="openNavi" @swiper-changed="swiperChanged"></home-navigation>
        <home-bottom ref="bottom" :firstOpened="firstOpened"></home-bottom>
        <home-sub-menu v-if="!firstOpened" :slideNum="slideNum"></home-sub-menu>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import HomeTopLogo from "@/components/home/HomeTopLogo.vue";
import HomeNavigation from "@/components/home/HomeNavigation.vue";
import HomeBottom from "@/components/home/HomeBottom.vue";
import HomeSubMenu from "@/components/home/HomeSubMenu.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "HomePage",
  components: { IonContent, IonPage, HomeTopLogo, HomeNavigation, HomeBottom, HomeSubMenu},

  data() {
    return {
      firstOpened: true,
      slideNum: null,
      openChapter: null,
      openNavi: true
    };
  },

  computed: mapState(["learnChapter"]),

  methods: {
    swiperChanged(slideNum) {
      console.log("g")
      this.firstOpened = false;
      this.slideNum = slideNum;
    },
  },

  watch: {
    learnChapter: {
      handler() {
        this.openNavi = !this.openNavi
      },
    },
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
