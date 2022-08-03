<template>
  <div class="news_container">
    <product-poster />
    <product-list />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import productPoster from "./productPoster.vue";
import ProductList from "./ProductList.vue";

import { useStore } from "@/store";
export default defineComponent({
  components: {
    productPoster,
    ProductList,
  },
  setup() {
    const store = useStore();

    return {};
  },
});
</script>

<style scoped>
.news_container {
  width: 100%;
  height: 100%;
  margin-top: 120px;
  text-align: center;
  background-color: #f7f7f7;
}
</style>
