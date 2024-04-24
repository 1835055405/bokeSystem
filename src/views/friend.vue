<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="user">
            <el-text>好友列表</el-text>
            <el-button
              type="primary"
              style="margin-left: 16px"
              @click="drawer = true"
            >
              好友申请
            </el-button>
          </div>
        </el-header>
        <el-main>
          <ul v-for="friend in friendList">
            <li @click="goHome(friend.user_name)">{{ friend.user_name }}</li>
          </ul>

          <el-drawer
            class="FIMain"
            v-model="drawer"
            title="好友申请"
            :direction="direction"
            :before-close="handleClose"
            :size="size"
          >
            <ul v-for="rfriend in friendRequest" class="fIList">
              <li class="friendInvite">
                <span>{{ rfriend.user_name }}</span>
                <span class="btn">
                  <el-button
                    type="success"
                    plain
                    @click="acceptFriend(rfriend.other_user_id)"
                    >接受</el-button
                  >
                  <el-button
                    type="warning"
                    plain
                    @click="refuseFriend(rfriend.other_user_id)"
                    >拒绝</el-button
                  >
                </span>
              </li>
            </ul>
          </el-drawer>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const senderName = ref("");
const friendList = ref([]);
const friendRequest = ref([]);
const size = ref("");
interface Props {
  fatherMessage?: string;
}
defineProps<Props>();
onMounted(() => {
  get();
  updateStyleBasedOnWidth();
  window.addEventListener("resize", updateStyleBasedOnWidth);
});
onUnmounted(() => {
  // 组件卸载时，移除事件监听器
  window.removeEventListener("resize", updateStyleBasedOnWidth);
});
function updateStyleBasedOnWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1024) {
    size.value = "73%";
  } else if (screenWidth >= 1024) {
    size.value = "25%";
  } else {
    size.value = "";
  }
}
const get = () => {
  if (window.sessionStorage.getItem("userInfo")) {
    const senderId = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).userId;
    senderName.value = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).userName;
    console.log(senderId);
    const params = {
      senderId,
    };
    axios
      .get("http://127.0.0.1/friendship", { params })
      .then((res) => {
        friendList.value = res.data;
      })
      .catch((err) => {
        console.log("获取数据失败" + err);
      });
    axios
      .get("http://127.0.0.1/friendRequest", { params })
      .then((res) => {
        friendRequest.value = res.data;
      })
      .catch((err) => {
        console.log("获取数据失败" + err);
      });
  } else {
    console.log("还未登录，请登录！");
  }
};

const drawer = ref(false);
const direction = ref("rtl");
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const acceptFriend = (receiverId) => {
  const senderId = JSON.parse(window.sessionStorage.getItem("userInfo")).userId;
  const params = {
    status: "accepted",
    senderId,
    receiverId,
  };
  axios
    .post("http://127.0.0.1/friendRequest", { params })
    .then((res) => {
      window.location.reload();
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const refuseFriend = (receiverId) => {
  const senderId = JSON.parse(window.sessionStorage.getItem("userInfo")).userId;
  const params = {
    status: "pending",
    senderId,
    receiverId,
  };
  axios
    .post("http://127.0.0.1/friendRequest", { params })
    .then((res) => {
      window.location.reload();
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
function goHome(userName) {
  router.push({ name: "home", params: { userName } });
}
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
}
.FIMain {
  .fIList {
    .friendInvite {
      font-size: 16px;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
