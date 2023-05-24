<template>
  <transition name="slideD" appear>
    <div class="card-details" v-if="!closeMe">
      <div class="line"></div>

      <div class="sub-container" v-for="(sub, subNum) in subSections" :key="subNum" @click="choseSubSec(subNum)">
        <ion-text class="text-dark-plain num-sub">
          {{ `${secNum + 1}.${subNum + 1}` }}</ion-text
        >
  
        <ion-text class="text-dark-plain title-sub">{{ sub.title }}</ion-text>
      </div>
    </div>
  </transition>
</template>
<script>
import { IonText } from "@ionic/vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "SubSecCards",
  props: ["secNum", "subSections", "closeMe"],
  components: { IonText },

  data() {
    return {};
  },

  methods: {
    ...mapMutations("learning", [
      "changeSec",
      "changeSubSec"
    ]),
    ...mapActions("returning", ["setReturningFunc"]),

    choseSubSec(subSec) {
      this.changeSec(this.secNum);
      this.changeSubSec(subSec);
      this.setReturningFunc(1);
    },

  },

  computed: {
    ...mapState("learning", ["learnSubSec"]),
  },
};
</script>

<style scoped>
.card-details {
  background-color: #fafafa;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  margin-bottom: 5%;
  padding: 2%;
  margin-top: -10%;
  border-radius: 0 0 3vh 3vh;
  z-index: 1;
}

.line {
  width: 120%;
  padding: 0.8%;
  top: -10%;
  background-color: var(--ion-color-secondary-tint);
}

.sub-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  margin: 3% 0;
}

.title-sub {
  font-size: 1rem;
  margin-right: 1.1rem;
  text-align: right;
  width: 100%;
}

.num-sub {
  font-size: 1rem;
  font-weight: 400;
  margin-right: 0.3rem;
}
</style>
