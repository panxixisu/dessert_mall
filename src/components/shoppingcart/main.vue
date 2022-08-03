<template>
  <div class="shoppingCart">
    <div class="content" v-if="getShoppingCart.length > 0">
         <div class="cart-header">
      <div class="cart-header-content">
        <div class="imgwrapper">
          <img src="../../assets/img/shoppingcart.e6cbf32.png" alt="" />
        </div>
        <div class="tip">
          温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
        </div>
      </div>
    </div>
      <ul>
        <!-- 购物车表头 -->
        <li class="header">
          <div class="pro-check">
            <el-checkbox v-model="isAllCheck" @change="checkAll"
              >全选</el-checkbox
            >
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">甜品名称</div>
          <div class="pro-option">甜品规格</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action">操作</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li
          class="product-list"
          v-for="item in getShoppingCart"
          :key="item.shoppingcartid"
        >
          <div class="pro-check">
            <el-checkbox v-model="item.ischeck" @change="changeCheck(item)"
              ><span style="opacity: 0">全选</span></el-checkbox
            >
          </div>
          <div class="pro-img">
            <img :src="item.imgdata" @click="clickImg(item.productid)" />
          </div>
          <div class="pro-name">
           {{ item.productname }}
            
          </div>
          <div class="pro-option">{{ item.optionnow }}</div>
          <div class="pro-price">{{ item.price }}元</div>
          <div class="pro-num">
            <el-input-number
              size="small"
              v-model="item.productnumber"
              @change='changeCheck(item)'
              :min="1"
              :max="item.inventory"
            ></el-input-number>
          </div>
          <div class="pro-total pro-total-in" style="display: flex">
            <div style="flex: 5; text-align: right; padding-right: 5px">
              {{ item.price * item.productnumber }}
            </div>
            <div style="flex: 4; text-align: left">元</div>
          </div>
          <div class="pro-action">
            <el-popover placement="top" :width="400" trigger="click">
              <template #reference>
                <el-icon><circle-close-filled /></el-icon>
              </template>
              <p>确定将该甜品移除购物车吗？</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem(item.shoppingcartid)"
                  >确定</el-button
                >
              </div>
            </el-popover>
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span>
            <router-link to="/home/product">继续购物</router-link>
          </span>
          <span class="sep">|</span>
          <span class="cart-total">
            共
            <span class="cart-total-num">{{ getNum() }}</span> 件商品，已选择
            <span class="cart-total-num">{{ getCheckNum() }}</span> 件
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span class="total-price-title">合计：</span>
            <span class="total-price">{{ getTotalPrice() }}元</span>
          </span>
          <router-link :to="getCheckNum() > 0 ? '/home/confirmOrder' : ''">
            <div
              :class="
                getCheckNum() > 0 ? 'btn-primary' : 'btn-primary-disabled'
              "
            >
              去结算
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>您的购物车还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <product-dialog
      :dialogVisible="dialogVisible"
      :data="click_product_data"
      
      @update:dialogVisible="changeDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed ,onMounted} from "vue";
import { ref } from "vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import productDialog from "./dialog.vue";
import Storage from "@/utils/storage";
export default defineComponent({
  components: {
    CircleCloseFilled,
    productDialog,
  },
  setup() {
    onMounted(()=>{
      window.scrollTo(0,0)
    })
    //购物车
    let isAllCheck = computed(()=>{
      return store.state.CartModule.cartProduct.length ==
          store.getters["CartModule/cartCheckProduct"].length
    })
    const store = useStore();
    let getShoppingCart: any = computed(() => {
      return store.state.CartModule.cartProduct;
    });
    let checkData: any = computed(() => {
      return store.getters["CartModule/cartCheckProduct"];
    });

    const getNum = () => {
      return getShoppingCart.value.reduce(function (
        total: any,
        currentValue: any,
        currentIndex: any
      ) {
        return total + currentValue.productnumber;
      },
      0);
    };
    const getCheckNum = () => {
      if (checkData.value.length == 0) {
        return 0;
      }
      return checkData.value.reduce(function (
        total: any,
        currentValue: any,
        currentIndex: any
      ) {
        return total + currentValue.productnumber;
      },
      0);
    };
    const getTotalPrice = () => {
      if (checkData.value.length == 0) {
        return 0;
      }
      return checkData.value.reduce(function (
        total: any,
        currentValue: any,
        currentIndex: any
      ) {
        return total + currentValue.productnumber * currentValue.price;
      },
      0);
    };
    //全选
    const checkAll = async() => {
        
        if(store.state.CartModule.cartProduct.length ==
          store.getters["CartModule/cartCheckProduct"].length){
            console.log("全中")
            await store.commit("CartModule/updateCartFalse", false);
             updateCart(store.state.CartModule.cartProduct)
          }else{
            console.log("没有全中")
             await store.commit("CartModule/updateCartFalse", true);
             updateCart(store.state.CartModule.cartProduct)
          }
        console.log("change")
    
    };
    //单选
    const changeCheck = async (item:any)=>{
     await updateCart([item])
   
    }

    //点击图片
    const click_product_data = ref();
    const dialogVisible = ref(false);
    const clickImg = (productid: any) => {
      const res = store.state.ProductModule.product.filter((item: any) => {
        return item.productid == productid;
      });
      click_product_data.value = res[0];
      dialogVisible.value = true;
    };
    const changeDialog = (value: boolean) => {
      dialogVisible.value = value;
    };
    //移除购物车
    const deleteItem = async (shoppingcartid: any) => {
      await store.dispatch("CartModule/removeCart", {
        shoppingcartid,
        token: Storage.getCache("token", false),
      });
      const data = {
        phonenumber: Storage.getCache("userInfo", false).phonenumber,
        token: Storage.getCache("token", false),
      };
      store.dispatch("CartModule/getCart", data);
    };
    //更新购物车
    const updateCart =  (cart: any) => {
      const data = {
        cart,
         phonenumber: Storage.getCache("userInfo", false).phonenumber,
        token: Storage.getCache("token", false),
      };
    
        store.dispatch("CartModule/updateCart",data);

    };

    return {
      isAllCheck,
      getShoppingCart,
      getNum,
      getCheckNum,
      getTotalPrice,
      checkAll,
      clickImg,
      click_product_data,
      dialogVisible,
      changeDialog,
      deleteItem,
      updateCart,
      changeCheck
    };
  },
});
</script>

<style scoped>
ul li {
  list-style: none;
  padding: 0;
}
ul {
  padding: 0;
}
.shoppingCart {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  width: 100%;
}
/* 购物车头部CSS */
.shoppingCart .cart-header {
  height: 90px;

  background-color: #fff;
  margin-bottom: 20px;
}
.shoppingCart .cart-header .cart-header-content {
  width: 100%;
  text-align: left;
  /* height: 500px; */
}
.shoppingCart .cart-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
.shoppingCart .cart-header span {
  color: #757575;
  font-size: 12px;
  float: left;
  height: 20px;
  line-height: 20px;
  margin-top: 30px;
  margin-left: 15px;
}
/* 购物车头部CSS END */

/* 购物车主要内容区CSS */
.shoppingCart .content {
  width: 1225px;
  margin: 0 auto;
  /* background-color: #fff; */
}

.shoppingCart .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 购物车表头及CSS */
.shoppingCart .content ul .header {
  height: 85px;
  padding-right: 26px;
  width: 100%;
  color: #424242;
}
.shoppingCart .content ul .product-list {
  height: 85px;
  padding: 15px 0px 15px 0;
  width: 100%;
  border-top: 1px solid #e0e0e0;
}
.shoppingCart .content ul .pro-check {
  float: left;
  height: 85px;
  width: 10%;
}
.shoppingCart .content ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 24px;
}
.shoppingCart .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}
.shoppingCart .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.shoppingCart .content ul .pro-name {
  float: left;
  width: 12%;
}
.shoppingCart .content ul .pro-option {
  float: left;
  width: 13%;
}
.shoppingCart .content ul .pro-name a {
  color: #424242;
}
.shoppingCart .content ul .pro-name a:hover {
  color: #ff6700;
}
.shoppingCart .content ul .pro-price {
  float: left;
  width: 10%;
  /* padding-right: 18px; */
  text-align: center;
}
.shoppingCart .content ul .pro-num {
  float: left;
  width: 15%;
  text-align: center;
}
.shoppingCart .content ul .pro-total {
  float: left;
  width: 12%;
  /* padding-right: 81px; */
  text-align: center;
}
.shoppingCart .content ul .pro-total-in {
  color: #ff6700;
}
.shoppingCart .content ul .pro-action {
  float: left;
  width: 10%;
  text-align: center;
}
.shoppingCart .content ul .pro-action i:hover {
  color: #ff6700;
}
/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.shoppingCart .cart-bar {
  width: 1225px;
  height: 50px;
  line-height: 50px;
  margin-top: 5px;

  background-color: #fff;
}
.shoppingCart .cart-bar .cart-bar-left {
  float: left;
}
.shoppingCart .cart-bar .cart-bar-left a {
  line-height: 50px;
  margin-left: 32px;
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left a:hover {
  color: #ff6700;
}
.shoppingCart .cart-bar .cart-bar-left .sep {
  color: #eee;
  margin: 0 20px;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total {
  color: #757575;
}
.shoppingCart .cart-bar .cart-bar-left .cart-total-num {
  color: #ff6700;
}
.shoppingCart .cart-bar .cart-bar-right {
  float: right;
}
.shoppingCart .cart-bar .cart-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.shoppingCart .cart-bar .cart-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ff6700;
  color: #fff;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled:hover {
  cursor: not-allowed;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}
/* 购物车底部导航条CSS END */
/* 购物车主要内容区CSS END */

/* 购物车为空的时候显示的内容CSS */
.shoppingCart .cart-empty {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url("../../assets/img/cart-empty.png") no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.shoppingCart .cart-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.shoppingCart .cart-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
.cart-header {
  width: 100%;
}
.imgwrapper {
  padding-top: 10px;
  padding-left: 5px;
}
.tip {
  color: #757575;
  font-size: 12px;
}
a {
  text-decoration: none;
}
</style>
