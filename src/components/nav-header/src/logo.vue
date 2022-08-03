<template>
  <div>
    <transition name="logo" @click="jump('/home')">
      <img src="@/assets/img/text-684663.svg" class="left" alt=""  />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  setup() {
      const router = useRouter();
    const route = useRoute();
    const jump = (path: any) => {
      router.push(path);
      window.scrollTo(0, 0);
    };
    return {jump};
  },
});
</script>

<style scoped>
img {
  width: 160px;
  height: 100%;
  object-fit: contain;
}
img:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
