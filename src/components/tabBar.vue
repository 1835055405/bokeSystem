<template>
  <div class="main">
    <div class="el-header">
      <div class="title">HW博客</div>
      <div class="search">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          inline
        >
          <el-form-item prop="search" class="e1">
            <el-input
              type="text"
              name="search"
              id="search"
              value=""
              placeholder="请输入查询内容"
              :prefix-icon="Search"
              v-model="ruleForm.search"
              clearable
              @keydown.enter.prevent="goSearch(ruleFormRef)"
            />
          </el-form-item>
          <el-form-item class="e2">
            <el-button class="search" @click="goSearch(ruleFormRef)"
              >搜索
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="user">
        <el-text v-if="userName" class="mx-1">
          <span class="userName" @click="goHome(userName)">{{ userName }}</span>
          <el-button @click="drawer = true">好友</el-button>
          <el-button @click="logOut()">退出登录</el-button>
        </el-text>
        <el-button v-else @click="toLogin()">登录</el-button>
      </div>
    </div>
    <div class="friendList" :v-if="drawer">
      <el-drawer v-model="drawer" :size="size">
        <Friend :data="dataFromParent"></Friend>
      </el-drawer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { type FormInstance, type FormRules } from "element-plus";
import Friend from "../views/friend.vue";
const router = useRouter();
interface RuleForm {
  search: String;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  search: "",
});
const rules = reactive<FormRules<RuleForm>>({
  search: [{ required: true, message: "请输入查询内容", trigger: "blur" }],
});
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
function goSearch(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      const info = JSON.stringify(ruleForm.search).replace(/^"|"$/g, "");
      console.log(info);
      router.push({ name: "search", params: { info } });
    } else {
      console.log("error submit!", fields);
    }
  });
  //
}
</script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  white-space: nowrap;
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
    .e1,
    .e2 {
      margin: 0 5px;
      padding: 0;
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
}
</style>
