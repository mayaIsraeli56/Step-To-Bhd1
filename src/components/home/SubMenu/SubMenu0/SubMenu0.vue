<template>
  <div class="on-me">
    <div class="text-box">
      <ion-text class="text-dark-plain num" color="medium">
        היי {{ userName }} !</ion-text
      >
      <ion-text class="text-dark-plain" color="medium">
        קצינים לעתיד לומדים כרגע בעזרת בצעד לבה”ד
      </ion-text>
      <ion-text class="text-dark-plain" color="medium">
        אבל אם לא בוער בך להמשיך ולהיות חלק מהם...
      </ion-text>
    </div>
    <ion-button @click="handleSignOut" class="btn" size="large"
      >התנתק</ion-button
    >
  </div>
</template>

<script>
import { IonText, IonButton } from "@ionic/vue";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "SubMenu0",
  props: [""],
  components: { IonText, IonButton },

  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    const auth = getAuth();
    this.userName = auth.currentUser.displayName;
  },

  methods: {
    async handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push({ name: "Start" });
      });
    },
  },
};
</script>

<style scoped>
.on-me {
  position: relative;
  top: -5%;
}

.text-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5%;
}
.text-dark-plain {
  font-size: 1.2rem;
  margin: 1% 0;
}

.num {
  font-size: 2rem;
  font-weight: 900;
  --background: none;
  color: var(--ion-color-medium);
  text-shadow: -0.2rem 0.1rem 0.2rem var(--ion-color-warning-tint);
}

.btn {
  --border-radius: 2dvh;
}
</style>
