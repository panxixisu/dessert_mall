<template>
  <el-dialog
    v-model="dialogShow"
    custom-class="news_dialog"
    top="2vh"
    :lock-scroll="false"
    width="28%"
    style="margin-top: -100px"
    :before-close="handleClose"
  >
    <div class="photo">
      <el-carousel height="350px">
        <el-carousel-item v-for="item in dataNews.imgDataArr" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="news_scroll">
      <div class="news_scroll_content">
        <div class="titleWrapper">
          <div class="title_content">{{ dataNews.newstitle }}</div>
        </div>
        <div class="main_content">{{ dataNews.newscontent }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed } from "vue";
import { ElMessageBox } from "element-plus";
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
    const cancel = () => {
      console.log(dialogShow.value);
      dialogShow.value = false;
    };
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    return { dialogShow, cancel, dataNews };
  },
});
</script>
<style>
.el-dialog.news_dialog {
  border-radius: 25px;
  border: 3px #fdc224 solid;
  display: flex;
  flex-direction: column;
  max-width: 415px;
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
</style>
