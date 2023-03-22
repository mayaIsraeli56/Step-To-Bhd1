<template>
  <ion-app id="ion-app" ref="ionApp">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" appear>
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </ion-app>
</template>

<script lang="js">
import { IonApp } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
  },

  mounted() {
    this.myEventHandler();
    window.addEventListener("resize", this.myEventHandler);
  },
  unmounted() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {

   let width= window.innerWidth
   let height= window.innerHeight

   if(!(width <= 600 && height<= 1000 && (height/width) <= 3.5 && (height/width) >=1.5)) {
      this.$refs.ionApp.$el.style.maxHeight = `${Math.min(height, (width*2))}px`
      this.$refs.ionApp.$el.style.maxWidth= `${Math.min(width, (height*0.5))}px`
   }
      this.$refs.ionApp.$el.style.margin= `auto`
    },
  },
});
</script>

<style scoped>
.ion-app {
  display: block;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
