import { createRouter, createWebHashHistory } from "vue-router";

// todo 检查路由modules下的所有ts || .js文件

const staticRouterSource: any = import.meta.glob(
  "./modules/*.ts" || "./modules/*.js",
  { import: "default", eager: true }
);

const dirRouters = (): object[] => {
  let __dirRouters = [];
  Object.keys(staticRouterSource).forEach((keys) => {
    __dirRouters.push(...staticRouterSource[keys]);
  });
  return __dirRouters.reverse();
};

const routes: any[] = [
  {
    path: "/",
    name: "layout",
    redirect: "/index",
    component: () => import("@/views/layout.vue"),
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/index.vue"),
        meta: {
          title: "首页",
          icon: "House",
        },
      },
      ...dirRouters(),
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("@/views/signUp.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("@/views/post.vue"),
  },
  {
    path: "/comment",
    name: "comment",
    component: () => import("@/views/comment.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: () => import("@/views/404/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
