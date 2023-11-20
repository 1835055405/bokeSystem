<template>
  <el-scrollbar max-height="100vh">
    <el-header>
      <div class="title">HW博客</div>
      <div class="user">
        <el-text v-if="userName" class="mx-1">
          {{ userName }}
          <el-button @click="logOut()">退出登录</el-button>
        </el-text>

        <el-button v-else @click="toLogin()">登录</el-button>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const userName = ref("");
onMounted(() => {
  login();
});
function login() {
  if (sessionStorage.getItem("userInfo")) {
    let user = JSON.parse(sessionStorage.getItem("userInfo"));
    userName.value = user.userName;
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
</script>
<style lang="scss" scoped>
.el-header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 60px;
  z-index: 99;
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
  }
}
.el-main {
  margin-top: 60px;
  background-color: rgba($color: #a2eefe, $alpha: 0.2);
}
</style>
