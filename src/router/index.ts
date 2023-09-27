import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import StartingFlow from "../views/StartingFlow.vue";
import HomePage from "../views/HomePage.vue";
import { getAuth } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
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
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
if(to.matched.some((record) => record.meta.requireAuth)) {
  if(auth != null) {
    next();
  } else {
    alert("Please login first");
    next("/")
  }
}else {
  next();
}
})

export default router;
