import { getUser, phoneLogin, getcode,addAddress,updateAddress,deleteAddress,uploadUserImg,updateUserInfo } from "@/service/user/user";
import bus from "@/utils/bus";
import Storage from "@/utils/storage";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export const UserModule = {
  namespaced: true,
  state() {
    return {
      userInfo: Storage.getCache("userInfo", false) || "",
      token: Storage.getCache("token", false) || "",
    };
  },
  mutations: {
    changeuserInfo(state: any, p: any) {
      state.userInfo = p;
      Storage.setCache("userInfo", p, false);
    },
    changeToken(state: any, token: string) {
      state.token = token;
      Storage.setCache("token", token, false);
    },
  },
  actions: {
    async getUser(context: any, payload: any) {
      const data: any = await getUser(payload.account);
      const userInfo = data.data.data;
      if (data.data.code === "101") {
        context.commit("changeuserInfo", userInfo);
        context.commit("changeToken", userInfo.token);
        Storage.setCache("userInfo", userInfo, false);
        Storage.setCache("token", userInfo.token, false);
        bus.emit("openLogin", false);
        const data1 = {
          phonenumber: userInfo.phonenumber,
          token: userInfo.token,
        };
        context.dispatch('CartModule/getCart', data1 , { root: true });
        context.dispatch("OrderModule/getOrder", {
          phonenumber: Storage.getCache("userInfo", false).phonenumber,
          token: Storage.getCache("token", false),
          }, { root: true });
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
    
      //用户是否记住密码
      if (payload.isKeepPasswordRef.value) {
        Storage.setCache("phonenumber", payload.account.phonenumber);
        Storage.setCache("AccountPassword", payload.account.password);
        Storage.setCache("isKeepPassword", "1");
      } else {
        Storage.clearUserCache();
      }
      
    },
    async phoneLogin(context: any, payload: any) {
      const data: any = await phoneLogin(payload.phone);
      const userInfo = data.data.data;
      if (data.data.code === "101") {
        context.commit("changeuserInfo", userInfo);
        context.commit("changeToken", userInfo.token);
        Storage.setCache("userInfo", userInfo, false);
        Storage.setCache("token", userInfo.token, false);

        bus.emit("openLogin", false);

        ElMessage({
          message: data.data.msg,
          type: "success",
        });
        const store = useStore();
        const data1 = {
          phonenumber: Storage.getCache("userInfo", false).phonenumber,
          token: Storage.getCache("token", false),
        };
        store.dispatch("CartModule/getCart", data1);
        context.dispatch("OrderModule/getOrder", {
          phonenumber: Storage.getCache("userInfo", false).phonenumber,
          token: Storage.getCache("token", false),
          }, { root: true });
      } else {
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
        return;
      }
    },
    async getcode(context: any, payload: any) {
      const data: any = await getcode(payload.phone);
      const sessionId = data.data;
      Storage.setCache("sessionId", sessionId);
    },
    async addAddress(context: any, payload: any) {
      console.log(payload)
      const data: any = await addAddress(payload);
      const userInfo = data.data.data;
      if (data.data.code === "101") {
        context.commit("changeuserInfo", userInfo);
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
      }else{
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
      }
    },
    async updateAddress(context: any, payload: any) {
      const data: any = await updateAddress(payload);
      const userInfo = data.data.data;
      if (data.data.code === "101") {
        context.commit("changeuserInfo", userInfo);
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
      }else{
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
      }
    },
    async deleteAddress(context: any, payload: any) {
      const data: any = await deleteAddress(payload);
      const userInfo = data.data.data;
      if (data.data.code === "101") {
        context.commit("changeuserInfo", userInfo);
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
      }else{
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
      }
    },
    async uploadUserImg(context: any, payload: any) {
      const data: any = await uploadUserImg(payload);
      if (data.data.code === "101") {
       bus.emit("uploadUserImg",data.data.data)
      }
    },
    async updateUserInfo(context: any, payload: any) {
      console.log("update",payload)
      const data: any = await updateUserInfo(payload);
      const userInfo = data.data.data;
      if (data.data.code === "101") {
        context.commit("changeuserInfo", userInfo);
        ElMessage({
          message: data.data.msg,
          type: "success",
        });
      }else{
        ElMessage({
          message: data.data.msg,
          type: "warning",
        });
      }
    },
  },
};
