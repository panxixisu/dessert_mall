<template>

  <div class="product_wrapper">
    <div class="product_container" ref="productsRef">
      <template v-for="item in product" :key="item.productid">
        <div class="product_box hide" @click="clickProduct(item)">
          <div
            class="product_photo"
            :style="{ backgroundImage: 'url(' + item.imgdata + ')' }"
          ></div>

          <div class="product_name">
            <div class="product_text">
              <span>{{ item.productname }}</span>
              <span class="product_price">¥{{ item.price }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
   
    <product-dialog
      :dialogVisible="dialogVisible"
      :data="click_product_data"
      @update:data="changedata"
      @update:dialogVisible="changeDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted,onUnmounted } from "vue";
import { useStore } from "@/store";
import ProductDialog from "./dialog.vue";

import bus from "@/utils/bus";
export default defineComponent({
  components: {
    ProductDialog,
  },
  
  setup() {
    onMounted(()=>{
      window.scrollTo(0,0)
          bus.on("scrollTop",scroolSpx );
    })
    onUnmounted(()=>{
    bus.off("scrollTop", scroolSpx);
    })
    const store = useStore();
    const product: any = computed(() => {
      return store.state.ProductModule.categoryProduct;
    });
    const productsRef = ref();

    //滚动过渡效果
    const productlist: any = computed(() => {
      return productsRef.value.getElementsByClassName("product_box");
    });
    const length: any = computed(() => {
      return productlist.value.length;
    });
    const mow = ref(0)
    const base = 115;
    const step = 360;
    const hidebase = 905;
    const scroolSpx = (data: any) => {
      mow.value=data
      if (data > base && data < hidebase) {
        productlist.value[0]?.classList.add("come_up");
        productlist.value[1]?.classList.add("come_up");
        productlist.value[2]?.classList.add("come_up");
        productlist.value[3]?.classList.add("come_up");
      } else {
        productlist.value[0]?.classList.remove("come_up");
        productlist.value[1]?.classList.remove("come_up");
        productlist.value[2]?.classList.remove("come_up");
        productlist.value[3]?.classList.remove("come_up");
      }
      // if(data>hidebase){

      // }
      // let xunhuan = Math.ceil(length.value / 4);
      for (let i = 1; i < 5; i++) {
      
        if (data > base + step * i && data < hidebase + step * i) {
          productlist.value[i * 4]?.classList.add("come_up");
          productlist.value[1 + i * 4]?.classList.add("come_up");
          productlist.value[2 + i * 4]?.classList.add("come_up");
          productlist.value[3 + i * 4]?.classList.add("come_up");
        } else {
          productlist.value[i * 4]?.classList.remove("come_up");
          productlist.value[1 + i * 4]?.classList.remove("come_up");
          productlist.value[2 + i * 4]?.classList.remove("come_up");
          productlist.value[3 + i * 4]?.classList.remove("come_up");
        }
      }
    }
    //点击商品
    const click_product_data: any = ref({});
    const dialogVisible = ref(false);
    const clickProduct = (item: any) => {
      click_product_data.value = item;
      click_product_data.value.optionnow = item.product_option[0];
      dialogVisible.value = true;
    };
    const clickChangeProduct = (value: boolean) => {
      dialogVisible.value = false;
    };
    const changeDialog = (value: boolean) => {
      dialogVisible.value = value;
    };
    const changedata = (value: string) => {
      click_product_data.value.optionnow = value;
    };
    return {
      product,
      productsRef,
      clickProduct,
      click_product_data,
      dialogVisible,
      clickChangeProduct,
      changeDialog,
      scroolSpx,
      mow
    };
  },
});
</script>

<style scoped>
.product_wrapper {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.product_container {
  width: 75%;
  /* border: 1px solid black; */
  padding-left: 5px;
}
.product_box {
  float: left;
  width: 25%;
  height: 100%;
 
  box-sizing: border-box;
  margin-bottom: 60px;
}
.product_box:hover{
  cursor: pointer;
}

.product_photo {
  width: 90%;
  margin-right: auto;
  margin-bottom: 10px;
  margin-left: auto;
  padding-top: 90%;
  border: 4px solid #fff;
  border-radius: 50px;
  background-image: url(http://www.honeymoon-dessert.com/admin/upload/product/image/169.JPG);
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}

.product_name {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product_text {
  width: 70%;
  padding: 12px 25px;
  border-radius: 1000px;
  background-color: #ffc527;
  box-shadow: 1px 1px 3px 0 rgb(0 0 0 / 20%);
  color: #3a3a3a;
}
.absolute {
  box-sizing: border-box;
  position: absolute;
}
.div-block {
  position: absolute;
  left: -14px;
  top: -56px;
  padding: 6px;
  justify-content: center;

  align-items: center;

  display: flex;
  width: 110px;
  height: 110px;
  min-height: 110px;
  min-width: 110px;
  padding-top: 5px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 110px;
  background-color: #fdd23e;
  font-family: Varela, sans-serif;
}
.text_month {
  color: #e1251b;
  font-size: 30px;
  line-height: 38px;
}
.product_price {
  color: #e1251b;
  padding-left: 20px;
}
.hide {
  opacity: 0;
  transform: translateY(33px);
  transition: opacity 1200ms ease 0s, transform 1200ms ease 0s;
}
.come_up {
  opacity: 1;
  transform: translateY(0px);
}
</style>
