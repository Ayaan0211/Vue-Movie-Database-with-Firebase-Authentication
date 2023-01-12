import { createRouter, createWebHistory } from "vue-router";
import RootView from "../views/RootView.vue";
import LoginView from "../views/LoginView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import CartView from "../views/CartView.vue";

const routes = [
  {
    path: "/",
    component: RootView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/purchase",
    component: PurchaseView,
  },
  {
    path: "/Cart",
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
