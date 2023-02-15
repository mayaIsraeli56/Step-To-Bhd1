<template>
  <div>
    <ion-card>
      <ion-card-header>
        <ion-card-title>אז שכחת סיסמה...</ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-item>
          <ion-input
            color="medium"
            placeholder="המייל שלי"
            lass="ion-label-sign"
            v-model="email"
          ></ion-input>
        </ion-item>
        <ion-img :src="img" alt="exit" @click="$emit('closeForgot')"></ion-img>
        <ion-button @click="checkFiled">שלח לי מייל לאיפוס סיסמה</ion-button>
        <transition appear>
          <p v-if="showErorr">{{ msg }}</p>
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
  IonInput,
  IonItem,
  IonButton,
  IonImg,
} from "@ionic/vue";
import { defineComponent, computed } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default defineComponent({
  name: "SignFormForgot",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonItem,
    IonButton,
    IonImg,
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
            }, 1000);
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
          this.msg = "המייל לא קיים במערכה";
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
div {
  background-color: #4c4c5058;
  width: 100vw !important;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}

ion-card-header {
  margin-top: 4vh;
}

ion-button {
  margin-top: -3vh;
}

ion-card {
  height: 35vh;
  width: 80vw;
  position: relative;
  top: -6vh;
  background-color: var(--ion-color-secondary);
  border-radius: 10%;
}

ion-card-title,
ion-card-subtitle {
  color: var(--ion-color-medium-tint);
  text-shadow: none;
  font-weight: 650;
  font-size: 2.7vh;
}

ion-item {
  border-radius: 4vh;
  width: 60vw;
}

ion-card-content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

ion-img {
  position: relative;
  top: -16vh;
  left: 32vw;
  width: 5vh;
  z-index: 3;
  --background-color: rgb(255, 247, 240);
  padding: 1.5vh;
}

p {
  color: var(--ion-color-medium-tint);
  margin-top: 1vh;
  font-size: 2vh;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
