<template>
  <div class="common-layout">
    <el-container>
      <el-header ref="el_header"
        ><div class="head_wrapper">
          <logo /><nav-header class="nav-header" /><user-nav /></div
      ></el-header>
      <!-- <nav-submenu class="nav_menu" /> -->
      <el-main><router-view /> </el-main><login />
      <el-footer>
            <div class="fill">
              <div class="imgwrapper" @click="jump('/home')">
                <img src="../assets/img/sujilogo.svg" alt="">
              </div>
              <div class="info">
                <p>蘇记甜品</p>
                <p class="email emiltext">E-mail  QQ邮箱 :976704893@qq.com</p>
                <hr>
                 <div class="footmenu">
                  <div class="foot_menu_item" @click="jump('/home/news')">最新消息</div>
                  <div class="foot_menu_item" @click="jumpOrder()">我的订单</div>
                  <div class="foot_menu_item" @click="jump('/home/shoppingcart')">购物车</div>
                </div>
              </div>
            </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { NavHeader, Logo, UserNav } from "@/components/nav-header/index";
import { useRouter, useRoute } from "vue-router";
import bus from "@/utils/bus";
import Login from "@/components/login/index.vue";
import { useStore } from "vuex";
// import NavSubmenu from "@/components/nav-submenu.vue";
export default defineComponent({
  components: {
    NavHeader,
    Logo,
    UserNav,
    Login,
    // NavSubmenu,
  },
  setup() {
    const el_header = ref();
    onMounted(() => {
      window.addEventListener(
        "scroll",
        () => {
          var scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
          bus.emit("scrollTop", scrollTop);
        },
        true
      );
      setTimeout(() => {
        el_header.value.$el.style.opacity = 1;
        // el_header.value.$el.style.transform = "translateY(0px)";
      }, 500);
   
    });
    const router = useRouter();
    const route = useRoute();
    const jump = (path: any) => {
      router.push(path);
      window.scrollTo(0, 0);
    };
      const jumpOrder = ()=>{
      router.push({name:'myOrder',params:{id:1}})
    }
    return { el_header,jump,jumpOrder };
  },
});
</script>

<style scoped>
.common-layout {
  width: 100%;
}
.el-container {
  width: 100%;
  height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.el-header,
.el-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0;
  height: auto;
  background-color: #e8e8e8;
}
.el-header {
  position: fixed;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 1px 11px 0 rgb(0 0 0 / 17%);
}
.el-main {
  overflow: hidden;
  padding: 0;
}
.head_wrapper {
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header {
  height: 120px;
  /* box-shadow: 0 1px 11px 0 rgb(0 0 0 / 17%); */
  opacity: 0;
  /* transform: translateX(0px) translateY(-33px) translateZ(0px); */
  transition: opacity 1500ms ease 0s, transform 1200ms ease 0s;
}
.nav-header {
  height: 100%;
}
.fill {
  width: 70%;
  height: 200px;
  background-color: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.email{
    background-image: url('../assets/img/email_icon.png');
    background-position: 0% 4px;
    background-size: auto;
    background-repeat: no-repeat;
    font-family: 'Varela Round', sans-serif;
    color: #464646;
    white-space: nowrap;
    padding-left: 20px;
}
.info{
  width: 500px;
  margin-left: 100px;
}
.footmenu{
  display: flex;
  justify-content: space-between;
}
.foot_menu_item:hover{
   cursor: pointer;
   opacity: 0.5;
}
.imgwrapper:hover{
  opacity: 0.5;
  cursor: pointer;
}
</style>
