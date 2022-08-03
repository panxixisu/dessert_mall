<template>
  <div
    class="news_wrapper"
    :style="{ backgroundImage: 'url(' + coverData.cover + ')' }"
    ref="news_wrapper"
    :class="{
      news_wrapper_hide: news_wrapper_ishide,
      news_wrapper_notHide: !news_wrapper_ishide,
    }"
    key="news_wrapper"
  >
    <div class="edgewrapper edgeTop"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import bus from "@/utils/bus";
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
.edgewrapper.edgeTop {
  position: relative;
  bottom: 16px;
  z-index: 10;
  height: 20px;
  background-image: url("../../../assets/img/curveBg_repeatx_f7.png");
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: repeat-x;
  /* flex-direction: column; */
  width: 100%;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
}
</style>
