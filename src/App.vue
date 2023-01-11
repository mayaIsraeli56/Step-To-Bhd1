<template>
  <ion-app>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" appear>
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </ion-app>
</template>

<script lang="ts">
import { IonApp } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
  },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
