<template>
  <div class="form-page">
    <img src="@/assets/media1/openingScreen/STB-logo.png" />
    <sign-form-heading :signOption="signOption" :triggerH2="triggerH2"></sign-form-heading>
    <sign-form-structure
      :signOption="signOption"
      @signOptChanged="triggerH2++"
    ></sign-form-structure>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SignFormStructure from "./SignFormStructure.vue";
import SignFormHeading from "./SignFormHeading.vue";
import { db } from "@/firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";

export default defineComponent({
  name: "SignForm",
  components: { SignFormStructure, SignFormHeading },
  props: ["signOption"],

  data() {
    return {
      triggerH2: 0,
    };
  },

  mounted() {
    async () => {
      const querySnapshot = await getDocs(collection(db, "chapter1"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };
  },
  
});
</script>

<style scoped>
.form-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
sign-form-heading {
  margin-top: 5vh;
  margin-bottom: 0vh;
  padding: 0vh 10vw 3vh 10vw;
  background-color: aliceblue;
  height: 10vh;
  width: 50vw;
}

img {
  margin-top: 6vh;
  width: 12vh;
}
</style>
