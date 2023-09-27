<template>
  <div class="container" v-if="!chapChosen">
    <card-with-line :title="title">
      <chose-chaptes-circels
        :explanation="explanation"
        :noCircles="noCircles"
        :circlesInfo="circlesInfo"
        :chooseOne="true"
        @circlesChosen="circlesChosen"
      ></chose-chaptes-circels>
      <ion-button @click="choseChap" class="btn" :disabled="chapter == -1"
        >בחרתי
      </ion-button>
    </card-with-line>
  </div>

  <chose-pod-chapter :chapter="chapter" v-else/>
</template>

<script>
import CardWithLine from "@/components/reuse/CardWithLine.vue";
import ChoseChaptesCircels from "@/components/reuse/ChoseChaptesCircels.vue";
import ChapterInfo from "@/json/chapters/ChapterInfo";
import ChosePodChapter from "./ChosePodChapter.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { IonButton } from "@ionic/vue";

export default {
  name: "SubMenu4",
  props: [""],
  components: { CardWithLine, ChoseChaptesCircels, ChosePodChapter, IonButton },

  data() {
    return {
      ChapterInfo: ChapterInfo,
      explanation: [],
      circlesInfo: [],
      noCircles: 10,
      title: "לאיזה נושא תרצו להאזין?",
      chapter: -1,
      disableBtn: true,
      chapChosen: false,
    };
  },

  computed: {
    ...mapState("returning", ["backToSubMenu4"]),
  },

  mounted() {
    for (let i = 0; i < this.noCircles; i++)
      this.circlesInfo[i] = this.ChapterInfo[i].title;
  },

  methods: {
    ...mapMutations("navigation", ["hideNavi", "toggleMiniIcon", "smallNavi"]),
    ...mapActions("returning", ["setReturningFunc"]),
    ...mapActions("podcasts", ["setChapter"]),

    circlesChosen(listOfCircles, chapter) {
      this.chapter = chapter;
    },

    choseChap() {
      this.chapChosen = true;

      this.setReturningFunc(4);
      this.hideNavi();
      this.smallNavi();
      this.setChapter(this.chapter)

      setTimeout(() => {
        this.toggleMiniIcon();
      }, 500);
    },
  },

  watch: {
    backToSubMenu4: {
      handler() {
        if (this.backToSubMenu4) {
          this.chapter = -1;
          this.chapChosen = !this.chapChosen;
        }
      },
    },
  },
};
</script>

<style scoped>
* {
  transition: all 0.5s ease;
}
.container {
  width: 100%;
  height: fit-content;
  border-radius: 2dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4% 0 4%;
  transition: all 0.5s ease;
  font-size: 1.2rem;
  flex-direction: column;
  position: relative;
  top: -6%;
}

.btn {
  --border-radius: 3dvh;
  font-size: 100%;
}
</style>
