import { createRouter, createWebHistory } from "vue-router";
import StopDetail from "../components/StopDetail.vue";
import StopsList from "../components/StopsList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: StopsList,
    },
    {
      path: "/stop/:id",
      name: "stopDetail",
      component: StopDetail,
    },
  ],
});

export default router;
