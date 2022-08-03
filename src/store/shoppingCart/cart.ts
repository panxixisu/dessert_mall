import {
  addCart,
  getCart,
  removeCart,
  updateCart,
} from "@/service/shoppingCart/cart";
import bus from "@/utils/bus";

import Storage from "@/utils/storage";
import { ElMessage } from "element-plus";
export const CartModule = {
  namespaced: true,
  state() {
    return {
      cartProduct: "",
     
    };
  },
  mutations: {
    // changeuserInfo(state: any, p: any) {
    //   state.userInfo = p;
    //   Storage.setCache('userInfo',p,false)
    // },
    changeCartProduct(state: any, data: any) {
      state.cartProduct = data;
     Storage.setCache("num", data.reduce(function (
      total: any,
      currentValue: any,
      currentIndex: any
    ) {
      return total + currentValue.productnumber;
    },
    0),false)
    },
    updateCartFalse(state: any, data: boolean) {
      console.log("action", data);
      state.cartProduct.forEach((item: any) => {
        item.ischeck = data;
      });
    },
  },
  actions: {
    async addCart(context: any, payload: any) {
      const data: any = await addCart(payload);
      if (data.data.code === "101") {
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
        getCart(payload)
      } else {
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
        return;
      }
    },
    async getCart(context: any, payload: any) {
      const data: any = await getCart(payload);

      if (data.data.code === "101") {
        context.commit("changeCartProduct", data.data.data);
      } else {
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
        return;
      }
    },
    async removeCart(context: any, payload: any) {
      const data: any = await removeCart(payload);

      if (data.data.code === "101") {
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
      } else {
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
        return;
      }
    },
   async updateCart(context: any, payload: any) {
       const data: any = await updateCart(payload);
       getCart(payload)
    },
    updateCartFalse(context: any, payload: any) {
      console.log("bainbianbain");
      context.commit("updateCartFalse", payload);
    },
  //  async checkInventory(context: any, payload: any) {
  
  //    const data:any= await checkInventory(payload);
  //    if (data.data.code === "101") {
  //     context.dispatch("OrderModule/addOrder", payload, { root: true });
  //   } else {
  //     ElMessage({
  //       message: data.data.msg,
  //       type: "warning",
  //     });
  //     return;
  //   }

  //   },
  },
  getters: {
    cartCheckProduct: (state: any) => {
      return state.cartProduct.filter((item: any) => {
        return item.ischeck == true;
      });
    },
    num:(state:any)=>{
      return state.cartProduct.reduce(function (
        total: any,
        currentValue: any,
        currentIndex: any
      ) {
        return total + currentValue.productnumber;
      },
      0);
    }
    
  },

};
