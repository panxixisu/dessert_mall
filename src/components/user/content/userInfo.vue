<template>
  <div>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <div class="userHeader">用户资料管理</div>
    <div class="userPhoto">
       <div class="Photo">
      <el-upload
         :tip="点击修改头像"
        class="avatar-uploader"
        :http-request="upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >  <img  :src="userInfo.profile_photo" class="avatar" /> 
      </el-upload>
       </div>
       <div class="userName">
         <span>欢迎你：{{userInfo.username}}</span>
       </div>
    </div>
    <el-tab-pane  name="first" label="个人信息">
      <div class="userCotainer">
         <el-form
          label-position="right"
          label-width="100px"
          :model="userInfo"
          style="max-width: 460px"
        >
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfo.phonenumber"  disabled/>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="userInfo.registertime"  disabled />
          </el-form-item>
          <div class="upbtn">
          <el-input type="button" @click="updateUserInfo" class="updateUserInfo"  modelValue="保存修改" :input-style='{width:"200px",backgroundColor:"#fdd23e",color:"#fff",borderRadius:"8px"}'></el-input>
          </div>
        </el-form>
      </div>
     </el-tab-pane>
    <el-tab-pane label="修改密码" name="second">  <div class="userCotainer">
         <el-form
          label-position="right"
          label-width="100px"
          :model="userInfo"
          style="max-width: 460px"
           :rules="rules"
           ref="userInfoRef"
        >
          <el-form-item label="新密码"  prop="newpassword">
            <el-input v-model="userInfo.newpassword" show-password />
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkpassword">
            <el-input v-model="userInfo.checkpassword" show-password />
          </el-form-item>
          <div class="upbtn">
          <el-input type="button" @click="updateUserInfo1" class="updateUserInfo"  modelValue="保存修改" :input-style='{width:"200px",backgroundColor:"#fdd23e",color:"#fff",borderRadius:"8px"}'></el-input>
          </div>
        </el-form>
      </div></el-tab-pane>
  </el-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted,reactive } from 'vue'
import { ref } from 'vue'
import axios from 'axios'
import type { TabsPaneContext } from 'element-plus'
import  { ElMessage } from 'element-plus'
import { useStore } from "vuex";
import type { UploadProps } from 'element-plus'
import bus from "@/utils/bus";
import Storage from '@/utils/storage'

export default defineComponent({
  setup () {
    const userInfoRef = ref()
 const rules = {
  newpassword: [
    {
      required: true,
      message: "密码不能为空~",
      trigger: "blur",
    },
    {
      min:6,
      message: "密码位数最少6位~",
      trigger: "blur",
    },
  ],
  checkpassword: [{
      required: true,
      message: "密码不能为空~",
      trigger: "blur",
    },{
      min:6,
      message: "密码位数最少6位~",
      trigger: "blur",
    }],
 
}
    const activeName = ref('first')
    //用户信息
    const store = useStore()
    const userInfo = reactive({
        username:'',
        profile_photo:'',
        password:'',
        phonenumber:'',
        registertime:'',
        newpassword:'',
        checkpassword:''

    })
    // const checkpassword = ref('')
    onMounted(()=>{
      
      userInfo.username = store.state.UserModule.userInfo.username
      userInfo.profile_photo = store.state.UserModule.userInfo.profile_photo
      userInfo.password = store.state.UserModule.userInfo.password
      userInfo.phonenumber = store.state.UserModule.userInfo.phonenumber
      userInfo.registertime = store.state.UserModule.userInfo.registertime
      bus.on("uploadUserImg",(imgname:any)=>{
        userInfo.profile_photo = "http://localhost:8080/user/"+imgname
      })
    })
    // const userInfo = computed(()=>{
    //   return store.state.UserModule.userInfo;
    // })
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    
  //用户头像上传
  const upload = (param:any)=>{

     const file = param.file
     console.log(param)
      let formdata = new FormData(); //创建form对象
      formdata.append('file',file);
        store.dispatch("UserModule/uploadUserImg", {
            formdata,
            token:store.state.UserModule.userInfo.token
            }
          );

  }
   //用户修改信息
   const updateUserInfo1 = ()=>{
         userInfoRef.value?.validate((v:any) => {
        if (v) {
        if(userInfo.newpassword!=userInfo.checkpassword){
           ElMessage({
          message:"两次输入密码不一致，请重新输入~",
          type: "warning",
        });
        return
       }
         store.dispatch("UserModule/updateUserInfo", {
          userInfo,
          token:Storage.getCache("token",false)
        });     
        }
      });
   
    
     
      
   }
     const updateUserInfo = ()=>{
     
         store.dispatch("UserModule/updateUserInfo", {
          userInfo,
          token:Storage.getCache("token",false)
        });    
    
     
      
   }


const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  userInfo.profile_photo = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    if (rawFile.type !== 'image/png') {

      ElMessage.error('Avatar picture must be JPG format!')
      return false
    }
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
    return {userInfo,activeName,handleClick,upload,handleAvatarSuccess,beforeAvatarUpload,updateUserInfo,userInfoRef,rules,updateUserInfo1}
  }
})
</script>

<style scoped>
.userHeader{
      text-align: left;
    padding-left: 50px;
    height: 60px;
    line-height: 60px;
      margin-left: 5px;
    font-size: 18px;
    background-color: #e5e5e5;
}
.userPhoto{
  width: 100%;
  display: flex;
  align-items: center;
}
.Photo{
  width: 120px;
  margin-left: 5px;
  margin-top: 20px;
}
.Photo img{
  width: 100%;
  min-width: 120px;
  object-fit: contain;
  
}


.box-item {
  width: 110px;
  margin-top: 10px;
}
.userName{
  flex: 1;
  text-align: left;
  margin-left:50px ;
}
.userCotainer{
  width: 80%;
   border: 1px solid #dadad8;
   padding: 20px 5px;
   margin-right: 20px;
   margin-top: 20px;
   margin-bottom: 20px;
}

::v-deep.upbtn .el-input__inner:hover{
  cursor: pointer;

}
</style>