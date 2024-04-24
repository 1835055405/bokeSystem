<template>
  <div>
    <div class="post" :style="iswindows">
      <ul class="postList" v-for="item in postData" :key="item.post_id">
        <li class="postWriter">
          <span @click="goHome(item.user_name)">{{ item.user_name }}</span>
          <span class="date">{{ item.publish_date }}</span>
        </li>
        <li class="title">{{ item.title }}</li>
        <li class="content">{{ item.content }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import moment from "moment";
onMounted(() => {
  get();
  window.addEventListener("resize", updateStyleBasedOnWidth);
  updateStyleBasedOnWidth();
});
onUnmounted(() => {
  // 组件卸载时，移除事件监听器
  window.removeEventListener("resize", updateStyleBasedOnWidth);
});
function updateStyleBasedOnWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1024) {
    iswindows.value = "width:100vw";
  } else if (screenWidth >= 1024) {
    iswindows.value = "width:70vw";
  } else {
    iswindows.value = "";
  }
}
let postData = ref([]);
let iswindows = ref("");
function get() {
  axios
    .get("http://127.0.0.1/post")
    .then((res) => {
      // console.log(res);
      postData.value = res.data.reverse();
      postData.value.forEach((item) => {
        item.publish_date = moment(item.publish_date).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
    })
    .catch((err) => {
      console.log("获取数据失败" + err);
    });
}
function goHome(userName) {
  router.push({ name: "home", params: { userName } });
}
</script>
<style lang="scss" scoped>
.post {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  overflow-x: hidden;
  height: 72vh;
  .postList {
    background-color: rgba($color: #ffffff, $alpha: 0.6);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    margin: 16px 0;
    .postWriter {
      font-size: 20px;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      .date {
        font-size: 15px;
        text-align: right;
      }
    }
    .title {
      font-size: 24px;
      padding: 10px 0;
    }
    .content {
      font-size: 16px;
      box-sizing: border-box;
      background-color: rgba($color: #ffffff, $alpha: 0.8);
      padding: 10px;
    }
    .comment {
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
