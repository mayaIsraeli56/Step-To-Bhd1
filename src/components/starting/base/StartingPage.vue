<template>
  <opening-animation v-if="!toClose" :timeForScreen="timeForScreen">
  </opening-animation>
  <connecting-users
    :signOption="signOption"
    v-else
    @signOptChanged="changeSignOpt"
  >
  </connecting-users>
  <background-animation
    :signOption="signOption"
    :openingTime="timeForScreen"
  ></background-animation>
</template>

<script>
import OpeningAnimation from "./OpeningAnimation.vue";
import ConnectingUsers from "./ConnectingUsers.vue";
import BackgroundAnimation from "./BackgroundAnimation.vue";
import { mapMutations, mapState } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "StartingPages",
  components: {
    OpeningAnimation,
    ConnectingUsers,
    BackgroundAnimation,
  },
  data() {
    return {
      toClose: false,
      timeForScreen: 5000,
      lessTimeIfLogged: 1000,
      signOption: null,
    };
  },

  computed: {
    ...mapState("users", ["isLogged"]),
  },


  mounted() {
    let auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user != null)  { // there have been a change - user logged
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, this.timeForScreen - this.lessTimeIfLogged);
        this.updateisLogged(true);
      } else if (user == null) {
        this.updateisLogged(false);
      }
    });

    setTimeout(() => {
      this.toClose = true;
    }, this.timeForScreen);
  },
  methods: {
    ...mapMutations("users", ["updateSignOption", "updateisLogged"]),

    changeSignOpt(signOption) {
      this.updateSignOption(signOption);
      this.signOption = signOption;
    },
  },
};
</script>
