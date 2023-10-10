<template>
  <ion-content :class="learnSubSec != null ? 'full-page' : ''" ref="content">
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
          :class="[
            secNum == learnSec
              ? 'chosen-sec section'
              : learnSec != null
              ? 'close'
              : 'section',
          ]"
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
            :ref="'slide' + secNum"
            :class="[
              learnSubSec != null || openSubMenu != secNum ? 'close' : 'open',
              'sub-sec-menu',
            ]"
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
    this.$refs.content.$el.scrollToTop(500);

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
  height: 66dvh;
  transition: all 0.5s ease-in-out;
}

ion-list {
  padding: 0;
  padding-bottom: 10%;
  min-height: 66dvh;
  transition: all 0.5s ease-in-out;
}

.full-page {
  top: -5%;
  height: 90%;
}

.container {
  background-color:transparent;
}
.chosen-sec {
  width: 100%;
  margin-top: 5%;
}

.section {
  min-height: 14dvh;
  margin-top: 5%;
}

.sub-sec-menu {
  transition: all 0.5s ease-in-out;
}
.close {
  clip-path: inset(0 0 100% 0);
  height: 0 !important;
  opacity: 0;
  overflow: hidden;
}

.open {
  clip-path: inset(0);
  height: fit-content;
  opacity: 1;
}
</style>
