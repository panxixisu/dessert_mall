<template>

  <div class="confirmOrder">
       <div class="cart-header-content">
        <div class="imgwrapper">
          <img src="../../assets/img/填写订单.png" alt="" />
        </div>
        
      </div>
    <div class="content">
      
      <!-- 选择地址 -->
      <div class="section-address">
        <p class="title">收货信息</p>
      <el-radio-group v-model="radio" size="large">
        <template v-for="item in address" :key="item.addressid">
         <el-radio :label="item.addressid" style="width:100%;padding-bottom:5px">{{item.address}} <span style="">({{item.ordername}}收)</span> <span style="color: grey;">{{item.orderphonenumber}}</span> </el-radio>
        </template>
      </el-radio-group>
        
      </div>
      <div>
      <el-button style="margin-left:48px" @click="addNewAddress">新增收货地址</el-button>

      </div>
      <!-- 选择地址END -->
      <!-- 商品及优惠券 -->
      <div class="section-goods">
        <p class="title">订单甜品</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.shoppingcartid">
              <img :src="item.imgdata" />
              <span class="pro-name">{{item.productname}}</span>
              <span class="pro-option">{{item.optionnow}}</span>
              <span class="pro-price">{{item.price}}元 x {{item.productnumber}}</span>
              <span class="pro-status"></span>
              <span class="pro-total">{{item.price *item.productnumber}}元</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品及优惠券END -->
    
   
      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">配送方式</p>
        <p class="shipment">包邮</p>
      </div>
      <!-- 配送方式END -->

   
      <!-- 结算列表 -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">商品件数：</span>
              <span class="value">{{getCheckNum}}件</span>
            </li>
            <li>
              <span class="title">商品总价：</span>
              <span class="value">{{getTotalPrice}}元</span>
            </li>
           
            <li>
              <span class="title">运费：</span>
              <span class="value">0元</span>
            </li>
            <li class="total">
              <span class="title">应付总额：</span>
              <span class="value">
                <span class="total-price">{{getTotalPrice}}</span>元
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结算列表END -->

      <!-- 结算导航 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/home/shoppingCart" class="btn-base btn-return">返回购物车</router-link>
          <div @click="addOrder" class="btn-base btn-primary">结算</div>
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
     
    <add-address
    :addressDialogVisible="addressDialogVisible"
      @update:addressDialogVisible="changeDialog"/>
  </div>
</template>
<script lang="ts">
import { defineComponent,onMounted,computed ,onBeforeUnmount,ref} from 'vue'
import { useStore } from "vuex";
import Storage from '@/utils/storage'
import addAddress from './addAddress.vue'
import bus from "@/utils/bus";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from 'element-plus';
declare const BMap:any;
export default defineComponent({
components:{
  addAddress
},
  setup () {
    const test = ref('')

    onMounted(()=>{
      window.scrollTo(0,0)
       bus.on('jumpToOrder',(path:any)=>{
     
      router.push({name:path,params:{id:1}})
      //      ElMessage({
      //   message: "已生成订单~",
      //   type: "success",
      // });
    
    })
      
    })
   onBeforeUnmount(()=>{
    bus.off('jumpToOrder')
   })
    const store = useStore();
  const getCheckGoods =computed(()=>{
    return store.getters["CartModule/cartCheckProduct"];
  })
  const getCheckNum = computed(()=>{
    return getCheckGoods.value.length
  })
  const getTotalPrice = computed(()=>{
    return getCheckGoods.value.reduce(function (
        total: any,
        currentValue: any,
        currentIndex: any
      ) {
        return total + currentValue.productnumber * currentValue.price;
      },
      0);
  })
  //收货地址
  let radio = ref(Storage.getCache('userInfo',false).address[0]?.addressid)
   let address = computed(()=>{
    return store.state.UserModule.userInfo.address
  })
  //新增收货地址
  const addressDialogVisible = ref(false)
  const addNewAddress = ()=>{
    addressDialogVisible.value = true
   }
  const changeDialog = (value:boolean)=>{
    addressDialogVisible.value = value
  }
      const router = useRouter();
    const route = useRoute();
  //结算
  const  addOrder = ()=>{
    let shoppingcartProduct =JSON.parse(JSON.stringify(store.getters["CartModule/cartCheckProduct"]) ) 
    store.dispatch("OrderModule/checkInventory",{addressid:radio.value,state:"未发货",phonenumber:Storage.getCache("userInfo",false).phonenumber,orderprice:getTotalPrice.value,shoppingcartProduct,token:Storage.getCache('token',false)})
        bus.on('jumpToShoppingCart',(path:any)=>{
    
      router.push({name:path,params:{id:1}})
    
    })
  

  }
    return {getCheckGoods,getCheckNum,getTotalPrice,radio,address,addNewAddress,addressDialogVisible,changeDialog,addOrder}
  }
 
})
</script>

<style scoped lang="scss">
// ::v-deep.el-radio.el-radio--large .el-radio__label{
//   font-size: 14px;
// }
ul li{
  list-style: none;
}
.confirmOrder {
  width: 100%;
  background-color: #f5f5f5;
  padding-top: 150px;

}
/* 头部CSS */
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 100%;
  margin: 0 auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ff6700;
  line-height: 80px;
}
/* 头部CSS END */

/* 主要内容容器CSS */
.confirmOrder .content {
  width: 80%;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}
.confirmOrder .cart-header-content {
  width: 80%;
  margin: 0 auto;
  height: 80px;
  background-color: #fff;
  margin-bottom: 20px;
}

/* 选择地址CSS */
.confirmOrder .content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.confirmOrder .content .address-body li {
  float: left;
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid #ff6700;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

/* 商品及优惠券CSS */
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 250px;
  line-height: 70px;
}
.pro-option{
  float: left;
    width: 250px;
  line-height: 70px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 150px;
  text-align: center;
  line-height: 70px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 70px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 70px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
}
/* 配送方式CSS END */

/* 发票CSS */
.confirmOrder .content .section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-invoice .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-invoice .invoice {
  float: left;
  line-height: 38px;
  font-size: 14px;
  margin-right: 20px;
  color: #ff6700;
}
/* 发票CSS END */

/* 结算列表CSS */
.confirmOrder .content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 126px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
 .cart-header-content {
  width: 75%;
  text-align: left;

  /* height: 500px; */
}
.imgwrapper {
  padding-top: 10px;
  padding-left: 5px;
}
/* 结算导航CSS */
.btn:hover{
  cursor: pointer;
}
/* 主要内容容器CSS END */
</style>