<template>
  <transition name="fadeB" appear>
    <ion-content v-if="timingMenu" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col class="title ion-text-start" size="auto">תת נושאים</ion-col>
        </ion-row>
        <ion-row
          v-for="(sub, i) in subInfo"
          :key="i"
          @click="updateTime(parseInt(sub.min)*60 + parseInt(sub.sec) )"
        >
          <ion-col class="ion-text-start time" size="3">{{
            formatTime(sub.min, sub.sec)
          }}</ion-col>
          <ion-col class="ion-text-start name" size="9">{{ sub.name }}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </transition>
</template>

<script>
import { IonContent, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent, computed } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "AudioTimingMenu",
  components: {
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
  },

  data() {
    return {};
  },

  setup() {
    const img = computed(() =>
      require("@/assets/media1/openingScreen/cancel.png")
    );
    return { img };
  },

  computed: {
    ...mapState("podcasts", ["chapter", "subChapter", "timingMenu"]),

    chapData() {
      return require(`@/json/chapters/chapter${this.chapter + 1}`);
    },

    subChapt() {
      return this.chapData.sections[this.subChapter].subSections;
    },

    subInfo() {
      // full of objects {name:"", min:"", sec: ""}
      let info = [];
      this.subChapt.forEach((sub) => {
        info.push({
          name: `${sub.title}`,
          min: `${sub.minute}`,
          sec: `${sub.second}`,
        });
      });

      return info;
    },
  },

  methods: {
    ...mapActions("podcasts", ["updateTime"]),

    formatTime(min, sec) {
      return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    },
  },

});
</script>

<style scoped>
ion-content {
  position: relative;
  border-radius: 3dvh;
  overflow: hidden;
  direction: ltr;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: var(--ion-color-medium-tint);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
ion-grid {
  width: 100%;
}

.title {
  font-weight: 700;
  align-self: right;
}
.time {
  font-weight: 650;
  font-size: 1rem;
  color: var(--ion-color-secondary-shade);
}
.name {
  font-size: 1rem;
}
ion-row:hover:not(:first-child) {
  background-color: var(--ion-color-primary-contrast);
}

.fadeB-enter-active,
.fadeB-leave-active {
  transition: opacity 0.5s;
}
.fadeB-enter-from, .fadeB-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
