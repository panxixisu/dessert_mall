<template>
  <div>
    <el-form :model="phone" :rules="rules" ref="phoneRef">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verification_vode">
        <el-col :span="10">
          <el-input v-model="phone.verification_vode" :maxlength="6"></el-input>
        </el-col>
        <el-button
          color="#fdd23e"
          style="color: #f7f7f7"
          size="small"
          :disabled="disabled"
          class="rule_right"
          @click="getcode"
          >{{ codeBtnWord }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { loginPhoneRules } from "./rules";
import { useStore } from "@/store";
import { ElMessage } from "element-plus";
import Storage from "@/utils/storage";
export default defineComponent({
  setup() {
    const phone = reactive({
      number: "",
      verification_vode: "",
      sessionId: "",
    });
    const phoneRef = ref();
    const codeBtnWord = ref("获取验证码");
    const rules = loginPhoneRules;
    const store = useStore();
    const disabled = ref(false);
    const waitTime = ref(30);
    const phoneTimer = () => {
      disabled.value = true;
      codeBtnWord.value = `${waitTime.value}s 后重新获取`;
      const timer = setInterval(function () {
        if (waitTime.value > 1) {
          waitTime.value--;
          codeBtnWord.value = `${waitTime.value}s 后重新获取`;
        } else {
          clearInterval(timer);
          codeBtnWord.value = "获取验证码";
          disabled.value = false;
          waitTime.value = 30;
        }
      }, 1000);
    };
    //获取验证码
    const getcode = () => {
      console.log(
        /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.exec(
          phone.number
        )
      );
      if (
        /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.exec(
          phone.number
        ) != null
      ) {
        store.dispatch("UserModule/getcode", {
          phone,
        });

        phoneTimer();
        ElMessage({
          message: "验证码已发送，请留意手机短信~",
          type: "success",
        });
      } else {
        ElMessage({
          message: "请输入正确手机号！",
          type: "warning",
        });
      }
    };
    const login = () => {
      phone.sessionId = Storage.getCache("sessionId");
      phoneRef.value?.validate((v: any) => {
        if (v) {
          store.dispatch("UserModule/phoneLogin", {
            phone,
          });
        }
      });
    };
    return {
      phone,
      rules,
      phoneRef,
      login,
      getcode,
      disabled,
      codeBtnWord,
    };
  },
});
</script>

<style scoped lang="scss">
.rule_right {
  flex: 1;
  background-color: #fdd23e;
  border: 1px soild black;
  border-radius: 5px;
}
.rule_right:hover {
  cursor: pointer;
}
.el-col-10 {
  margin-right: 35px;
}
::v-deep.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  cursor: not-allowed;
}
::v-deep.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled {
  opacity: 0.7;
}
</style>
