import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/About.vue")
  },
  {
    path: "/board",
    name: "board",
    component: () => import("../views/board/index.vue")
  },
  {
    path: "/storage",
    name: "storage",
    component: () => import("../views/Storage.vue")
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("../views/Editor.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
