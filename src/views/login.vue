<template>
  <div class="login-bg">
    <div class="sub-log-model">
      <h3 class="sub-log-title">
        {{ commonTitle }}
      </h3>
      <div class="sub-log-block">
        <el-form
          ref="ruleFormRef"
          :model="loginInfo"
          :rules="rules"
          label-width="0"
          :size="'default'"
          status-icon
          class="loginForm"
        >
          <el-form-item prop="user_name">
            <el-input
              v-model="loginInfo.user_name"
              prefix-icon="User"
              clearable
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginInfo.password"
              prefix-icon="Lock"
              placeholder="请输入密码"
              show-password
              @keyup.enter="login(ruleFormRef)"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              :loading="isLoading"
              @click="login(ruleFormRef)"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-text class="signUp" type="primary" @click="toSignUp"
        >没有用户?去注册</el-text
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import { type FormInstance, type FormRules } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { piniaStore } from "@/stores";
const $route = useRoute();
const $router = useRouter();
// 标题从环境变量取
let commonTitle = computed(() => {
  return "HW博客";
});
// ref
const ruleFormRef = ref<FormInstance>();
// 必填项校验接口
interface IRuleForm {
  user_name: string;
  password: string;
}
// 必填项校验
const rules = ref<FormRules<IRuleForm>>({
  user_name: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
// 登录信息
let loginInfo = reactive<IRuleForm>({
  user_name: "",
  password: "",
});
let isLoading = ref(false);
let redirect = ref(undefined);
// 监听 $route
watch(
  $route,
  (to) => {
    redirect.value = to.redirectedFrom && to.redirectedFrom.fullPath;
  },
  { immediate: true }
);
const login = async (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate((valid) => {
    if (valid) {
      isLoading.value = true;
      piniaStore.useUserStore
        .loginSave(loginInfo)
        .then((res: any) => {
          // 判断从哪里退出，进去之后返回退出前页面，如果是初始进入，直接到根路由
          if (res !== undefined && res !== null) {
            sessionStorage.setItem("userInfo", JSON.stringify(res));
            ElMessage({
              message: "Welcome back," + loginInfo.user_name,
              type: "success",
            });
            $router
              .replace({
                path: redirect.value || "/",
              })
              .catch(() => {
                isLoading.value = false;
              });
          }
        })
        .catch(() => {
          ElMessage({
            message: "用户名或密码错误",
            type: "error",
          });
          isLoading.value = false;
        });
    } else {
      return false;
    }
  });
};
const toSignUp = () => {
  $router.push("/signUp");
};
</script>
<style lang="scss" scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/bg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .sub-log-model {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    min-height: 300px;
    background-color: rgba(250, 250, 250, 0.95);
    border-radius: 8px;

    .sub-log-title {
      border-radius: 8px 8px 0 0;
      padding: 10px 0;
      text-align: center;
      background-color: var(--el-color-primary);
      color: var(--el-fill-color-blank);
      font-size: 1.5rem;
    }
    .sub-log-block {
      padding: 30px;
      box-sizing: border-box;
    }
    .signUp {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
