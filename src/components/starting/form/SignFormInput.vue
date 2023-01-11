<template>
  <ion-item ref="item" :class="[!this.ok ? 'focus' : '', 'ion-item-sign']">
    <ion-input
      color="medium"
      :placeholder="inputText"
      lass="ion-label-sign"
      v-model="inputSent"
      ref="input"
    ></ion-input>
  </ion-item>
</template>

<script>
import { IonInput, IonItem } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignFormInput",
  components: { IonInput, IonItem },
  props: ["inputText", "userData", "userInput", "formSent", "ok"],

  data() {
    return {
      inputSent: "",
      classObject: {
        "ion-item-sign": true,
        focus: !this.ok,
      },
    };
  },

  watch: {
    formSent: {
      handler() {
        // eslint-disable-next-line vue/no-mutating-props
        this.userData[this.$.vnode.key].userInput = this.inputSent;
        if (this.$.vnode.key === this.userData.length - 1) {
          this.$emit("sendToFire");
        }
      },
    },
    ok: {
      handler() {
        if (!this.ok) {
          this.$refs.input.$el.setFocus();
        }
      },
    },
  },
});
</script>

<style scoped>
ion-input {
  --ion-font-family: "assistant";
  --color: var(--ion-color-secondary-contrast);
}

ion-item.ion-item-sign {
  --color: var(--ion-color-secondary-contrast);
  --background: var(--ion-color-secondary);
  --border-radius: 4vh;
  margin: 0.7vh;
}

ion-item.focus {
  --background: #efd6d6;
}
</style>
