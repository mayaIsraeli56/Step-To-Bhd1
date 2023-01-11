<template>
  <div class="container">
    <ion-img :src="stepLogoSrc" alt="step-logo" class="step-logo"></ion-img>
    <ion-text>האפליקציה הרשמית של בה"ד אחת</ion-text>
    <ion-img :src="bhdlogoSrc" alt="bhd-logo" class="bhd-logo"></ion-img>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { IonImg, IonText } from "@ionic/vue";

export default defineComponent({
  name: "HomeTopLogo",
  components: { IonImg, IonText },

  data() {
    return {
      circleSrc: require("@/assets/media1/HomePage/top-circel.png"),
      bhdlogoSrc: require("@/assets/media1/openingScreen/bhd-logo.png"),
      stepLogoSrc: require("@/assets/media1/HomePage/horizontal-logo.png"),
    };
  },
});
</script>

<style scoped>

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 18vh;
  background-image: url("@/assets/media1/HomePage/top-circel.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bhd-logo {
  position: relative;
  height: 6.5vh;
  top: 3.25vh;
}

.step-logo {
  position: relative;
  height: 5vh;
  top: 3vh;
}

ion-text {
  position: relative;
  font-size: 1.7vh;
  top: 3.2vh;
  text-shadow: none;
  font-weight: 600;
}
</style>
