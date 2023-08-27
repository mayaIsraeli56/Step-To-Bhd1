<template>
  <div class="header">
    <ion-img
      class="mini-icon"
      :src="require(`@/assets/media1/HomePage/chapter-logo/${chapter+1}.png`)"
    ></ion-img>
    <div class="text-box">
      <ion-text class="text-dark-plain text" color="medium"> משמיע הסכת</ion-text>
      <ion-text class="text-dark-plain name"> {{title}}</ion-text>
    </div>
  </div>
</template>

<script>
import ChapterInfo from "@/json/chapters/ChapterInfo";
import { IonText, IonImg } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "PodcastHeader",
  props: [""],
  components: { IonText, IonImg },

  data() {
    return {
      ChapterInfo: ChapterInfo,
      title: "",
    };
  },

  mounted() {
    this.title =
      ` פרק ` +
      (this.chapter + 1) +
      "\t - \t" +
      this.ChapterInfo[this.chapter].title;
  },

  computed: {
    ...mapState("podcasts", ["chapter"]),
  },

  methods: {},
};
</script>

<style scoped>
.header {
    width: 95%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

}
.mini-icon {
  position: relative;
  transition: all 1s ease;
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 100%;
  padding: 3%;
  background-color: var(--ion-color-secondary-contrast);
}

.text-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 5%;

}

.text {
    font-weight: 600;
    font-size: 1rem;
    opacity: 0.8;
}
.name {
    font-weight: 700;
}
</style>
