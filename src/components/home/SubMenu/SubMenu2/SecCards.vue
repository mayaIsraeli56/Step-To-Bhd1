<template>
  <div
    :class="[secNum == learnSec ? 'chosenCard' : '', 'card']"
    :ref="'card' + secNum"
  >
    <ion-text class="text-dark-plain num">{{ secNum + 1 }}</ion-text>
    <ion-text class="text-dark-plain title">{{ sec.title }}</ion-text>

    <div class="text" v-if="secNum == learnSec"> 
      <ion-text class="text-dark-plain" v-for="(sub, i) in sec.subSections[learnSubSec].text" :key="i" >{{sub}}</ion-text>
      <br/>
    </div>
  </div>
</template>
<script>
import { IonText } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "SecCards",
  components: { IonText },
  props: ["secNum", "sec"],

  data() {
    return {
      sections: null,
      closeSubMenu: -1,
    };
  },

  computed: {
    ...mapState("learning", ["learnChapter", "learnSec", "learnSubSec"]),
  },

};
</script>

<style scoped>
.card {
  background-color: #fafafa;
  height: 14vh;
  width: 85%;
  border-radius: 3vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-top: 5%;
  margin-bottom: 1.8%;
  padding: 1% 3%;
  flex-wrap: wrap;
}

.num {
  font-size: 2.5rem;
  font-weight: 600;
  margin-right: 2.5vw;
}
.title {
  font-size: 1.1rem;
  margin-right: 6vw;
  text-align: right;
  width: 80%;
}

.chosenCard {
  margin: auto;
  width: 92%;
  height: 100%;
}

.text {
  position: relative;
  width: 100%;
}
</style>
