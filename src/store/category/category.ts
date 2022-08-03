import Storage from "@/utils/storage";

import { getAllCategory } from "@/service/category/category";
export const categoryModule = {
  namespaced: true,
  state() {
    return {
      category: Storage.getCache("category")
        ? Storage.getCache("category")
        : "",
      categoryNow: Storage.getCache("categoryNow")
        ? Storage.getCache("categoryNow")
        : Storage.getCache("category")[0]
        ? Storage.getCache("category")[0]
        : "",
    };
  },
  mutations: {
    changeCategory(state: any, p: any) {
      state.category = p;
      Storage.setCache("category", p);
    },
    changeCategoryNow(state: any, p: any) {
      console.log("changeCategoryNow");
      Storage.setCache("categoryNow", p);
      state.categoryNow = p;
    },
  },
  actions: {
    async getCategory(context: any) {
      const data: any = await getAllCategory();
      if (data.data.code === "101") {
        context.commit("changeCategory", data.data.data);
      }
    },
  },
};
