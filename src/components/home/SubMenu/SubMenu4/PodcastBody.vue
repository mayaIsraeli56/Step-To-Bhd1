<template>
  <div class="body">
    <div :style="cssProps" class="photo">
      <audio-timing-menu></audio-timing-menu>
    </div>

    <ion-text class="text-dark-plain text"
      >{{ subChapter + 1 }} - {{ title }}
    </ion-text>
    <audoi-func></audoi-func>
  </div>
</template>

<script>
import AudoiFunc from "./AudioFunc.vue";
import AudioTimingMenu from "./AudioTimingMenu.vue";
import { IonText } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "PodcastBody",
  components: { AudoiFunc, AudioTimingMenu, IonText },

  data() {
    return {
      isPlaying: false,
      cssProps: {},
    };
  },

  computed: {
    ...mapState("podcasts", ["chapter", "subChapter"]),

    data() {
      return require(`@/json/chapters/chapter${this.chapter + 1}`);
    },

    title() {
      return this.data.sections[this.subChapter].title;
    },
  },

  mounted() {
    this.cssProps = {
      backgroundImage: `url(${require(`@/assets/media1/HomePage/chapter-logo/${
        this.chapter + 1
      }.png`)})`,
    };
  },
};
</script>

<style scoped>
.body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.photo {
  position: relative;
  transition: all 1s ease;
  border-radius: 3dvh;
  width: 95%;
  height: 13rem;
  z-index: 2;
  background-color: var(--ion-color-warning);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2% 0%;
  background-repeat: no-repeat;
  background-size: 7rem;
  background-position: center;
}

ion-img::part(image) {
  width: 50%;
  height: 190%;
}

.text {
  background-color: var(--ion-color-secondary);
  font-weight: 700;
  width: 95%;
  padding: 2%;
  border-radius: 3dvh;
  margin: 2% 0%;
  font-size: 1rem;
}
</style>
