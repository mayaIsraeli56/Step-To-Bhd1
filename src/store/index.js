import { createStore } from "vuex";
import users from "./modules/users";
import learning from "./modules/learning";
import returning from "./modules/returning";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
   
  },

  actions: {},

  modules: {
    users,
    learning,
    returning,
  },
});
