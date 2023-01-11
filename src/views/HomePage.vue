<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-content-start no-scroll">
      <div class="back">
        <home-top-logo></home-top-logo>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import HomeTopLogo from "@/components/home/HomeTopLogo.vue";

export default defineComponent({
  name: "HomePage",
  components: { IonContent, IonPage, HomeTopLogo },
});


</script>

<style scoped>

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--ion-color-light);
}
</style>
