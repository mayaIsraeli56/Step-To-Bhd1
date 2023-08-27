<template>
  <transition-group appear name="fadeAbs" >
    <ion-content v-if="subChapter == -1" :key="0">
      <ion-list>
        <div class="box">
          <card-with-line :title="title">
            <chose-chap-btns
              :explanation="explanation"
              :noCircles="noCircles"
              :chapNames="chapNames"
              :chooseOne="true"
              @circlesChosen="circlesChosen"
            />
          </card-with-line>
        </div> </ion-list
    ></ion-content>

    <podcast-player v-else :key="1"></podcast-player>
  </transition-group>
</template>

<script>
import CardWithLine from "@/components/reuse/CardWithLine.vue";
import ChoseChapBtns from "./ChoseChapBtns.vue";
import PodcastPlayer from "./PodcastPlayer.vue";
import ChapterInfo from "@/json/chapters/ChapterInfo";
import { IonContent, IonList } from "@ionic/vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "ChosePodChapter",
  props: ["chapter"],
  components: {
    CardWithLine,
    ChoseChapBtns,
    PodcastPlayer,
    IonContent,
    IonList,
  },

  data() {
    return {
      ChapterInfo: ChapterInfo,
      explanation: ["לחצו לבחירת הפרק להאזנה"],
      chapNames: [],
      noCircles: 10,
      title: "",
      disableBtn: true,
      chapChosen: false,
    };
  },

  mounted() {
    for (let i = 0; i < this.noCircles; i++)
      this.chapNames[i] = this.ChapterInfo[i].title;

    this.title =
      ` פרק ` + (this.chapter + 1) + "\t - \t" + this.chapNames[this.chapter];
  },

  computed: {
    ...mapState("podcasts", ["subChapter"]),
  },

  methods: {
    ...mapActions("podcasts", ["setSubChapter"]),
    ...mapActions("returning", ["setReturningFunc"]),

    circlesChosen(listOfCircles, subChapter) {
      this.setSubChapter(subChapter);
      this.setReturningFunc(5);
    },
  },
};
</script>

<style scoped>
* {
  transition: all 0.5s ease;
}

.box {
  margin: 5% 4%;
  height: 150%;
}

ion-list {
  padding-bottom: 30%;
}

ion-content {
  direction: ltr;
  --ion-background-color: transparent;
  transition: all 0.5s ease-in-out;
}
</style>
