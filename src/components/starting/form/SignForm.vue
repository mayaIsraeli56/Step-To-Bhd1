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

import { db } from "@/firebase/index";
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
      await getDocs(collection(db, "chapter1"));
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0 !important;
}
sign-form-heading {
  margin-top: 4%;
  margin-bottom: 0;
  padding: 0 10% 3% 10%;
  background-color: aliceblue;
  height: 10%;
  width: 50%;
}

img {
  margin-top: 6%;
  width: 20%;
}
</style>
