<template>
  <div>
    <div
      v-infinite-scroll="load"
      class="post infinite-list"
      style="overflow: auto"
    >
      <div class="mainTitle">博客列表</div>
      <ul class="postList" v-for="item in postData" :key="item.post_id">
        <li class="postWriter">
          <span @click="goHome(item.user_name)">{{ item.user_name }}</span>
          <span class="date">{{ item.publish_date }}</span>
        </li>
        <li class="title">{{ item.title }}</li>
        <li class="content">{{ item.content }}</li>
        <li class="comment"><Comment :postId="item.post_id"></Comment></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import Comment from "./comment.vue";
import moment from "moment";
onMounted(() => {
  get();
});
let postData = ref([]);
const count = ref(0);
const load = () => {
  count.value += 2;
};
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
.infinite-list {
  height: 70vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
