import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Storage from "@/utils/storage";
import bus from "@/utils/bus";
import { ElMessage } from "element-plus";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    // redirect: "/news",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
    children: [
      { path: '', component: () => import("../components/main/News/index.vue"), },
      {
        path: "news",
        name: "News",
        meta: {},
        component: () => import("../components/main/News/index.vue"),
      },
      {
        path: "product",
        name: "Product",
        meta: {},
        component: () => import("../components/main/product/index.vue"),
      },
      {
        path: "order",
        name: "Order",
        meta: { require: true },
        component: () => import("../components/order/index.vue"),
      },
      {
        path: "shoppingcart",
        name: "ShoppingCart",
        meta: { require: true },
        component: () => import("../components/shoppingcart/index.vue"),
      },
      {
        path: "confirmOrder",
        name: "confirmOrder",
        meta: { require: true },
        component: () => import("../components/shoppingcart/makeorder.vue"),
      },
      {
        path: "user",
        name: "user",
        meta: { require: true },
        component: () => import("../components/user/index.vue"),
        children:[
          { path: '', component: () => import("../components/user/content/userInfo.vue") },
          {
            path: "address",
            name: "UserAddress",
            meta: { require: true },
            component: () => import("../components/user/content/address.vue"),
          },
          {
            path: "userinfo",
            name: "UserInfp",
            meta: { require: true },
            component: () => import("../components/user/content/userInfo.vue"),
          },
          {
            path: "myOrder",
            name: "myOrder",
            meta: { require: true },
            component: () => import("../components/user/content/order.vue"),
          },
          {
            path: "orderDetail",
            name: "orderDetail",
            meta: { require: true },
            component: () => import("../components/user/content/orderdetail.vue"),
          },
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.require == true) {
    if (
      Storage.getCache("userInfo", false) == "" ||
      Storage.getCache("userInfo", false) == null
    ) {
      ElMessage({
        message: "请先登录~",
        type: "warning",
      });
      setTimeout(() => {
        bus.emit("openLogin", true);
      }, 500);
      return;
    }
  }
  next();
});
export default router;
