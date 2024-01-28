<template>
  <div
    :class="[secNum == learnSec ? 'chosen-card' : '', 'card']"
    :ref="'card' + secNum"
  >
    <div class="top">
      <ion-text
        class="num text-dark-plain"
        v-if="learnSubSec == null"
        :key="1"
        >{{ secNum + 1 }}</ion-text
      >

      <ion-text class="s-num text-dark-plain" v-else :key="2"
        >{{ secNum + 1 }}.{{ learnSubSec + 1 }}</ion-text
      >

      <ion-text
        :class="[
          secNum == learnSec ? 'title-big' : '',
          'text-dark-plain title',
        ]"
        >{{ sec.title }}

        <ion-text
          class="text-dark-plain title sub-title"
          v-if="learnSubSec != null"
        >
          {{ " - " + sec.subSections[learnSubSec].title }}</ion-text
        >
      </ion-text>

      <transition name="fade" appear>
        <ion-img
          v-if="secNum == learnSec"
          class="setting-icon"
          :src="require(`@/assets/media1/HomePage/setting/${settingSrc}.png`)"
          @click="() => $emit('toggleTextSetting')"
        ></ion-img>
      </transition>
    </div>

    <transition name="slideD-forward" appear>
      <div class="text" v-if="secNum == learnSec">
        <ion-text
          :class="[secNum == learnSec ? 'text-chosen' : '', 'text-dark-plain']"
          :style="{
            fontSize: styleTxtObj.fontSize * 25 + '%',
            lineHeight: styleTxtObj.lineHeight * 25 + '%',
            textAlign: styleTxtObj.textAlign ? `justify` : 'right',
          }"
          v-for="(sub, i) in sec.subSections[learnSubSec].text"
          :key="i"
          >{{ sub }} <br />
          <br
        /></ion-text>
      </div>
    </transition>
  </div>
</template>

<script>
import { IonText, IonImg } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "SecCards",
  components: { IonText, IonImg },
  props: ["secNum", "sec"],
  emits: ["toggleTextSetting"],

  data() {
    return {
      sections: null,
      closeSubMenu: -1,
      smallTitle: true,
    };
  },

  computed: {
    ...mapState("learning", [
      "learnChapter",
      "learnSec",
      "learnSubSec",
      "styleTxtObj",
    ]),

    settingSrc() {
      return document.body.classList.contains("dark") ? "dark" : "light";
    },
  },
};
</script>

<style scoped>
.card {
  background-color: var(--ion-white);
  height: 14dvh;
  width: 85%;
  border-radius: 3dvh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 0%;
  margin-bottom: 4% !important;
  padding: 1% 3%;
  flex-wrap: wrap;
  transition: all 0.5s ease;
}
.chosen-card {
  height: fit-content;
  width: 92%;
  padding-top: 5%;
  margin-top: 5%;
  margin-bottom: 20% !important;
}

.num {
  font-size: 150%;
  font-weight: 600;
  margin-right: 0.3rem;
}
.s-num {
  display: flex;
  flex-wrap: nowrap;
}
.title {
  font-size: 1.1rem;
  margin-right: 1rem;
  text-align: right;
  width: 80%;
  transition: all 0.5s ease;
}

@media only screen and (max-height: 550px) {
  .num {
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    flex-wrap: nowrap;
  }

  .title {
    font-size: 0.8rem;
  }
}

.title-big {
  font-size: 1.3rem;
  font-weight: 700;
}

.sub-title {
  margin-right: 0;
}

.text {
  position: relative;
  width: 100%;
  border-radius: 3dvh;
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: flex-start;
  margin: auto;
  margin-top: 8%;
  margin-bottom: 5%;
  padding: 3%;
  font-size: 80%;
}
.text-chosen {
  direction: rtl;
  text-align: right;
}

.setting-icon {
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  transform: translateY(20%);
}

.top {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
