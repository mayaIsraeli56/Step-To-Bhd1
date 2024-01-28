<template>
  <transition appear name="fadeA">
    <div class="card">
      <ion-text class="text-dark-plain title"> {{ title }}</ion-text>
      <slot name="header"></slot>
      <div class="line"></div>

      <ion-text class="text-dark-plain text" v-for="(line, i) in text" :key="i">
        {{ line }}</ion-text
      >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { IonText } from "@ionic/vue";

export default {
  name: "CardWithLine",
  props: ["title", "text"],
  components: { IonText },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.card {
  background-color: var(--ion-white);
  width: 100%;
  border-radius: 2dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7% 2%;
  transition: all 0.5s ease;
  font-size: 1.2rem;
  flex-direction: column;
}

.line {
  background-color: var(--ion-color-secondary-tint);
  width: 110%;
  margin: 5% 0;
  height: 0.3rem;
  border-radius: 2dvh;
  height: 0.4rem;
}

.title {
  font-size: 3dvh;
  font-weight: 700;
}
</style>
