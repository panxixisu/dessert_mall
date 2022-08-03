<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      custom-class="login_dialog"
      width="400px"
      :lock-scroll="false"
    >
      <login-pannel class="loginpanel" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted,onBeforeMount } from "vue";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import bus from "@/utils/bus";
import LoginPannel from "./login-pannel.vue";
export default defineComponent({
  components: {
    LoginPannel,
  },
  setup() {
    onMounted(()=>{
      bus.on("openLogin", (data: any) => {
      console.log("openopen");
      console.log(data);
      dialogVisible.value = data;
    });
    }),
    onBeforeMount(()=>{
      bus.off("openLogin")
    })
    const dialogVisible = ref(false);
    
    return {
      dialogVisible,
    };
  },
});
</script>
<style>
.el-dialog.login_dialog {
  border-radius: 25px;
  border: 3px #fdc224 solid;
}
</style>
<style scoped>
.loginpanel {
  margin-left: 10px;
}
</style>
