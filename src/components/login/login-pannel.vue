<template>
  <div class="login_pannel">
    <div class="title">蘇记甜品</div>
    <el-tabs class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><user-filled /></el-icon>账号登录
          </span>
        </template>
        <login-account ref="loginAccountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><iphone /></el-icon>短信登录
          </span>
        </template>
        <login-phone ref="loginPhoneRef" />
      </el-tab-pane>
    </el-tabs>

    <el-button size="large " class="loginBtn" style="" @click="loginEvent">{{
      btnText
    }}</el-button>
  </div>
</template>

<script lang="ts">
import { onMounted, ref,onBeforeUnmount } from "vue";
import { defineComponent, computed } from "vue";
import { Iphone } from "@element-plus/icons-vue";
import { UserFilled } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
import bus from "@/utils/bus";
export default defineComponent({
  components: {
    Iphone,
    UserFilled,
    LoginAccount,
    LoginPhone,
  },
  setup() {
    /**
     * 定义属性
     */
    const currentTab = ref("account");
    const loginAccountRef = ref();
    const loginPhoneRef = ref();
    let btnText = computed(() => {
      return currentTab.value === "account" ? "登录" : "登录/注册";
    });
    //用户点击登录,选择相应
    const loginEvent = () => {
      if (currentTab.value === "account") {
        loginAccountRef.value?.login();
      } else {
        loginPhoneRef.value?.login();
      }
   
    };
    onMounted(()=>{
      bus.on("forgetPassword", () => {
      currentTab.value = "phone";
    });
    }),
    onBeforeUnmount(() => {
      bus.off("forgetPassword");
    });
    return {
      loginAccountRef,
      loginPhoneRef,
      loginEvent,
      currentTab,
      btnText,
    };
  },
});
</script>

<style lang="less" scoped>
.login_pannel {
  width: 350px;

  .title {
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: 30px;
  }
}
.el-form-item--default {
  margin: 10px;
}

.demo-tabs {
  width: 340px;
  margin-top: 10px;
  height: 190px;
}

.el-tabs--border-card > .el-tabs__content {
  max-width: 460px;
}
.loginBtn {
  width: 100%;
  margin-top: 10px;
  background-color: #fdd23e;
  color: #464646;
  font-size: 18px;
  letter-spacing: 2px;
  border-radius: 50px;
}
</style>
