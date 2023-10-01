<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-content-start no-scroll">
      <starting-pages> </starting-pages>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import StartingPages from "@/components/starting/base/StartingPage.vue";

export default defineComponent({
  name: 'StartingFlow',
  components: {
    IonContent,
    IonPage,
    StartingPages,
  } 
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
