<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="20vw"
        ><div class="left">
          <div class="mainTitle" ref="userDiv"></div>
          <template v-if="isLogin">
            <!-- 判断是否是好友 -->
            <template v-if="isFriend">
              <button @click="startChat()">开始聊天</button>
            </template>
            <template v-else>
              <button @click="addFriend()">添加好友</button>
            </template>
          </template>
          <template v-else>
            <button disabled>请登录</button>
          </template>
        </div></el-aside
      >
      <el-main class="right">
        <div class="post" v-if="postData.length > 0">
          <ul class="postList" v-for="item in postData" :key="item.post_id">
            <li class="postWriter">
              <span>{{ item.user_name }}</span
              ><span>{{ item.publish_date }}</span>
            </li>
            <li class="title">{{ item.title }}</li>
            <li class="content">{{ item.content }}</li>
            <li class="footer">评论</li>
            <li class="comment">
              <Comment :postId="item.post_id"></Comment>
            </li>
          </ul>
        </div>
        <div class="nopost" v-else>
          <p>该用户暂未发表过博客</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import Comment from "./comment.vue";
import moment from "moment";
let postData = ref([]);
const userDiv = ref(null);
const isFriend = ref(false);
const isLogin = ref(false);
onMounted(() => {
  get();
  judge();
});
const get = () => {
  const divElement = userDiv.value;
  const username = route.params.userName;
  const params = {
    username,
  };
  divElement.textContent = `${username}`;
  axios
    .get("http://127.0.0.1/home", { params })
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
};
const addFriend = () => {
  const senderId = JSON.parse(window.sessionStorage.getItem("userInfo")).userId;
  const receiverId = postData.value[0].user_id;
  const params = {
    senderId,
    receiverId,
  };
  axios
    .post("http://127.0.0.1/friendship", { params })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("获取数据失败" + err);
    });
};
const startChat = () => {};
const judge = () => {
  if (sessionStorage.getItem("userInfo")) {
    isLogin.value = true;
    const joiner = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).userName;
    const senderId = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).userId;
    const receiver = route.params.userName;
    const params = {
      senderId,
    };
    axios
      .get("http://127.0.0.1/friendship", { params })
      .then((res) => {
        const joinerFriends = res.data;
        for (let i = 0; i < joinerFriends.length; i++) {
          if (joinerFriends[i].user_name === receiver) {
            isFriend.value = true;
            return true;
          }
        }
        isFriend.value = false;
        return false;
      })
      .catch((err) => {
        console.log("获取数据失败" + err);
      });
    console.log(joiner, receiver);
  }
};
</script>
<style lang="scss" scoped>
.left {
  text-align: center;
  .mainTitle {
    font-size: 16px;
    box-sizing: border-box;
    padding: 20px 20px 0;
    font-weight: bold;
  }
}
.right {
  height: 100vh;
  overflow-y: scroll;
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
      width: 100%;
      position: relative;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .nopost {
    text-align: center;
  }
}
</style>
