<template>
  <div class="useraddressWrapper">
    <div class="addressheader">我的收货信息</div>
    <div class="addressContent">
      <template v-for="item in spxAddress" :key="item.addressid">
         <div class="box" >
        <div class="orderName"><span class="padleft">收&nbsp;&nbsp;货&nbsp;&nbsp;人:</span><span>{{item.ordername}}</span></div>
        <div class="orderPhonenumber">
          <div class="phone">
          <span class="padleft">收货人:</span>
          <span>{{item.orderphonenumber}}</span>
          </div>
          <div class="handle">
        <el-button  size="small" plain @click="handleClick(item)">编辑</el-button>
        <el-popconfirm title="确定删除该地址?" @confirm="handleDelete(item)" >
        <template #reference>
        <el-button  size="small"  type="danger">删除</el-button>
            </template>
        </el-popconfirm>
        </div>
        </div>
        <div class="orderName"><span class="padleft">收货地址:</span><span>{{item.address}}</span></div>
      </div>
      </template>
      <div class="box1" @click="handleClick()">
       
        <img src="../../../assets/img/add_address.png" alt="">
     
      </div>
   
    
    </div>
   
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,ref } from 'vue'
import { useStore } from "vuex";
import bus from "@/utils/bus"
import Storage from '@/utils/storage'
export default defineComponent({
  setup () {
     const store = useStore();
    const spxAddress= computed(()=>{
      return store.state.UserModule.userInfo.address;
    })

  const handleClick = (item:any)=>{
    if(item!=null){
      bus.emit('updateAddress',JSON.parse(JSON.stringify(item)));
    }else{
      bus.emit('updateAddress',null);
    }
   
     
  }

  const handleDelete = (item:any)=>{

        store.dispatch("UserModule/deleteAddress", {
            token:Storage.getCache("token",false),
            phonenumber:Storage.getCache("userInfo",false).phonenumber,
            addressid:item.addressid,
          });
  }
  const testcon = ()=>{
    console.log("testcon")
  }
    return {spxAddress,handleClick,handleDelete}
  }
})
</script>

<style scoped>
  .useraddressWrapper{

  }
  .addressheader{
    text-align: left;
    padding-left: 50px;
    height: 65px;
    line-height: 65px;
    font-size: 18px;
    background-color: #e5e5e5;
  }
  .addressContent{
    margin-top: 10px;
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .box{
    box-sizing: border-box;
    width:50%;
    height:120px;
    border: 1px solid #dadad8;
    background-color:#fff;
    text-align: left;
    padding-left: 20px;
    padding-top: 18px;
  }
  .orderPhonenumber{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
  }
  .phone{
    height: 50px;
    line-height: 50px;
  }
  .handle{
    padding-right: 20px;
  }
  .padleft{
    padding-right: 20px;
  }
    .box1{
      display: flex;
      justify-content: center;
      align-items: center;
    box-sizing: border-box;
    width:50%;
    height:120px;
    border: 1px solid #dadad8;
    background-color:#fff;

  }
  .box1:hover{
    cursor: pointer;
  }
</style>