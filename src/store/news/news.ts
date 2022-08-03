import Storage from "@/utils/storage";

import { getNews,searchNew } from "@/service/news/news";
export const NewsModule = {
  namespaced: true,
  state() {
    return {
      newsData: Storage.getCache("newsData") || "",
    };
  },
  mutations: {
    changeNewsData(state: any, p: any) {
      state.newsData = p;
    },
  },
  actions: {
    async getNewsData(context: any) {
      const data: any = await getNews();
      if (data.data.code === "101") {
        context.commit("changeNewsData", data.data.data);
        Storage.setCache("newsData", data.data.data);
      }
    },
    async searchNew(context: any,payload:any) {
      const data: any = await searchNew(payload);
      return new Promise((resolve,reject)=>{
        if (data.data.code === "101") {
          context.commit("changeNewsData", data.data.data);
          Storage.setCache("newsData", data.data.data);
          resolve(data.data.data)
        }
      })
     
    },
  },
};
