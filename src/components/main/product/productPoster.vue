<template>
  <div
    class="news_wrapper"
    :style="{ backgroundImage: 'url(' + coverData.cover + ')' }"
    ref="news_wrapper"
    :class="{
      news_wrapper_hide: news_wrapper_ishide,
      news_wrapper_notHide: !news_wrapper_ishide,
    }"
  >
    <div
      class="title_wrapper"
      ref="news"
      :class="{ hide: ishide, notHide: !ishide }"
    >
      <div class="title_cn_wrapper">
        <div class="dot_wrapper">
          <div class="yellow"></div>
          <div class="black"></div>
        </div>
        <div class="cn_news">&nbsp;{{ coverData.categoryname }}</div>
        <div class="dot_wrapper">
          <div class="yellow"></div>
          <div class="black"></div>
        </div>
      </div>
      <div class="title_en_wrapper">
        <div class="en_news">{{ coverData.enname }}</div>
      </div>
    </div>
  </div>

  <div class="edgewrapper edgeTop"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useStore } from "@/store";
import bus from "@/utils/bus";
export default defineComponent({
  inheritAttrs: false,

  setup() {
    const news = ref();
    const news_wrapper = ref();
    const store = useStore();
    let coverData = ref(store.state.categoryModule.categoryNow);
    watch(
      () => {
        return store.state.categoryModule.categoryNow;
      },
      (newvalue, oldvalue) => {
        coverData.value = newvalue;
        console.log(newvalue);
      }
    );

    // coverData.value = store.state.categoryModule.categoryNow;
    onMounted(() => {
      console.log("onmount");
      setTimeout(() => {
        news_wrapper_ishide.value = false;
        ishide.value = false;
      }, 500);
    });
    //监听滚动
    let ishide = ref(true);
    let news_wrapper_ishide = ref(true);
    let scrollTop = ref();
    bus.on("scrollTop", (data) => {
      scrollTop.value = data;
    });
    watch(scrollTop, (newvalue, oldvalue) => {
      ishide.value =
        newvalue > parseInt(news.value.offsetTop) + 280 ? true : false;
      news_wrapper_ishide.value = newvalue > 640 ? true : false;
    });
    return {
      news,
      news_wrapper,
      scrollTop,
      ishide,
      news_wrapper_ishide,
      coverData,
    };
  },
});
</script>

<style scoped>
.news_wrapper {
  width: 100%;
  height: 520px;
  /* background-image: url("../../../assets/img/news_banner.jpg"); */
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: opacity 1200ms ease 0s, transform 1200ms ease 0s;
}
.title_wrapper {
  transition: opacity 1200ms ease 0.2s, transform 1200ms ease 0.2s;
  margin-top: 80px;
  margin-bottom: 60px;
}
.dot_wrapper {
  padding-bottom: 6px;
}
.yellow {
  position: relative;
  top: 6px;
  z-index: 1;
  width: 14px;
  height: 14px;
  min-height: 14px;
  min-width: 14px;
  border-radius: 14px;
  background-color: #fbc741;
}
.black {
  width: 14px;
  height: 14px;
  min-height: 14px;
  min-width: 14px;
  border-radius: 14px;
  background-color: #666;
}
.cn_news {
  padding-right: 10px;
  font-size: 36px;
  line-height: 64px;
  letter-spacing: 15px;
}
.title_cn_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.en_news {
  font-family: Caveat, sans-serif;
  color: #fbc741;
  font-size: 90px;
  line-height: 70px;
  text-align: center;
}
.edgewrapper.edgeTop {
  position: relative;
  bottom: 16px;
  z-index: 10;
  height: 20px;
  background-image: url("../../../assets/img/curveBg_repeatx_f7.png");
  background-position: 50% 50%;
  background-size: contain;
  background-repeat: repeat-x;
  /* flex-direction: column; */
  width: 100%;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
}
.hide {
  opacity: 0;
  transform: translateY(53px);
}
.notHide {
  opacity: 1;
  transform: translateY(0px);
}
.news_wrapper_hide {
  opacity: 0;
  transform: translateX(0px) translateY(-33px) translateZ(0px);
}
.news_wrapper_notHide {
  opacity: 1;
  transform: translateX(0px) translateY(0px) translateZ(0px);
}
</style>
