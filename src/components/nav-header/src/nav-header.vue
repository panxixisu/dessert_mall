<template>
  <div>
    <ul>
      <li @click="jump('/home/news')" class="zuixin">
        <div>
          <span class="nav_en_txt">News</span>
          <br />
          <div class="nav_ch_txt">最新消息</div>
        </div>
        <div class="curveline"></div>
      </li>
      <li class="product">
        <div>
          <span class="nav_en_txt">Product</span>
          <br />
          <div class="nav_ch_txt">产品推荐</div>
        </div>
        <div class="curveline"></div>
        <nav-submenu ref="navsubmneu" class="nav-submneu" />
      </li>

      <li @click="jumpOrder()">
        <div>
          <span class="nav_en_txt">Order</span>
          <br />
          <div class="nav_ch_txt">我的订单</div>
        </div>
        <div class="curveline"></div>
      </li>
      <li @click="jump('/home/shoppingcart')">
        <div>
          <span class="nav_en_txt">ShoppingCart</span>
          <br />
          <div class="nav_ch_txt">
            <img
              src="../../../assets/img/shoppingcart_empty.svg"
              alt=""
              style="width: 20px; margin-right: 2px"
            />
            <div class="circle">{{getNum}}</div>
            <div style="padding: 5px 0px 0px 3px">购物车</div>
          </div>
        </div>
        <div class="curveline"></div>
      </li>
      <!-- <li>
        <div>
          <span class="nav_en_txt">About Us</span>
          <br />
          <div class="nav_ch_txt">关于我们</div>
        </div>
        <div class="curveline"></div>
      </li> -->
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref ,computed, watchEffect, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'
import Storage from '@/utils/storage'
import NavSubmenu from "./nav-submenu.vue";
declare const BMap:any;
export default defineComponent({
  components: {
    NavSubmenu,
  },
  setup() {
    const navsubmneu = ref("");

    const onMouseOver = () => {
      // let a: any = navsubmneu.value;
      // let submenu: any = a.submenu;
      // submenu.style.opacity = "1";
    };
    const store = useStore()
   const getNum = computed(()=>{
     if(store.state.CartModule.cartProduct=='') return 0
      else{
      return store.state.CartModule.cartProduct.reduce(function (
        total: any,
        currentValue: any,
        currentIndex: any
      ) {
        return total + currentValue.productnumber;
      },
      0)};
   })

    //路由跳转
    const router = useRouter();
    const route = useRoute();
    const jump = (path: any) => {
      router.push(path);
      window.scrollTo(0, 0);
    };
    const jumpOrder = ()=>{
      router.push({name:'myOrder',params:{id:1}})
    }
    return {
      onMouseOver,
      navsubmneu,
      jump,
      getNum,
    jumpOrder
    
    };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  height: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
}
li {
  text-align: center;
  padding: 0 25px;
}
.nav_ch_txt {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  letter-spacing: 2px;
  position: relative;
}
a {
  color: black;
  text-decoration: none;
}
.nav_en_txt {
  font-family: Varela Round, sans-serif;
  color: #ffc527;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0px;
}
.curveline {
  position: relative;
  left: -1px;
  top: -3px;
  z-index: -1;
  width: 100%;
  height: 16px;
  background-image: url("../../../assets/img/navBar_curve.png");
  background-position: 50% 50%;
  background-size: auto;
  background-repeat: no-repeat;
  opacity: 0;
  transform: translateX(-7px) translateY(0px) translateZ(0px);
  transition: opacity 200ms ease 0s, transform 200ms ease 0s;
}
a:hover .nav_ch_txt {
  opacity: 0.7;
}
a:hover .nav_en_txt {
  opacity: 0.7;
}
li:hover {
  cursor: pointer;
}
li:hover > .curveline {
  transform: translateX(0px);
  opacity: 1;
}
li {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-submneu {
  opacity: 0;
  height: 0;
  width: 0;
  box-sizing: border-box;
  transition: opacity 1200ms ease;
  /* transition: ease opacity 1s; */
}

.product:hover > .nav-submneu {
  height: 65px;
  width: 100%;
  opacity: 1;
  z-index: 1;
}
/* .nav-submneu:hover {
  height: 65px;
  width: 100%;
  opacity: 1;
} */

.circle {
  position: absolute;
  top: 2px;
  left: 12px;
  right: auto;
  display: inline-block;
  padding: 1px 1px;
  font-size: 12px;
  line-height: 12px;
  color: #fff;
  background-color: #e1251b;
  border-radius: 7px;
  min-width: 12px;
  text-align: center;
}
.zuixin {
  padding-left: 62px;
}
</style>
