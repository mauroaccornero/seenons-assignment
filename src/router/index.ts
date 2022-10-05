import { createRouter, createWebHistory } from "vue-router";
import StopDetail from "../components/StopDetail.vue";
import StopsList from "../components/StopsList.vue";
import OrderList from "../components/OrderList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/stop/:id/orders",
      name: "orderList",
      component: OrderList,
      strict: true,
    },
    {
      path: "/stop/:id",
      name: "stopDetail",
      component: StopDetail,
      strict: true,
    },
    {
      path: "/",
      name: "home",
      component: StopsList,
      strict: true,
    },
  ],
});

export default router;
