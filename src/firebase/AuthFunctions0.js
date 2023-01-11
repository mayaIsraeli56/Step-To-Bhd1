/* // draft -

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

let AuthFunctions = {
  checkFileds(userData, signOption) {
    let errMsg = "";
    let email = userData[0].userInput;
    let password = userData[1].userInput;
    let atpos = email.indexOf("@");
    let error;

    if (email == "") {
      error = "no-email";
    } else if (atpos < 1 || email.lastIndexOf(".") - atpos < 2) {
      error = "auth/invalid-email";
    } else if (password == "") {
      error = "no-password";
    }

    if (signOption === "sign-up") {
      let name = userData[3].userInput;
      if (password.length < 6) {
        error = "auth/weak-password";
      } else if (userData[2].userInput == "") {
        error = "no-ver-password";
      } else if (password != userData[2].userInput) {
        error = "diff-password";
      } else if (name == "") {
        error = "no-name";
      }
    }
    error
      ? this.catchProblem(error, userData, signOption)
      : this.sendToFire(userData, signOption);
  },

  sendToFire(userData, signOption) {
    if (signOption === "sign-in") {
      signInWithEmailAndPassword(
        getAuth(),
        userData[0].userInput,
        userData[1].userInput
      )
        .then((data) => {
          console.log("successfully sign in", data);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          this.catchProblem(error.code, userData, signOption);
        });
    } else {
      createUserWithEmailAndPassword(
        getAuth(),
        userData[0].userInput,
        userData[1].userInput
      )
        .then((data) => {
          console.log("regidtered!", data);
        })
        .then(() => {
          updateProfile(getAuth().currentUser, {
            displayName: userData[3].userInput,
          }).then(() => {
            this.$router.push({ name: "Home" });
          });
        })
        .catch((error) => {
          this.catchProblem(error.code, userData, signOption);
        });
    }
  },

  catchProblem(error, userData, signOption) {
    for (let i in userData) {
      userData[i].ok = true;
    }
    let notOk = [];
    let errMsg = "";
    switch (error) {
      case "no-email":
        errMsg = "מה עם המייל?";
        notOk.push(0);
        break;
      case "auth/invalid-email":
        errMsg = " אתם בטוחים שהמייל הזה קיים ?";
        notOk.push(0);
        break;
      case "auth/email-already-in-use":
        errMsg = "כתובת המייל כבר תפוסה";
        notOk.push(0);
        break;
      case "no-password":
        errMsg = "מה עם סיסמה?";
        notOk.push(1);
        break;
      case "auth/weak-password":
        errMsg = "הסיסמה לא עומדת ברף - לפחות 6 תווים";
        notOk.push(1);
        break;
      case "auth/invalid-password":
        errMsg = "הסיסמה לא תקינה";
        notOk.push(1);
        break;
      case "auth/wrong-password":
        errMsg = "הסיסמה שגויה";
        notOk.push(1);
        break;
      case "diff-password":
        errMsg = "הסיסמאות לא תואמות";
        notOk.push(1);
        break;
      case "no-ver-password":
        errMsg = "הקלד את הסיסמה שנית";
        notOk.push(2);
        break;
      case "no-name":
        errMsg = "נשמח לדעת מה שמך";
        notOk.push(3);
        break;
      case "auth/user-not-found":
        errMsg = "המשתמש לא קיים";
        notOk.push(0, 1);
        break;
      default:
        errMsg = "משהו השתבש נסה שוב";
        notOk = signOption === "sign-in" ? [0, 1] : [0, 1, 2, 3];
        break;
    }
    notOk.forEach((i) => (userData[i].ok = false));
  },
};

export default AuthFunctions;

/*  checkFileds() {
      let email = this.userData[0].userInput;
      let password = this.userData[1].userInput;
      let atpos = email.indexOf("@");

      if (email == "") {
        this.catchProblem("no-email");
        return;
      }

      if (atpos < 1 || email.lastIndexOf(".") - atpos < 2) {
        this.catchProblem("auth/invalid-email");
        return false;
      }

      if (password == "") {
        this.catchProblem("no-password");
        return;
      }

      if (this.signOption === "sign-up") {
        let name = this.userData[3].userInput;
        if (password.length < 6) {
          this.catchProblem("auth/weak-password");
          return;
        }

        if (this.userData[2].userInput == "") {
          this.catchProblem("no-ver-password");
          return;
        }

        if (password != this.userData[2].userInput) {
          this.catchProblem("diff-password");
          return;
        }

        if (name == "") {
          this.catchProblem("no-name");
          return;
        }
      }
      return this.sendToFire();
    },

    sendToFire() {
      if (this.signOption === "sign-in") {
        signInWithEmailAndPassword(
          getAuth(),
          this.userData[0].userInput,
          this.userData[1].userInput
        )
          .then((data) => {
            console.log("successfully sign in", data);
            this.$router.push({ name: "Home" });
          })
          .catch((error) => {
            this.catchProblem(error.code);
          });
      } else {
        createUserWithEmailAndPassword(
          getAuth(),
          this.userData[0].userInput,
          this.userData[1].userInput
        )
          .then((data) => {
            console.log("regidtered!", data);
          })
          .then(() => {
            updateProfile(getAuth().currentUser, {
              displayName: this.userData[3].userInput,
            }).then(() => {
              this.$router.push({ name: "Home" });
            });
          })
          .catch((error) => {
            this.catchProblem(error.code);
          });
      }
    },

    catchProblem(error) {
      console.log(error);
      for (let i in this.userData) {
        this.userData[i].ok = true;
      }
      let notOk = [];
      switch (error) {
        case "no-email":
          this.errMsg = "מה עם המייל?";
          notOk.push(0);
          break;
        case "auth/invalid-email":
          this.errMsg = " אתם בטוחים שהמייל הזה קיים ?";
          notOk.push(0);
          break;
        case "auth/email-already-in-use":
          this.errMsg = "כתובת המייל כבר תפוסה";
          notOk.push(0);
          break;
        case "no-password":
          this.errMsg = "מה עם סיסמה?";
          notOk.push(1);
          break;
        case "auth/weak-password":
          this.errMsg = "הסיסמה לא עומדת ברף - לפחות 6 תווים";
          notOk.push(1);
          break;
        case "auth/invalid-password":
          this.errMsg = "הסיסמה לא תקינה";
          notOk.push(1);
          break;
        case "auth/wrong-password":
          this.errMsg = "הסיסמה שגויה";
          notOk.push(1);
          break;
        case "diff-password":
          this.errMsg = "הסיסמאות לא תואמות";
          notOk.push(1);
          break;
        case "no-ver-password":
          this.errMsg = "הקלד את הסיסמה שנית";
          notOk.push(2);
          break;
        case "no-name":
          this.errMsg = "נשמח לדעת מה שמך";
          notOk.push(3);
          break;
        case "auth/user-not-found":
          this.errMsg = "המייל לא קיים במערכת";
          notOk.push(0);
          break;
        default:
          this.errMsg = "משהו השתבש נסה שוב";
          notOk = this.signOption === "sign-in" ? [0, 1] : [0, 1, 2, 3];
          break;
      }
      notOk.forEach((i) => (this.userData[i].ok = false));
    },
  }, */
 