<template>
  <div class="newsresult_container">
    <div class="newsresult_wrapper" ref="newsResult" v-if="newsData.length">
      <template v-for="(item, index) in newsData" :key="index">
        <div class="news_item hide">
          <img :src="item.imgDataArr[0]" alt="" @click="imgclick(item)" />
          <div class="absolute">
            <div class="div-block">
              <div class="text_month">{{ filterDate(item.date, true) }}</div>
              <div class="text_year">{{ filterDate(item.date, false) }}</div>
            </div>
          </div>
          <div class="content">
            <div class="news_content">
              {{ item.newstitle }}
            </div>
          </div>
        </div>
      </template>

      <news-dialog
        :dialogVisible="dialogVisible"
        :data="news_data"
        @update:dialogVisible="changeDialog"
      />
    </div>
    <div v-else>
      <div style="margin-bottom:80px">
           店家很懒，该时间没有发布帖子
      </div>
     </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted,onUnmounted, computed } from "vue";
import bus from "@/utils/bus";
import NewsDialog from "./dialog.vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    NewsDialog,
  },
  setup() {
    /***
     * 控制对话框显示与否
     */

    const dialogVisible = ref(false);
    //点击图片将数据传送
    let news_data = ref({});
    const imgclick = (item: any) => {
      dialogVisible.value = true;
      news_data.value = item;
    };
    const changeDialog = (value: boolean) => {
      dialogVisible.value = value;
    };
    onMounted(() => {
       bus.on("scrollTop",scroolSpx);
       bus.on("searchNewClose",()=>{
          if(newslist.value !==undefined){
          newslist.value[0]?.classList.remove("come_up");
          newslist.value[1]?.classList.remove("come_up");
          newslist.value[2]?.classList.remove("come_up");
          }
         

       })
      bus.on("searchNewComeup",()=>{
        setTimeout(() => {
          if(newslist.value !==undefined){
          newslist.value[0]?.classList.add("come_up");
          newslist.value[1]?.classList.add("come_up");
          newslist.value[2]?.classList.add("come_up");
          }
        }, 1000);
          
       })
    });
    onUnmounted(()=>{
      bus.off("scrollTop",scroolSpx)
    })
    // const getRefName = (item: any) => {
    //   let a = "newItem" + `${item.index}`;
    //   itemRefs.push(a);
    //   eval("const " + a + "= ref()");

    //   return a;
    // };
    //new数据
    const store = useStore();
    const newsData: any = computed(() => {
      return store.state.NewsModule.newsData;
    });
    const newsResult = ref();
    //滚动过渡效果
    const newslist: any = computed(() => {
      return newsResult.value?.getElementsByClassName("news_item");
    });
    const length: any = computed(() => {
      return newslist.value.length;
    });
    const base = 240;
    const step = 585;
    const hidebase = 1284;
    const hidestep = 691;
    const num = 3;
    const scroolSpx = (data: any) => {
      if (data > base && data < hidebase &&newslist.value !==undefined) {
        newslist.value[0]?.classList.add("come_up");
        newslist.value[1]?.classList.add("come_up");
        newslist.value[2]?.classList.add("come_up");
      } else {
        newslist.value[0]?.classList.remove("come_up");
        newslist.value[1]?.classList.remove("come_up");
        newslist.value[2]?.classList.remove("come_up");
      }
      let xunhuan = Math.ceil(length.value / num);
      for (let i = 1; i < 5; i++) {
        if (data > base + step * i && data < hidebase + hidestep * i &&newslist.value !==undefined) {
          newslist.value[i * num]?.classList.add("come_up");
          newslist.value[1 + i * num]?.classList.add("come_up");
          newslist.value[2 + i * num]?.classList.add("come_up");
        } else {
          newslist.value[i * num]?.classList.remove("come_up");
          newslist.value[1 + i * num]?.classList.remove("come_up");
          newslist.value[2 + i * num]?.classList.remove("come_up");
        }
      }
    }

    //过滤时间
    const filterDate = (item: any, isMonth: boolean) => {
      let data = item.split(" ")[0];
      let year = data.split("-");
      if (isMonth) {
        return year[2] + "/" + year[1];
      }
      return year[0];
    };
    return {
      newsResult,
      filterDate,

      dialogVisible,
      imgclick,
      changeDialog,
      newsData,
      news_data,
      scroolSpx
    };
  },
});
</script>

<style scoped>
.newsresult_container {
  width: 100%;

  display: flex;
  justify-content: center;
  align-content: center;
}

/* .hide0{} */
.newsresult_wrapper {
  width: 75%;
  /* display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap; */
  /* border: 1px solid black; */
}
.newsresult_wrapper::after {
  content: "";
  display: block;
  clear: both;
}
.news_item {
  /* opacity: 0;
  transform: translateY(33px);
  transition: opacity 1200ms ease 0s, transform 1200ms ease 0s; */
  float: left;
  width: 30%;
  border-radius: 20px;
  box-shadow: 2px 2px 12px -1px rgb(0 0 0 / 19%);
  /* margin-bottom: 80px; */
  margin: 0 1% 8%;
}
.news_item:hover{
  cursor: pointer;
}
.item0,
.item1,
.item2 {
  opacity: 0;
  transform: translateY(33px);
  transition: opacity 1200ms ease 0s, transform 1200ms ease 0s;
}
.come_up {
  opacity: 1;
  transform: translateY(0px);
}
.come_up1 {
  opacity: 1;
  transform: translateY(0px);
}
img {
  width: 100%;
  background-position: 50% 50%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: -3px;
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
.content {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 250px;
  padding: 40px 20px 30px;

  flex-direction: column;

  -ms-flex-pack: center;
  justify-content: center;

  align-items: center;
  border-top: 4px solid #fdd23e;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #fff;
}
.news_content {
  display: flex;
  width: 100%;

  justify-content: center;
  overflow-wrap: break-word;
  align-items: center;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 3px;
}
.absolute {
  box-sizing: border-box;
  position: absolute;
}
.text_month {
  font-size: 30px;
  line-height: 38px;
}
.text_year {
  font-family: "Varela Round", sans-serif;
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
