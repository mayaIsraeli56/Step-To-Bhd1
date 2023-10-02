<template>
  <div class="on-me">
    <div>Number of online users: {{ numOfOnlineUsers }}</div>
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

    <ion-item>
      <ion-toggle
        :checked="themeToggle"
        @ionChange="toggleChange($event)"
        justify="space-between"
      >
        <ion-text class="text-dark-plain" color="medium"> מצב לילה </ion-text>
      </ion-toggle>
    </ion-item>
  </div>
</template>

<script>
import { IonText, IonButton, IonItem, IonToggle } from "@ionic/vue";
import { getAuth, signOut } from "firebase/auth";

import { defineComponent, ref } from "vue";

import firebase from "@/firebase/index.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
import "firebase/database";

export default defineComponent({
  name: "SubMenu0",
  components: {
    IonButton,
    IonItem,
    IonText,
    IonToggle,
  },

  data() {
    return {
      userName: "",
      numOfOnlineUsers: 0,
    };
  },

  setup() {
    const themeToggle = ref(false);

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Add or remove the "dark" class on the document body
    const toggleDarkTheme = (shouldAdd) => {
      document.body.classList.toggle("dark", shouldAdd);
    };

    // Check/uncheck the toggle and update the theme based on isDark
    const initializeDarkTheme = (isDark) => {
      themeToggle.value = isDark;
      toggleDarkTheme(isDark);
    };

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", (mediaQuery) =>
      initializeDarkTheme(mediaQuery.matches)
    );

    // Listen for the toggle check/uncheck to toggle the dark theme
    const toggleChange = (ToggleCustomEvent) => {
      toggleDarkTheme(ToggleCustomEvent.detail.checked);
    };

    return {
      initializeDarkTheme,
      toggleChange,
      toggleDarkTheme,
      themeToggle,
    };
  },

  async created() {
    const db = getFirestore();
    const onlineUsersRef = doc(db, "innerData", "wmTTzKKtHUUb8dt4KUys");

    try {
      const docSnap = await getDoc(onlineUsersRef);
      this.numOfOnlineUsers = docSnap.data().onlineUsers;
    } catch (error) {
      console.log(error);
    }

    let nOfOnlineUsers = this.numOfOnlineUsers;

    // getAuth().onAuthStateChanged(async function (user) {
    //   if (user) {
    //     await updateDoc(doc(db, "innerData", "wmTTzKKtHUUb8dt4KUys"), {
    //       onlineUsers: nOfOnlineUsers + 1,
    //     });

    //     var ref = firebase.database().ref("onlineState");
    //     ref.onDisconnect().set(false);
    //     // ... sometime later
    //     ref.onDisconnect().cancel();
    //   }
    // });
  },

  mounted() {
    const auth = getAuth();
    const name = auth.currentUser.displayName;
    this.userName = name ? name : "";
  },

  methods: {
    async handleSignOut() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push({ name: "Start" });
      });
    },
  },
});
</script>

<style scoped>
.on-me {
  position: relative;
  top: -5%;
  display: flex;
  flex-direction: column;
  padding: 0% 10%;
  justify-content: center;
  align-items: center;
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
  --border-radius: 4dvh;
  width: 100%;
}

ion-item {
  margin-top: 15%;
  --background: none;
  width: 60%;
}

ion-toggle {
  --background-color: none;
}
</style>
