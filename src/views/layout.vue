<template>
  <div class="main">
    <el-header>
      <div class="title">HW博客</div>
      <div class="user">
        <el-text v-if="userName" class="mx-1">
          <span class="userName" @click="goHome(userName)">{{ userName }}</span>
          <el-button @click="toFriend()">好友</el-button>
          <el-button @click="logOut()">退出登录</el-button>
        </el-text>
        <el-button v-else @click="toLogin()">登录</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="currentStyle">
        <div class="left">
          <div class="searchBlock">
            <el-input
              class="inpSearch"
              type="text"
              name="search"
              id="search"
              value=""
              placeholder="请输入查询内容"
              :prefix-icon="Search"
              v-model="searchInfo"
              clearable
              @keydown.enter.prevent="goSearch(searchInfo)"
            />
            <el-button class="search" @click="goSearch(searchInfo)"
              >搜索</el-button
            >
          </div>
          <div class="scroll">
            <div class="block text-center">
              <span class="demonstration"
                >Switch when indicator is hovered</span
              >
              <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <el-calendar v-model="value" class="calendar" />
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
// import axios from "axios";
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
const router = useRouter();
const userName = ref("");
const userId = ref(null);
const currentStyle = ref("0"); // 默认样式
const value = ref(new Date());
const searchInfo = ref("");
onMounted(() => {
  login();
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
    currentStyle.value = "0";
  } else if (screenWidth >= 1024) {
    currentStyle.value = "25vw";
  } else {
    currentStyle.value = ""; // 或者任何适合的默认样式
  }
}
function login() {
  if (sessionStorage.getItem("userInfo")) {
    let user = JSON.parse(sessionStorage.getItem("userInfo"));
    userName.value = user.userName;
    userId.value = user.user_id;
    // ElMessage({
    //   message: "welcome back," + userName.value,
    //   type: "success",
    // });
  }
}
function logOut() {
  sessionStorage.clear();
  window.location.reload();
}
function toLogin() {
  router.push("/login");
}
function goHome(userName) {
  router.push({ name: "home", params: { userName } });
}
function goSearch(info) {
  console.log(info);
  router.push({ name: "search", params: { info } });
}
function toFriend() {
  router.push({ name: "home", params: { userId } });
}
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  .el-header {
    width: 100vw;
    height: 60px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    background-color: rgba($color: #000000, $alpha: 0.3);
    .title {
      font-size: 32px;
      color: #000000;
    }
    .user {
      color: #000000;
      font-weight: bold;
      .userName {
        display: inline-block;
        box-sizing: border-box;
        padding: 10px;
      }
    }
  }
  .left {
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .scroll {
      .demonstration {
        display: flex;
        color: var(--el-text-color-secondary);
        text-align: center;
        justify-content: center;
      }

      .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        text-align: center;
      }

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
    .inpSearch {
      width: 80%;
    }
    .search {
      width: 20%;
    }
    .calendar {
      width: 100%;
    }
  }
  .el-main {
    background-color: rgba($color: #a2eefe, $alpha: 0.2);
  }
  .aside {
    width: 20vw;
  }
  .noaside {
    width: 0;
  }
}
</style>
