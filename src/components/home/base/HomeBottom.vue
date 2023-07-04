<template>
  <transition
  name="custom-classes"
  leave-active-class="animate__animated animate__fadeOut animate__faster"

  >

    <ion-img
      :src="require('@/assets/media1/HomePage/solider-wave.png')"
      :key="0"
      v-if="firstOpened"
    >
    </ion-img>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { IonImg } from "@ionic/vue";

export default defineComponent({
  name: "HomeBottom",
  components: { IonImg },
  props: ["firstOpened"],

});
</script>

<style scoped>

ion-img {
  position: absolute;
  bottom: 0;
  transform: scale(100%);
}

</style>
