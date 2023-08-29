<template>
  <div class="time">
    <ion-text class="text-dark-plain curr">4:50 </ion-text>

    <div class="progress-bar">
      <div class="progress"></div>
    </div>

    <ion-text class="text-dark-plain end">12:50 </ion-text>
  </div>
</template>

<script>
import { IonText } from "@ionic/vue";

export default {
  name: "AudoiTiming",
  components: { IonText },
  props: [""],

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.time {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0%;
  flex-direction: row-reverse;
}

.progress-bar {
  width: 65%;
  height: 0.25rem;
  border-radius: 2vh;
  background-color: var(--ion-color-warning-shade);
  display: flex;
  justify-content: flex-end;
}

.progress {
  position: relative;
  left: 0;
  width: 65%;
  border-radius: 2vh;
  background-color: var(--ion-color-primary-contrast);
}
</style>
