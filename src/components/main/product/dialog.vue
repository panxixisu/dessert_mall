<template>
  <el-dialog
    v-model="dialogShow"
    custom-class="product_dialog"
    top="32vh"
    :lock-scroll="false"
    style="margin-top: -100px"
    :before-close="handleClose"
    ><div class="click_wrapper">
      <div class="click_product_photo_wrapper">
        <div
          class="click_product_photo"
          :style="{ backgroundImage: 'url(' + dataNews.imgdata + ')' }"
        ></div>
      </div>
      <div class="click_product_content">
        <div class="product_name">{{ dataNews.productname }}</div>
        <div class="product_introduction">{{ dataNews.introduction }}</div>
        <div class="order">
          <div class="float">
            <span style="padding-top: 4px; display: inline-block">规格：</span>
          </div>
          <el-tag class="float" v-if="dataNews.optionid == '1'" type="info"
            >默认规格</el-tag
          >
          <el-radio-group
            class="float"
            v-else
            v-model="radio1"
            size="small"
            fill="#fdc224"
          >
            <template
              v-for="(item, index) in dataNews.product_option"
              :key="index"
            >
              <el-radio-button :label="item" />
            </template>

            <!-- <el-radio-button label="Washington" />
             <el-radio-button label="Los Angeles" /> -->
          </el-radio-group>
          <div class="addToCart">
            <button id="addCart" @click="addcart(dataNews)">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  ref,
  computed,
  watch,
  watchEffect,
} from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import Storage from "@/utils/storage";
import bus from "@/utils/bus";
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  setup(props: any, context) {
    const dialogShow = computed({
      get: () => props.dialogVisible,
      set: (val) => {
        context.emit("update:dialogVisible", val);
      },
    });
    const dataNews = computed({
      get: () => props.data,
      set: (val) => {
        context.emit("update:data", val);
      },
    });
    const radio1 = ref("");
    watch(dataNews, (newValue, oldValue) => {
      console.log(newValue);
      radio1.value = newValue.product_option[0];
    });
    watchEffect(() => {
      dataNews.value.optionnow = radio1.value;
    });
    const cancel = () => {
      console.log(dialogShow.value);
      dialogShow.value = false;
    };
    const store = useStore();
    //加入购物车
    const addcart = (item: any) => {
      console.log('addcart')
      if( Storage.getCache("userInfo", false) == "" ||
      Storage.getCache("userInfo", false) == null){
          ElMessage({
        message: "请先登录~",
        type: "warning",
      });
       dialogShow.value = false;
      setTimeout(() => {
        bus.emit("openLogin", true);
      }, 500);
        return
      }
      const data = {
        //  user
        phonenumber: Storage.getCache("userInfo", false).phonenumber,
        productid: item.productid,
        number: 1,
        optionnow: item.optionnow,
        token: Storage.getCache("token", false),
      };
      store.dispatch("CartModule/addCart", data);
      setTimeout(()=>{
    store.dispatch("CartModule/getCart", data);

      },1000)
      dialogShow.value = false;
    };
    return { dialogShow, cancel, dataNews, radio1, addcart };
  },
});
</script>
<style>
.el-dialog.product_dialog {
  border-radius: 25px;
  border: 3px #fdc224 solid;
  display: flex;
  flex-direction: column;
  box-shadow: 8px 8px 12px 0 rgb(0 0 0 / 21%);
  width: 640px;
  min-height: 273px;
}
</style>
<style scoped lang="scss">
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px #fdc224 inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
.photo {
  width: 100%;
  height: 350px;
  border: 1px solid black;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.news_scroll_content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.news_scroll {
  width: 100%;
  height: 150px;
  overflow-y: scroll;
  margin-top: 15px;
}
.titleWrapper {
  margin-bottom: 20px;
  padding: 9px 20px;
  border-radius: 20px;
  background-color: #fdc224;
  font-weight: 700;
  letter-spacing: 2px;
}
.title_content {
  color: #fff;
  font-size: 18px;
  line-height: 22px;
  text-align: justify;
}
.main_content {
  font-size: 14px;
  line-height: 20px;
}
.click_product_photo_wrapper {
  position: relative;
  width: 280px;
}
.click_product_photo {
  position: absolute;
  top: -44px;
  left: -32px;
  background-image: url(http://www.honeymoon-dessert.com/admin/upload/product/image/193.jpg);
  box-sizing: border-box;
  border: 5px solid #fff;
  border-radius: 5px;
  margin-right: 30px;
  width: 250px;
  height: 300px;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotate(-5deg);
}
.click_product_content {
  width: 380px;
}
.click_wrapper {
  display: flex;
  margin-top: -33px;
}
.click_product_content {
  text-align: left;
}
.product_name {
  display: inline-block;
  margin-bottom: 20px;
  padding: 8px 28px;
  border-radius: 20px;
  background-color: #929292;
  color: #fff;
  font-size: 18px;
  letter-spacing: 2px;
}
.product_introduction {
  max-width: 300px;
  font-size: 16px;
  line-height: 29px;
}
.order {
  padding-top: 20px;
}
.el-radio-button {
  margin-right: 5px;
}
.el-radio-button:hover {
  border-radius: 3px;
}
.float {
  float: left;
}
.addToCart {
  position: relative;
}
#addCart {
  position: absolute;
  left: 175px;
  top: 47px;
  width: 130px;
  height: 40px;
  border-radius: 50px;
  background-color: #fdd23e;
  color: #464646;
  font-size: 12px;
  letter-spacing: 2px;
}
#addCart:hover {
  cursor: pointer;
}
</style>
