<template>
  <div class="body">
    <ion-img
      class="photo"
      :src="require(`@/assets/media1/HomePage/chapter-logo/${1}.png`)"
    ></ion-img>

    <ion-text class="text-dark-plain text"
      >{{ subChapter + 1 }} - {{ title }}
    </ion-text>
    <!-- <audio :src="require(`@/assets/audio/chap${chapter+1}/${subChapter+1}.mp3`)" controls ref="mp3" ></audio> -->
    <audoi-timing></audoi-timing>
    <audoi-func></audoi-func>
  </div>
</template>

<script>
import AudoiTiming from "./AudioTiming.vue";
import AudoiFunc from "./AudioFunc.vue";
import { IonText, IonImg } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "PodcastBody",
  components: { AudoiTiming, AudoiFunc, IonText, IonImg },

  data() {
    return {
      title: "",
      data: [],
      isPlaying: false,
    };
  },
  mounted() {
    this.data = require(`@/json/chapters/chapter${this.chapter + 1}`);
    this.title = this.data.sections[this.subChapter].title;
  },

  computed: {
    ...mapState("podcasts", ["chapter", "subChapter"]),
  },

  methods: {},
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
  border-radius: 3vh;
  padding: 3%;
  width: 95%;
  z-index: 2;
  background-color: #695f4446;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2% 0%;
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
  border-radius: 3vh;
  margin: 2% 0%;
}
</style>
