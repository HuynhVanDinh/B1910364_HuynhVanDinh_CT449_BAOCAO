import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },

  {
    path: "/login/",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/addService/",
    name: "addService",
    component: () => import("@/views/addService.vue"),
  },
  {
    path: "/editService/:id",
    name: "editService",
    component: () => import("@/views/editService.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
  },
  {
    path: "/order/",
    name: "order",
    component: () => import("@/views/Order.vue"),
  },
  {
    path: "/service/",
    name: "service",
    component: () => import("@/views/Service.vue"),
  },
  {
    path: "/addservice/:id",
    name: "service.add",
    component: () => import("@/views/dieutri.vue"),
    props: true,
  },
  {
    path: "/updateInfo/",
    name: "updateInfo",
    component: () => import("@/views/InfoEdit.vue"),
  },
  {
    path: "/info/",
    name: "info",
    component: () => import("@/views/Info.vue"),
  },
  {
    path: "/register/",
    name: "user.add",
    component: () => import("@/views/UserAdd.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Global guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");
  if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
