<template>
  <div class="main">
    <el-header>
      <tabBar></tabBar>
    </el-header>
    <div class="friendList" :v-if="drawer">
      <el-drawer v-model="drawer" :size="size">
        <Friend :data="dataFromParent"></Friend>
      </el-drawer>
    </div>
    <el-container>
      <!-- <el-aside :width="currentStyle">
        <div class="left">
          <div class="">
            
          </div>
          
          <el-calendar v-model="value" class="calendar" />
        </div>
      </el-aside> -->
      <el-main>
        <div class="scroll">
          <div class="block text-center">
            <el-carousel height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small justify-center" text="2xl">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="postList">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import tabBar from "../components/tabBar.vue";
import { onMounted, ref, onUnmounted } from "vue";
import Friend from "./friend.vue";
const userName = ref("");
const userId = ref(null);
const currentStyle = ref("0"); // 默认样式
const size = ref("32%");
const dataFromParent = ref("25%");
const drawer = ref(false);

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
    size.value = "80%";
    dataFromParent.value = "73%";
  } else if (screenWidth >= 1024) {
    currentStyle.value = "10vw";
    size.value = "32%";
    dataFromParent.value = "25%";
  } else {
    currentStyle.value = ""; // 或者任何适合的默认样式
    size.value = "";
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
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  white-space: nowrap;
  .el-header {
    padding: 0;
  }
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
    .calendar {
      width: 100%;
    }
  }
  .el-main {
    background-color: rgba($color: #a2eefe, $alpha: 0.2);
  }
}
</style>
