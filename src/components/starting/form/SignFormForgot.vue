<template>
  <div class="bkg">
    <ion-card>
      <ion-img :src="img" alt="exit" @click="$emit('closeForgot')"></ion-img>
      <ion-card-header>
        <ion-card-title>אז שכחת סיסמה...</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <reuse-inupt
          :data-index="1"
          :key="1"
          inputText="המייל שלי"
          :ok="!showErorr"
          color="rgb(255, 247, 240)"
          @updateInputs="updateInputs"
        ></reuse-inupt>

        <ion-button @click="checkFiled">שלח לי מייל לאיפוס סיסמה</ion-button>
        <transition appear>
          <p :class="{ 'not-visible': !showErorr}">{{ msg }}</p>
        </transition>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonImg,
} from "@ionic/vue";
import { defineComponent, computed } from "vue";
import ReuseInupt from "@/components/reuse/InputReuse.vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";



export default defineComponent({
  name: "SignFormForgot",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonImg,
    ReuseInupt,
  },
  props: ["oldEmail"],

  setup() {
    const img = computed(() =>
      require("@/assets/media1/openingScreen/cancel.png")
    );
    return { img };
  },

  data() {
    return {
      email: this.oldEmail,
      showErorr: false,
      msg: "מייל שגוי",
    };
  },

  methods: {
    updateInputs(inputSent ) {
      this.email = inputSent;
    },

    checkFiled() {
      let atpos = this.email.indexOf("@");

      if (this.email == "") {
        this.catchProblem("no-email");
      } else if (atpos < 1 || this.email.lastIndexOf(".") - atpos < 2) {
        this.catchProblem("auth/invalid-email");
      } else {
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            this.showErorr = true;
            this.msg = "נשלח מייל לאיפוס!";
            setTimeout(() => {
              this.$emit("closeForgot");
            }, 1200);
          })
          .catch((error) => {
            this.catchProblem(error.code);
          });
      }
    },

    catchProblem(error) {
      this.showErorr = true;
      switch (error) {
        case "no-email":
          this.msg = "מה עם המייל?";
          break;
        case "auth/user-not-found":
          this.msg = "המייל לא קיים במערכת";
          break;
        case "auth/invalid-email":
          this.msg = " אתם בטוחים שהמייל הזה קיים ?";
          break;
        default:
          this.msg = "משהו השתבש נסה שוב";
          break;
      }
    },
  },
});
</script>

<style scoped>
.bkg {
  position: absolute;
  width: 100% !important;
  height: 100%;
  margin: 0 !important;
  padding: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4c4c5058;
  z-index: 2;
}
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}

ion-card-header {
  margin: 0%;
}

ion-button {
  margin: 4%;
}

ion-card {
  position: relative;
  height: 35%;
  width: 80%;
  top: -8%;
  background-color: var(--ion-color-secondary);
  border-radius: 10%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

ion-card-title,
ion-card-subtitle {
  color: var(--ion-color-medium-tint);
  text-shadow: none;
  font-weight: 650;
  font-size: 180%;
}

ion-item {
  border-radius: 4vh;
  width: 60%;
}

ion-card-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

ion-img {
  position: absolute;
  display: block;
  top: 5%;
  right: 5%;
  width: 12%;
  z-index: 3;
  padding: 3%;
  --background-color: rgb(255, 247, 240);
}

p {
  color: var(--ion-color-medium-tint);
  font-size: 140%;
  transition: 1s ease;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.field__input {
  background: var(--ion-color-light);
}

.not-visible {
  opacity: 0;
}
</style>
