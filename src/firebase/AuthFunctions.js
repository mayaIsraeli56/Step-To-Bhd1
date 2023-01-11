/* import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export function AuthFunctions(userData, signOption) {
  let email = userData[0].userInput;
  let password = userData[1].userInput;
  let error;
  let errMsgLoc;

  function checkFileds() {
    let atpos = email.indexOf("@");

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
    error ? catchProblem(error) : sendToFire();
  }
  checkFileds();

  async function sendToFire() {
    if (signOption === "sign-in") {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
          console.log("successfully sign in", data);
          this.$router.push({ name: "Home" });
          return;
        })
        .catch((error) => {
          catchProblem(error.code);
        });
    } else {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
          console.log("regidtered!", data);
          return;
        })
        .then(() => {
          updateProfile(getAuth().currentUser, {
            displayName: userData[3].userInput,
          }).then(() => {
            this.$router.push({ name: "Home" });
          });
        })
        .catch((error) => {
          catchProblem(error.code);
        });
    }
  }

  function catchProblem(error) {
    console.log(error);

    for (let i in userData) {
      userData[i].ok = true;
    }
    let notOk = [];

    switch (error) {
      case "no-email":
        errMsgLoc = "מה עם המייל?";
        notOk.push(0);
        break;
      case "auth/invalid-email":
        errMsgLoc = " אתם בטוחים שהמייל הזה קיים ?";
        notOk.push(0);
        break;
      case "auth/email-already-in-use":
        errMsgLoc = "כתובת המייל כבר תפוסה";
        notOk.push(0);
        break;
      case "no-password":
        errMsgLoc = "מה עם סיסמה?";
        notOk.push(1);
        break;
      case "auth/weak-password":
        errMsgLoc = "הסיסמה לא עומדת ברף - לפחות 6 תווים";
        notOk.push(1);
        break;
      case "auth/invalid-password":
        errMsgLoc = "הסיסמה לא תקינה";
        notOk.push(1);
        break;
      case "auth/wrong-password":
        errMsgLoc = "הסיסמה שגויה";
        notOk.push(1);
        break;
      case "diff-password":
        errMsgLoc = "הסיסמאות לא תואמות";
        notOk.push(1);
        break;
      case "no-ver-password":
        errMsgLoc = "הקלד את הסיסמה שנית";
        notOk.push(2);
        break;
      case "no-name":
        errMsgLoc = "נשמח לדעת מה שמך";
        notOk.push(3);
        break;
      case "auth/user-not-found":
        errMsgLoc = "המשתמש לא קיים";
        notOk.push(0, 1);
        break;
      default:
        errMsgLoc = "משהו השתבש נסה שוב";
        notOk = signOption === "sign-in" ? [0, 1] : [0, 1, 2, 3];
        break;
    }
    notOk.forEach((i) => (userData[i].ok = false));
  }
  return errMsgLoc;
}

/* const AuthFunctions = (userData, signOption) => {
  let email = userData[0].userInput;
  let password = userData[1].userInput;
  let error;

  function checkFileds() {
    let atpos = email.indexOf("@");

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
    error ? catchProblem(error) : sendToFire();
  }
  checkFileds();

  async function sendToFire() {
    if (signOption === "sign-in") {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
          console.log("successfully sign in", data);
          this.$router.push({ name: "Home" });
          return;
        })
        .catch((error) => {
          catchProblem(error.code);
        });
    } else {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((data) => {
          console.log("regidtered!", data);
          return;
        })
        .then(() => {
          updateProfile(getAuth().currentUser, {
            displayName: userData[3].userInput,
          }).then(() => {
            this.$router.push({ name: "Home" });
          });
        })
        .catch((error) => {
          catchProblem(error.code);
        });
    }
  }

  function catchProblem(error) {
    console.log(error);
    for (let i in userData) {
      userData[i].ok = true;
    }
    let notOk = [];

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
  }
}; */
