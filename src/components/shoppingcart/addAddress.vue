<template>
  <div>
    <div :class="{cover:!dialogShow}"></div>
   <div ref="eldialog" :class="{miss:!dialogShow}" class="dialogcontainer">
     <div class="dialogwrapper"> 
    <el-form
    ref="addressFormRef"
    :model="addressForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
   <div style="text-align:center;padding-bottom:10px">收货信息</div>
    <el-form-item label="收货人电话" prop="orderphonenumber">
      <el-input v-model="addressForm.orderphonenumber" autocomplete="off" :input-style='{width:"300px"}'/>
    </el-form-item>
       <el-form-item label="收货地址" prop="address">
   <el-input class="addressInput" id="addressId" ref="addresss" v-model="addressForm.address" :input-style='{width:"300px"}' placeholder="请输入小区名称"  />
    </el-form-item>
    <el-form-item label="收货姓名"  prop="ordername">
      <el-input v-model.number="addressForm.ordername" :input-style='{width:"300px"}' />
    </el-form-item>
 
  
    <el-form-item>
      <el-button type="primary" @click="submitForm()"
        >确认</el-button
      >
      <el-button @click="cancle()">取消</el-button>
    </el-form-item>
  </el-form>
</div>
  </div>
</div>


</template>

<script lang="ts">
import { defineComponent,computed,ref,reactive, watch, watchEffect,onMounted,onUnmounted } from 'vue'
import { useStore } from "vuex";
import Storage from '@/utils/storage'
import bus from "@/utils/bus";
declare const BMap:any;
export default defineComponent({
    props: {
    addressDialogVisible: {
      type: Boolean,
      default: false,
    }},
  setup (props,context) {
  onMounted(()=>{
       window.scrollTo(0, 0);
     
  var spx = new BMap.Autocomplete(    
      {"input" : "addressId",	
    });

  })
  const dialogShow = computed({
      get: () => props.addressDialogVisible,
      set: (val) => {
        context.emit("update:addressDialogVisible", val);
      },
    });
  watchEffect(()=>{
    console.log(dialogShow.value)
  })
//收货地址
let addressForm:any = ref({
  orderphonenumber: '',
  address: '',
  ordername: '',
})
const addresss = ref()
const addressFormRef = ref()
    const store = useStore();
const submitForm = ()=>{
    addressFormRef.value?.validate((v:any) => {
        if (v) {
          store.dispatch("UserModule/addAddress", {
            token:Storage.getCache("token",false),
            phonenumber:Storage.getCache("userInfo",false).phonenumber,
            orderphonenumber:addressForm.value.orderphonenumber,
            ordername:addressForm.value.ordername,
            address:addresss.value.input.value
          });
        dialogShow.value = false
         addressForm.value={
          orderphonenumber: '',
        address: '',
        ordername: '',
      }
          // console.log('正在登录中~')
        }
      });


 
}
const cancle = ()=>{

 addressForm.value={
    orderphonenumber: '',
  address: '',
  ordername: '',
 }
  dialogShow.value = false
}
//校验规则
const rules = {
  orderphonenumber: [
    {
      required: true,
      message: "手机号不能为空~",
      trigger: "blur",
    },
    {
      pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
      message: "请输入手机号账号~",
      trigger: "blur",
    },
  ],
  ordername: [{
      required: true,
      message: "收货人不能为空~",
      trigger: "blur",
    }],
    address:[{
      required: true,
      message: "地址不能为空~",
      trigger: "blur",
    }],
}
const aaa =ref()
    return {dialogShow,addressForm,submitForm,aaa,cancle,rules,addresss,addressFormRef}
  }
})

</script>

<style scoped>
.addressWrapper{
  position: relative;
}
.miss{
  display: none;
}
.dialogcontainer{

	position: fixed;
  top: 0;
  height: 0;
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:100%;
   background:rgba(0, 0, 0, 0.4);
   overflow-x:hidden; overflow-y:hidden;
   z-index: 9999;
}
.cover{
      position:absolute;left:0px;top:0px;
    background:rgba(0, 0, 0, 0.4);
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:100%;
    filter:alpha(opacity=60);  /*设置透明度为60%*/
    opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
    display:none; 
    z-Index:999;
}
.dialogwrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-ruleForm{
  padding: 20px 0px;
  width: 450px;
  background-color:#ffffff;;
}
</style>