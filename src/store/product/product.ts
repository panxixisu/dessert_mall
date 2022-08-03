import { getAllProduct } from "@/service/product/product";
import Storage from "@/utils/storage";
export const ProductModule = {
  namespaced: true,
  state() {
    return {
      product: "",
      categoryProduct: Storage.getCache("categoryProduct") || "",
    };
  },
  mutations: {
    changeProduct(state: any, p: any) {
      state.product = p;
    },
    changeCategoryProduct(state: any, id: string) {
      console.log(state.product);
      state.categoryProduct = state.product.filter((item: any) => {
        return item.categoryid == id;
      });
      Storage.setCache("categoryProduct", state.categoryProduct);
    },
  },
  actions: {
    async getProduct(context: any) {
      const data: any = await getAllProduct();
      if (data.data.code === "101") {
        context.commit("changeProduct", data.data.data);
        // Storage.setCache("category", data.data.data);
      }
    },
  },
};
