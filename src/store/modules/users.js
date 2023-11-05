// modules/users
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default {
  namespaced: true,
  state: {
    email: "",
    password: "",
    passwordVer: "",
    name: "",
    signOption: null,
    isOk: [true, true, true, true],
    errMsg: "",
    isLogged: false,
  },

  getters: {
    data: (state) => state.data,
  },

  mutations: {
    updateSignOption(state, signOption) {
      state.signOption = signOption;
    },

    updateEmail(state, email) {
      state.email = email;
    },

    updatePassword(state, password) {
      state.password = password;
    },

    updateVerify(state, passwordVer) {
      state.passwordVer = passwordVer;
    },
    updateFullName(state, name) {
      state.name = name;
    },
    updateisLogged(state, isLogged) {
      state.isLogged = isLogged;
    },

    updateErrMsg(state, errMsg) {
      state.errMsg = errMsg;
    },

    clearUser(state) {
      state.email = null;
      state.password = null;
      state.passwordVer = null;
      state.name = null;
      state.isOk = [true, true, true, true];
      state.errMsg = null;
      state.isLogged = false;
    },
  },

  actions: {
    async checkingFileds({
      state: { email, password, passwordVer, name, signOption },
      dispatch,
    }) {

      const atpos = email != null && email != "" ? email.indexOf("@") : "";

      if (email == "") {
        await dispatch("catchProblem", "no-email");
        return;
      }
      if (atpos < 1 || email.lastIndexOf(".") - atpos < 2) {
        await dispatch("catchProblem", "auth/invalid-email");
        return;
      }
      if (password == "") {
        await dispatch("catchProblem", "no-password");
        return;
      }
      if (password.length < 6) {
        await dispatch("catchProblem", "auth/weak-password");
        return;
      }

      if (signOption == "sign-up") {
        if (passwordVer == "") {
          await dispatch("catchProblem", "no-ver-password");
          return;
        }
        if (password != passwordVer) {
          await dispatch("catchProblem", "diff-password");
          return;
        }
        if (name == "") {
          await dispatch("catchProblem", "no-name");
          return;
        }
      }
      await dispatch("sendingToFire");
      return;
    },

    async sendingToFire({ state, dispatch }) {
      if (state.signOption === "sign-in") {
        await signInWithEmailAndPassword(getAuth(), state.email, state.password)
          .then((data) => {
            state.isLogged = true;
            console.log("successfully sign in", data);
          })
          .catch(async (error) => {
            await dispatch("catchProblem", error.code);
          });
      } else {
        await createUserWithEmailAndPassword(
          getAuth(),
          state.email,
          state.password
        )
          .then((data) => {
            console.log("regidtered!", data);
            state.isLogged = true;
          })
          .then(async () => {
            await updateProfile(getAuth().currentUser, {
              displayName: state.name,
            }).then(() => {
              state.isLogged = true;
            });
          })
          .catch(async (error) => {
            await dispatch("catchProblem", error.code);
            return error.code;
          });
      }
    },

    catchProblem({ state }, error) {
      console.log(error);
      for (const i in state.isOk) {
        state.isOk[i] = true;
      }
      switch (error) {
        case "no-email":
          state.errMsg = "מה עם המייל?";
          state.isOk[0] = false;
          break;
        case "auth/invalid-email":
          state.errMsg = " אתם בטוחים שהמייל הזה קיים ?";
          state.isOk[0] = false;
          break;
        case "auth/email-already-in-use":
          state.errMsg = "כתובת המייל כבר תפוסה";
          state.isOk[0] = false;
          break;
        case "no-password":
          state.errMsg = "מה עם סיסמה?";
          state.isOk[1] = false;
          break;
        case "auth/weak-password":
          state.errMsg = "הסיסמה לא עומדת ברף - לפחות 6 תווים";
          state.isOk[1] = false;
          break;
        case "auth/invalid-password":
          state.errMsg = "הסיסמה לא תקינה";
          state.isOk[1] = false;
          break;
        case "auth/wrong-password":
          state.errMsg = "הסיסמה שגויה";
          state.isOk[1] = false;
          break;
        case "diff-password":
          state.errMsg = "הסיסמאות לא תואמות";
          state.isOk[1] = false;
          state.isOk[2] = false;
          break;
        case "no-ver-password":
          state.errMsg = "הקלד את הסיסמה שנית";
          state.isOk[2] = false;
          break;
        case "no-name":
          state.errMsg = "נשמח לדעת מה שמך";
          state.isOk[3] = false;
          break;
        case "auth/user-not-found":
          state.errMsg = "המייל לא קיים במערכת";
          state.isOk[0] = false;
          break;
        default:
          state.errMsg = "משהו השתבש נסה שוב";
          for (const i in state.isOk) {
            state.isOk[i] = false;
          }
          break;
      }
    },
  },
};
