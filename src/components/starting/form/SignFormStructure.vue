<template>
  <transition-group
    tag="div"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    appear
    mode="out-in"
    class="inputs"
  >
    <reuse-inupt
      v-for="(data, index) in userData"
      :data-index="index"
      :key="index"
      :inputText="data.inputText"
      :ok="data.ok"
      @updateInputs="updateInputs"
    ></reuse-inupt>

    <ion-button
      v-if="btnOn"
      color="light"
      class="signbtn"
      :data-index="4"
      @click.prevent="checkFileds"
      >{{ text[1] }}
    </ion-button>

    <div v-if="btnOn && forgetBtn"  :data-index="5">
      <ion-button
        class="forgot"
        fill="clear"
        @click="forgotPass = true"
        >שכחתי סיסמה
      </ion-button>
    </div>

    <p v-if="errMsg && btnOn && !forgotPass" :data-index="4">{{ errMsg }}</p>
    <div class="arrow" :data-index="6" v-if="btnOn">
      {{ text[0] }}
      <arrow-animation :deg="0"></arrow-animation>
    </div>
  </transition-group>

  <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" appear
    ><sign-form-forgot
      v-if="forgotPass"
      @closeForgot="forgotPass = false"
      :oldEmail="userData[0].userInput"
    ></sign-form-forgot
  ></transition>
</template>

<script>
import ReuseInupt from "@/components/reuse/InputReuse.vue";
import SignFormForgot from "./SignFormForgot.vue";
import ArrowAnimation from "../intro/ArrowAnimation.vue";
import { defineComponent } from "vue";
import { IonButton } from "@ionic/vue";
import gsap from "gsap";
import { mapActions, mapMutations } from "vuex";

export default defineComponent({
  name: "SignFormStructure",
  components: {
    ReuseInupt,
    SignFormForgot,
    ArrowAnimation,
    IonButton,
  },
  emits: ["signOptChanged"],
  props: ["signOption"],

  data() {
    return {
      inputsText: [],
      fullUserData: [
        { input: "email", inputText: "המייל שלי", userInput: "", ok: true },
        { input: "password", inputText: "הסיסמה שלי", userInput: "", ok: true },
        { input: "verify", inputText: "אימות הסיסמה", userInput: "", ok: true },
        {
          input: "fullName",
          inputText: "קראו לי...",
          userInput: "",
          ok: true,
        },
      ],
      userData: [],
      btnOn: false,
      text: [],
      forgotPass: false,
    };
  },

  computed: {
    isOk() {
      return this.$store.state.users.isOk;
    },

    errMsg() {
      return this.$store.state.users.errMsg;
    },

    isLogged() {
      return this.$store.state.users.isLogged;
    },

    forgetBtn() {
      return this.signOption == "sign-in";
    },
  },

  setup() {
    const beforeEnter = (el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(2vh)";
    };

    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: done,
        delay: el.dataset.index * 0.25,
      });
    };

    const leave = (el, done) => {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        y: 10,
        duration: 0.8,
        onComplete: done,
        delay: (3 - el.dataset.index) * 0.5,
      });
    };

    return { beforeEnter, enter, leave };
  },

  methods: {
    // get action "check" from module users - now you can access it with this.check
    ...mapActions("users", ["checkingFileds"]),
    ...mapMutations("users", [
      "updateEmail",
      "updatePassword",
      "updateVerify",
      "updateFullName",
      "updateErrMsg",
    ]),

    updateInputs(inputSent, inputKey) {
      this.userData[inputKey].userInput = inputSent;

      // calling updateEmail/updatePassword/updatePasswordVer/updateName from store/users according to the input type
      let inputType = this.fullUserData[inputKey].input;
      let mutationFunction = `update${inputType.charAt(0).toUpperCase()}`;
      mutationFunction += `${inputType.substring(1)}`;
      this[mutationFunction](this.userData[inputKey].userInput);
    },

    // get triggered from the submitting - handle form
    checkFileds() {
      this.checkingFileds().then(() => {
        // After login or after error
        this.userData.forEach((inputFiled, index) => {
          inputFiled.ok = this.isOk[index];
        });
        if (this.isLogged) {
          this.$router.push({ name: "Home" });
        }
      });
    },
  },

  watch: {
    signOption: {
      immediate: true,
      handler() {
        console.log(this.signOption);
        this.btnOn = !this.btnOn;
        this.$emit("signOptChanged");

        this.userData = [];
        let dataRequired = this.signOption === "sign-in" ? 2 : 4;
        for (let i = 0; i < dataRequired; i++) {
          this.userData.push(this.fullUserData[i]);
        }

        if (this.signOption === "sign-in") {
          this.text = ["עדיין אין לי משתמש", "התחבר"];
        } else {
          this.text = ["אני כבר רשום", "הירשם"];
        }
        setTimeout(() => {
          this.btnOn = true;
        }, 500);
      },
    },
  },
});
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2%;
}

.inputs {
  width: 70%;
}

ion-button.signbtn {
  --background: var(--ion-color-light);
  padding: 0;
  margin: 20%;
  margin-top: 6%;
  margin-bottom: 0vh;
  font-weight: 600;
  font-size: 90%;
  --border-radius: 2vh;
  height: 5vh !important;
}

.arrow {
  position: absolute;
  align-self: center;
  bottom: 2%;
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 100%;
  color: var(--ion-color-secondary);
}
.arrow > div {
  width: 20%;
}

p {
  width: 100%;
  text-align: center;
  font-size: 92%;
  margin-left: auto;
  margin-right: auto;
}

.forgot {
  text-decoration: underline;
  font-size: 80%;
  margin-bottom: 0;
  --border-radius: 10vh;
}

.forgot:active {
  color: var(--ion-color-secondary);
}

.btn-box {
  display: flex;
  flex-direction: column;
}
</style>
