<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";
import StorageUtil from "@/utils/storage";
export default defineComponent({
  setup() {
    const store = useStore();
    if(StorageUtil.getCache('token',false)){
          store.dispatch("CartModule/getCart", {phonenumber:StorageUtil.getCache("userInfo",false).phonenumber,token:StorageUtil.getCache("token",false)});
    }
    store.dispatch("categoryModule/getCategory");
    store.dispatch("ProductModule/getProduct");
    store.dispatch("NewsModule/getNewsData");
    return {};
  },
});
</script>

<style scoped></style>
