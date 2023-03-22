<template>
    <div class="sign">
      <div :class="[this.isSignIn ? 'content' : 'action']">
        {{ this.text[1] }}
      </div>
      <div :class="[!this.isSignIn ? 'content' : 'action']">
        {{ this.text[0] }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignInUp",
    props: ["option"],
    data() {
      return {
        text: [],
        isSignIn: false,
      };
    },
    mounted() {
      if (this.option == "signIn") {
        this.text.push("התחברות");
        this.text.push("כבר באמצע הדרך");
        this.isSignIn = true;
      } else {
        this.text.push("רק מתחילים לצעוד");
        this.text.push("הרשמה");
      }
    },
  };
  </script>
  
  <style scoped>
  .sign {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;
  }
  .sign > .action {
    font-size: 100%;
    padding: 2% 0%;
  }
  .sign > .content {
    font-size: 200%;
    font-weight: bold;
    padding: 0% 10% 0% 10%;
  }
  </style>
  