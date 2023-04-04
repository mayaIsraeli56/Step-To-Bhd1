import { createStore } from "vuex";
import users from "./modules/users";
import learning from "./modules/learning";

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
  },
});
