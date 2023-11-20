<template>
  <div class="post">
    <div class="mainTitle">博客列表</div>
    <ul class="postList" v-for="item in postData" :key="item.post_id">
      <li class="postWriter">
        <span>{{ item.user_name }}</span
        ><span>{{ item.publish_date }}</span>
      </li>
      <li class="title">{{ item.title }}</li>
      <li class="content">{{ item.content }}</li>
      <li class="footer">评论</li>
      <li class="comment"><Comment :postId="item.post_id"></Comment></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import Comment from "./comment.vue";
import moment from "moment";
onMounted(() => {
  get();
});
let postData = ref([]);
function get() {
  axios
    .get("http://127.0.0.1/post")
    .then((res) => {
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
</script>
<style lang="scss" scoped>
.post {
  width: 95vw;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  .mainTitle {
    font-size: 16px;
    box-sizing: border-box;
    padding: 20px 20px 0;
    font-weight: bold;
  }
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
    .footer {
      font-size: 20px;
      padding: 10px 0;
    }
    .comment {
      width: 85vw;
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
