<template>
  <div class="news_container">
    <news-poster />
    <search />
    <news-result />
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from "vue";
import newsPoster from "./newsposter.vue";
import Search from "./search.vue";
import NewsResult from "./NewsResult.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    newsPoster,
    Search,
    NewsResult,
  },
  setup() {
     const store = useStore();
    onMounted(()=>{
    store.dispatch("NewsModule/getNewsData");

    })
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
