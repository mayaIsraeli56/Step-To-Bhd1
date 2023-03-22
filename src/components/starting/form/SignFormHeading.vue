<template>
  <h2 class="animate__animated animate__fadeIn" ref="h2">{{ headign }}</h2>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignFormHeading",
  props: ["signOption", "triggerH2"],

  data() {
    return {
      headign: "",
      opened: false,
      animDur: 800,
    };
  },
  
  watch: {
    signOption: {
      handler() {
        this.$refs.h2.classList.toggle("animate__fadeIn");
        this.$refs.h2.classList.toggle("animate__fadeOut");
        setTimeout(() => {
          this.$refs.h2.classList.toggle("animate__fadeIn");
          this.$refs.h2.classList.toggle("animate__fadeOut");
        }, this.animDur);
      },
    },
    triggerH2: {
      handler() {
        let delay;
      this.opened ? (delay = this.animDur) : (delay = 0);
      setTimeout(() => {
        this.signOption === "sign-in"
          ? (this.headign = "התחברות")
          : (this.headign = "הרשמה");
      }, delay);
      this.opened = true;
      },
    },
  },
});
</script>

<style scoped>
h2 {
  font-size: 3rem;
  font-weight: bold;
  --animate-duration: 0.8s;
}
</style>
