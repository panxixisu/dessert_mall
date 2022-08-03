import { createStore, useStore as useVuexStore } from "vuex";
import { categoryModule } from "./category/category";
import { ProductModule } from "./product/product";
import { NewsModule } from "./news/news";
import { UserModule } from "./user/user";
import { CartModule } from "./shoppingCart/cart";
import { OrderModule } from "./order/order";
const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    categoryModule,
    ProductModule,
    NewsModule,
    UserModule,
    CartModule,
    OrderModule
  },
});
export function useStore() {
  return useVuexStore();
}

export default store;
