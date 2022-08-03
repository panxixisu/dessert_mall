<template>
  <div>
    <div class="cart_container">
      <cart-poster />
      <div class="cartTable">
        <div class="wrapper">
          <shopping-cart />
        </div>
      </div>

  
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import CartPoster from "./cartposters.vue";
import shoppingCart from "./main.vue";
import Storage from "@/utils/storage";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    CartPoster,
    shoppingCart,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {
      const data = {
        phonenumber: Storage.getCache("userInfo", false).phonenumber,
        token: Storage.getCache("token", false),
      };
      store.dispatch("CartModule/getCart", data);

        if(router.currentRoute.value.params.id=='1'){
     window.scrollTo(200,500)
    } 
    });

    return {};
  },
});
</script>

<style scoped>
.cart_container {
  width: 100%;
  height: 100%;
  margin-top: 120px;
  text-align: center;
  background-color: #f7f7f7;
}
.cartTable {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cartTable .wrapper {
  width: 80%;
  min-width: 1200px;
}


</style>
