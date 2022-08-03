<template>
  <div 
   v-if="userInfo"
  
  >
    <div class="user_container">
  <poster/>
  <div class="elbox">
     <div class="common-layout">
    <el-container class="elcontainer">
      <el-aside width="200px" class="elaside"><ul>
        <li @click="jump('/home/user/userinfo')" :class="{focus:isPath('/home/user/userinfo')||isPath('/home/user')}">个人信息</li>
        <li @click="jump('/home/user/myOrder')"  :class="{focus:isPath('/home/user/myOrder')||isPath('/home/user/orderDetail')}" >我的订单</li>
        <li @click="jump('/home/user/address')"  :class="{focus:isPath('/home/user/address')}">收货信息</li>
        <li @click="loginOut" >退出登录</li>
      </ul></el-aside>
      <el-main class="user_main"><router-view/></el-main>
    </el-container>
  </div>
  </div>
  
    </div>
         <update-address
    :addressDialogVisible="addressDialogVisible"
    :isedit = isedit
    @update:isedit="changeisedit"
      @update:addressDialogVisible="changeDialog"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref ,computed, onMounted} from 'vue'
import Poster from './userposter.vue'
import { useStore } from "@/store";
import UpdateAddress from './content/updateAddress.vue'
import bus from "@/utils/bus"
import Storage from "@/utils/storage"
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox,ElMessage } from "element-plus";

export default defineComponent({
  components:{
    Poster,
    UpdateAddress
  },
  setup () {
    let isedit = ref(true)
    onMounted(()=>{

    if(router.currentRoute.value.params.id=='1'){
     window.scrollTo(200,500)
     console.log("已生成订单~")

    } 
    })
    //根据路由显示个人菜单
    const isPath = (path:any)=>{
      return path == router.currentRoute.value.fullPath 

    }
  const store = useStore();
    const userInfo= computed(()=>{
      return store.state.UserModule.userInfo
    })
 const addressDialogVisible = ref(false)
   const changeDialog = (value:boolean)=>{
    addressDialogVisible.value = value
  }
   bus.on("updateAddress",(item:any)=>{
     console.log(item)
     if(item ==null){
       isedit.value=false;
     }
      addressDialogVisible.value = true
   })
   const changeisedit = (value:boolean)=>{
        isedit.value = value
   }
     //路由跳转
    const router = useRouter();
    const route = useRoute();
    const jump = (path: any) => {
      router.push(path);
    };
 //退出登录
 const loginOut = ()=>{
  ElMessageBox.confirm(
    '确认退出登录?',
    '退出登录',
    {
      confirmButtonText: '退出',
      cancelButtonText: '取消',
    
    },
    
  )
    .then(() => {
    Storage.loginOut();
     store.commit("CartModule/changeCartProduct", []);
      store.state.UserModule.userInfo = ""
      jump("/home")
      ElMessage({
        type: 'success',
        message: '成功退出登录~',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消操作~',
      })
    })

  
 }
    return {
     userInfo,addressDialogVisible,changeDialog,jump,loginOut,isPath,isedit,changeisedit
    }
  }
})
</script>

<style scoped>
.user_container{
  width: 100%;
  height: 100%;
  margin-top: 120px;
  text-align: center;
  background-color: #f7f7f7;
}

.elbox{
  width: 100%;
  /* border: 1px solid black; */
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-layout{
  width: 85%;
  /* border: 1px solid red; */
  /* height: 500px; */
}
.elaside{
  /* height: 500px; */
}
ul li{
  list-style: none;
}
ul{
  padding:0;
  
  /* height: 500px; */
  margin: 0;
}
li{
  height: 50px;
  line-height: 50px;
  margin-bottom: 3px;
  background-color: #fff;
  border-radius: 10px;
  transition: ease transform 0.5s;
  /* border: 1px solid gray; */
  /* border: 1px solid red; */
}
li:hover{
  cursor: pointer;
  color: #fff;
  background-color: #fdd23e;


}
.el-main{
  padding: 0 10px;
}
.user_main{
  min-height: 500px;
  height: auto;
  background-color: #fff;
  margin-bottom: 20px;
  margin-left: 10px;
  width: 1061px;
  min-width: 1061px;
}
.focus{
   color: #fff;
  background-color: #fdd23e;
}
</style>