import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import StartingFlow from "../views/StartingFlow.vue";
import HomePage from "../views/HomePage.vue";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    redirect: "/start",
  },
  {
    path: "/start", // animation
    name: "Start",
    component: StartingFlow,
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  }
});

router.beforeEach(async (to) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user == null && to.name !== "Start") return { name: "Start" };
});

export default router;
