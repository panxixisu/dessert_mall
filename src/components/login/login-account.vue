<template>
  <div>
    <el-form :model="account" :rules="rules" ref="accountForm">
      <el-form-item label="账号" prop="phonenumber">
        <el-input v-model="account.phonenumber"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <div class="util">
      <el-checkbox
        v-model="isKeepPasswordRef"
        label="记住密码"
        size="large"
      ></el-checkbox>

      <el-link type="default" @click="forgetPassword">忘记密码</el-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ssrContextKey } from "vue";
import { ElForm } from "element-plus";
import { reactive, ref } from "vue";
import StorageUtil from "@/utils/storage";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { loginAccountRules } from "./rules";
import bus from "@/utils/bus";
export default defineComponent({
  setup() {
    console.log(StorageUtil.getCache("AccountPassword"), "密码");
    /**
     * 定义属性
     */
    //定义表单校验规则
    const rules = loginAccountRules;
    const accountForm = ref<InstanceType<typeof ElForm>>();
    //用户是否选择记住密码
    let isKeepPassword = false;
    if (StorageUtil.getCache("isKeepPassword")) {
      isKeepPassword = true;
    }
    const isKeepPasswordRef = ref(isKeepPassword);

    const account = reactive({
      phonenumber: StorageUtil.getCache("phonenumber") || "",
      password: StorageUtil.getCache("AccountPassword") || "",
    });

    const store = useStore();
    const router = useRouter();
    /**
     * 定义方法
     */
    //登录，点击登录时候需要校验规则
    const login = () => {
      accountForm.value?.validate((v) => {
        if (v) {
          store.dispatch("UserModule/getUser", {
            account,
            isKeepPasswordRef,
          });
          // console.log('正在登录中~')
        }
      });
    };
    const forgetPassword = () => {
      bus.emit("forgetPassword");
    };
    return {
      account,
      isKeepPasswordRef,
      rules,
      login,
      accountForm,
      forgetPassword,
    };
  },
});
</script>

<style scoped lang="less">
.util {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  #forgetPass:hover {
    cursor: pointer;
    color: #409eff;
  }
}
</style>
