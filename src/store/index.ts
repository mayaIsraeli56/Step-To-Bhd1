import { createStore } from "vuex";
import users from "./modules/users";
import learning from "./modules/learning";
import returning from "./modules/returning";
import navigation from "./modules/navigation";
import podcasts from "./modules/podcasts";
import games from "./modules/games";

export default createStore({
  modules: {
    users,
    learning,
    returning,
    navigation,
    games,
    podcasts,
  },
});
