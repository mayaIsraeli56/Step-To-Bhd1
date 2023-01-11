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
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
  .sign > .action {
    font-size: 2.5vh;
  }
  .sign > .content {
    font-size: 7vh;
    font-weight: bold;
    padding: 0vh 10vw 3vh 10vw;
  }
  </style>
  