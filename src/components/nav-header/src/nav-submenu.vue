<template>
  <div class="submenu_product_wrapper" @mouseleave="mouseleave">
    <div class="submenu_mask">
      <div
        class="slide"
        ref="submenu"
        style="margin-left: 10px"
        @mousemove="mousemove"
      >
        <template v-for="item in categorydata" :key="item.categoryid">
          <!-- <a href=""> -->
          <div class="category_item_wrapper" @click="clickCategory(item)">
            <img :src="item.icondata" alt="" class="icon" />
            <span class="categoryname">{{ item.categoryname }}</span>
          </div>
          <!-- </a> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    //导航栏数据
    const store = useStore();
    // let categorydata = ref();
    const categorydata: any = computed(() => {
        return store.state.categoryModule.category;
    });
    // watchEffect(() => {
    //   categorydata.value = store.state.categoryModule.category;
    //   console.log("watchEffect");
    //   console.log(categorydata.value);
    // });
    const submenu = ref("");
    var slide = 0;
    var nowX = 0;

    //导航栏移动效果
    const mousemove = function (e: any) {
      slide = e.clientX - nowX;
      if (nowX != 0) {
        let a: any = submenu.value;
        // console.log(a);
        a.style.marginLeft = parseInt(a.style.marginLeft) - slide * 2 + "px";
      }
      nowX = e.clientX;
    };
    const router = useRouter();
    //点击某个导航
    const clickCategory = async function (item: any) {
      await store.commit(
        "ProductModule/changeCategoryProduct",
        item.categoryid
      );
      await store.commit("categoryModule/changeCategoryNow", item);
      console.log(item);
      router.push({
        path: "/home/product",
        // query: { categoryid: item.categoryid },
      });
      window.scrollTo(0, 0);
    };
    const mouseleave = () => {
      let a: any = submenu.value;

      a.style.marginLeft = 0;
      // nowX = 0;
    };
    //  (e: any) => {
    //   console.log(e);
    //   let a: any = submenu.value;
    //   a.style.marginLeft = parseInt(a.style.marginLeft) - 2 + "px";
    // };
    return { mousemove, submenu, mouseleave, categorydata, clickCategory };
  },
});
</script>

<style scoped>
.submenu_product_wrapper {
  position: absolute;
  left: 0px;
  top: 120px;
  /* top: 0 px; */
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 65px;
  margin-right: auto;
  margin-left: auto;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.68);
}
.category_item_wrapper {
  /* width: 200px; */
  min-width: 180px;
  max-width: 180px;
  overflow: hidden;
  /* flex: 0 0 200px; */
}
.submenu_mask {
  max-width: 1180px;
  width: 1180px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* height: 65px; */
}
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  overflow: hidden;
  list-style: none;
  white-space: nowrap;
  min-width: 0;
  max-width: 1180px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
}
.category_item_wrapper {
  height: 65px;
  color: #fff;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px 0 10px;
}
.category_item_wrapper:hover {
  background-color: #ffc527;
  background-image: url("../../../assets/img/subMenu_arrow.png");
  background-position: 50% 0%;
  background-size: 11px 6px;
  background-repeat: no-repeat;
  color: #3c0101;
}
.icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  padding-right: 5px;
  background-position: 0% 50%;
  /* background-size: auto 30px;
  background-repeat: no-repeat; */
}
.categoryname {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 3px;
}
</style>
