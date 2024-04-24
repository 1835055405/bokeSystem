<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-flex">
          <div class="logo">LOGO</div>
          <div class="nav-bar">
            <div class="nav-item">博客</div>
            <div class="nav-item">分类专栏</div>
            <div class="nav-item">专题</div>
            <div class="nav-item">留言板</div>
          </div>
          <div class="user-name">{{ customer }}</div>
        </div>
      </el-header>
      <el-main>
        <div class="container">
          <div class="uploadImg">
            <el-upload
              v-model:file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </div>
          <div class="user-info">
            用户信息
            <div class="mainTitle">{{ host }}</div>
            <template v-if="isLogin">
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
          </div>
          <div class="user-blog">
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
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile } from "element-plus";
import Comment from "./comment.vue";
import moment from "moment";

const apiBaseUrl = "http://127.0.0.1";

onMounted(() => {
  get();
  judge();
});

const postData = ref([]);
const isFriend = ref(false);
const isLogin = ref(false);
const host = ref("");
const customer = ref("");
const imageUrl = ref("");
// 图片上传部分
const fileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "plant-1.png",
    url: "/images/plant-1.png",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "plant-2.png",
    url: "/images/plant-2.png",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "figure-1.png",
    url: "/images/figure-1.png",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "figure-2.png",
    url: "/images/figure-2.png",
  },
]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
// 图片上传结尾
const get = () => {
  const username = useRoute().params.userName;
  const params = { username };

  axios
    .get(`${apiBaseUrl}/home`, { params })
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
  const senderId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
  const receiverId = postData.value[0].user_id;
  const params = { senderId, receiverId };

  axios
    .post(`${apiBaseUrl}/friendship`, { params })
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
    const customerName = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).userName;
    const senderId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    const hostName = useRoute().params.userName;
    customer.value = customerName;
    host.value = String(hostName);
    const params = { senderId };

    axios
      .get(`${apiBaseUrl}/friendship`, { params })
      .then((res) => {
        const joinerFriends = res.data;
        isFriend.value = joinerFriends.some(
          (friend) => friend.user_name === hostName
        );
      })
      .catch((err) => {
        console.log("获取数据失败" + err);
      });
    console.log(customerName, hostName);
  }
};
</script>
<style lang="scss" scoped>
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo,
.nav-bar,
.user-name {
  display: flex;
  align-items: center;
}
.nav-bar {
  flex-grow: 1;
  justify-content: center;
}
.nav-item {
  margin: 0 15px;
}
.container {
  display: flex;
  justify-content: center;
  width: 80vw;
  margin: 0 auto;
}
.user-info,
.user-blog {
  width: 50%;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
