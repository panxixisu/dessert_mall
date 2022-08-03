import Storage from "@/utils/storage";
import { useRouter, useRoute } from "vue-router";
import { addOrder,getOrder,checkInventory,insertOrderAfter,uploadImgdata,shouhuo } from "@/service/order/order";
import bus from '@/utils/bus';
import { ElMessage } from "element-plus";
export const OrderModule = {
  namespaced: true,
  state() {
    return {
      orderAll: Storage.getCache("orderAll",false)
        ? Storage.getCache("orderAll",false)
        : "",
      orderNow:''  
    
    };
  },
  mutations: {
    changeorderAll(state: any, p: any) {
      Storage.setCache("orderAll", p,false);
      state.orderAll = p;
    },
    changeorderNow(state: any, p: any) {
      state.orderNow = p;
    },
  
  },
  actions: {
    async addOrder(context: any,payload:any) {
      console.log(111,"addorder")
      const data: any = await addOrder(payload);
      if (data.data.code === "101") {
               ElMessage({
        message: data.data.msg,
        type: "success",
      });
        bus.emit('jumpToOrder','myOrder')
        context.commit("changeorderAll", data.data.data);
        await context.dispatch("CartModule/getCart", {phonenumber:payload.phonenumber,token:payload.token},{root:true});
    
      }
    },
    async getOrder(context: any,payload:any) {
      console.log(111,"addorder")
      const data: any = await getOrder(payload);
     if(data.data.code ==="101"){
      context.commit("changeorderAll", data.data.data);
     }
    },
       async checkInventory(context: any, payload: any) {
  
     const data:any= await checkInventory(payload);
     if (data.data.code === "101") {
      context.dispatch("OrderModule/addOrder", payload, { root: true });
    } else {
      ElMessage({
        message: data.data.msg,
        type: "warning",
      });
      bus.emit('jumpToShoppingCart','ShoppingCart')
      return;
    }

    },
    async insertOrderAfter(context: any, payload: any) {
  
      const data:any= await insertOrderAfter(payload);
      if (data.data.code === "101") {
       context.dispatch("OrderModule/getOrder", payload, { root: true });
       ElMessage({
        message: data.data.msg,
        type: "success",
      });
        } 
 
     },
     async uploadImgdata(context: any, payload: any) {
      const data:any= await uploadImgdata(payload);
      if (data.data.code === "101") {
          bus.emit('uploadAfter',data.data.data)  
        } 
 
     },
     async shouhuo(context: any, payload: any) {
      const data:any= await shouhuo(payload);
      if (data.data.code === "101") {
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
          context.dispatch('getOrder',payload)
        } 
 
     }
     
    

  },
};
