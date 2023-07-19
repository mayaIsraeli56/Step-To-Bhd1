<template>
  <ion-content :class="learnSubSec != null ? 'full-page' : ''">
    <ion-list>
      <transition-group
        tag="div"
        class="container"
        appear
        name="fadeA"
        mode="out-in"
      >
        <div
          v-for="(sec, secNum) in sections"
          :key="secNum"
          class="section"
          :class="[secNum == learnSec ? 'chosen-sec' : '', 'section']"
          :ref="'sec' + secNum"
        >
          <sec-cards
            :secNum="secNum"
            :sec="sec"
            @click="openSubSecCard(secNum)"
            v-if="secNum == learnSec || learnSec == null"
          ></sec-cards>

          <sub-sec-cards
            :secNum="secNum"
            :subSections="sec.subSections"
            :key="secNum + 1"
            :ref="'slide' + secNum"
            class="sub-sec-menu"
            v-if="learnSubSec == null"
          >
          </sub-sec-cards>
        </div>
      </transition-group>
    </ion-list>
  </ion-content>
</template>
<script>
import SubSecCards from "./SubSecCards.vue";
import SecCards from "./SecCards.vue";
import { IonContent, IonList } from "@ionic/vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "SubSecMenu",
  components: { SubSecCards, SecCards, IonContent, IonList },

  data() {
    return {
      sections: null,
      unableOpening: true,
    };
  },

  computed: {
    ...mapState("learning", [
      "learnChapter",
      "learnSec",
      "learnSubSec",
      "openSubMenu",
    ]),
    ...mapState("returning", ["backToSubSecMenu"]),
  },

  methods: {
    ...mapMutations("learning", ["openingSubMenu"]),

    openSubSecCard(chosenSlide) {
      if (this.unableOpening) {
        return;
      }
      
      if (chosenSlide == this.openSubMenu) {
        this.openingSubMenu(-1);
      } else {
        this.openingSubMenu(chosenSlide);
      }
    },
  },

  mounted() {
    this.openingSubMenu(-1);

    import(`@/json/chapters/chapter${this.learnChapter + 1}`).then((module) => {
      this.sections = module.sections;
    });

    setTimeout(() => {
      this.unableOpening = false;
    }, 500);
  },
};
</script>

<style scoped>
ion-content {
  direction: ltr;
  --ion-background-color: transparent;
  height: 66vh;
  transition: all 1s ease-in-out;
}

ion-list {
  padding: 0;
  min-height: 66vh;
  transition: all 1s ease-in-out;
}
.section {
  transition: all 1s ease;
}
.full-page {
  top: -3.1vh;
  height: 90%;
}
.chosen-sec {
  width: 100%;
  margin-top: 5%;
}
</style>
