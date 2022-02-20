import { createRouter, createWebHistory } from "vue-router";
// import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/Login"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import(/* webpackChunkName: "Mine" */ "@/views/Mine"),
  },
  {
    path: "/exam",
    name: "Exam",
    component: () => import("@/App"),
    children: [
      {
        path: "magic",
        name: "ExamMagic",
        component: () =>
          import(/* webpackChunkName: "ExamMagic" */ "@/views/Exam/Magic"),
      },
      {
        path: "gold",
        name: "ExamGold",
        component: () =>
          import(/* webpackChunkName: "ExamGold" */ "@/views/Exam/Gold"),
      },
      {
        path: "endPass",
        name: "ExamEndPass",
        component: () =>
          import(/* webpackChunkName: "ExamEndPass" */ "@/views/Exam/EndPass"),
      },
    ],
  },
  {
    path: "/payResult",
    name: "PayResult",
    component: () =>
      import(/* webpackChunkName: "PayResult" */ "@/views/PayResult"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
