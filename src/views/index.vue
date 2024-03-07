<template>
  <div class="index" v-if="userName">
    <div class="updatePost">
      <div class="title">发表博客</div>
      <el-form
        ref="ruleFormRef"
        :model="postInfo"
        :rules="rules"
        label-width="0"
        class="postForm"
      >
        <el-form-item prop="title">
          <el-input
            class="postTitle"
            v-model="postInfo.title"
            clearable
            placeholder="发表博客标题"
          />
        </el-form-item>
        <el-form-item prop="textarea">
          <el-input
            class="postContent"
            v-model="postInfo.textarea"
            type="textarea"
            prefix-icon="Lock"
            placeholder="发表博客内容"
            @keyup.enter="submitPost(ruleFormRef)"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submitPost"
            :loading="isLoading"
            @click="submitPost(ruleFormRef)"
            >发 布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
  <Post></Post>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Post from "./post.vue";
import { type FormInstance, type FormRules } from "element-plus";
import axios from "axios";
import moment from "moment";
let user = ref();
let userName = ref("");
let user_id = ref(null);
let isLoading = ref(false);

// ref
const ruleFormRef = ref<FormInstance>();
// 必填项校验接口
interface IRuleForm {
  userId: number;
  userName: string;
  title: string;
  textarea: string;
  publishDate: string;
}
// 必填项校验
const rules = ref<FormRules<IRuleForm>>({
  title: [
    {
      required: true,
      message: "请输入博客标题",
      trigger: "blur",
    },
  ],
  textarea: [
    {
      required: true,
      message: "请输入博客内容",
      trigger: "blur",
    },
  ],
});
let postInfo = reactive<IRuleForm>({
  userId: null,
  userName: "",
  title: "",
  textarea: "",
  publishDate: "",
});
onMounted(() => {
  getUserInfo();
});
function getUserInfo() {
  if (JSON.parse(sessionStorage.getItem("userInfo"))) {
    user.value = JSON.parse(sessionStorage.getItem("userInfo"));
    userName.value = user.value.userName;
    user_id.value = user.value.userId;
  }
}
const submitPost = async (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate((valid) => {
    if (valid) {
      const nowdate = Date.now();
      const publishDate = moment(nowdate).format("YYYY-MM-DD HH:mm:ss");
      postInfo.userId = user_id.value;
      postInfo.userName = userName.value;
      postInfo.publishDate = publishDate;
      isLoading.value = true;
      axios
        .post("http://127.0.0.1/post", postInfo)
        .then((res) => {
          console.log(res);
          isLoading.value = false;
          window.location.reload();
        })
        .catch((err) => {
          isLoading.value = false;
          console.log(err);
        });
    } else {
      isLoading.value = false;
      return false;
    }
  });
};
</script>
<style lang="scss" scoped>
.index {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  padding-bottom: 15px;
  box-sizing: border-box;
  .updatePost {
    background-color: rgba($color: #ffffff, $alpha: 0.6);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    .title {
      font-size: 16px;
      padding-bottom: 16px;
      font-weight: bold;
    }
    .postTitle {
      height: 50px;
      padding-bottom: 16px;
    }
    .postContent {
      height: 50px;
      display: block;
      margin-bottom: 16px;
    }
    .submitPost {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
