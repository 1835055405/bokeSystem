<template>
  <div class="comment">
    <span class="commentTitle" v-show="commentPost.length > 0">评论</span>
    <ul v-for="(item, index) in commentPost" :key="item.comment_id">
      <li class="content">
        <p class="userContent">
          <span class="userName">{{ item.user_name }}</span
          >: <span class="userSays">{{ item.content }}</span>
          <span class="date">{{ item.comment_date }}</span>
        </p>
      </li>
    </ul>
    <div class="updateComment" v-if="user_name">
      <div class="submit">发表评论</div>
      <el-form
        ref="ruleFormRef"
        :model="commentInfo"
        :rules="rules"
        label-width="0"
        class="commentForm"
      >
        <el-form-item prop="content">
          <el-input
            class="commentContent"
            v-model="commentInfo.content"
            type="textarea"
            placeholder="评论"
            @keyup.enter="submitComment(ruleFormRef)"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="submitComment"
            :loading="isLoading"
            @click="submitComment(ruleFormRef)"
            >发 布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, reactive, ref } from "vue";
import { type FormInstance, type FormRules } from "element-plus";
import moment from "moment";
onMounted(() => {
  get();
  getUserInfo();
});
let commentData = ref([]);
let commentPost = ref([]);
let user = ref();
let user_name = ref("");
let user_id = ref(null);
const props = defineProps(["postId"]);
const post_id = props.postId;
let isLoading = ref(false);
// ref
const ruleFormRef = ref<FormInstance>();
// 必填项校验接口
interface IRuleForm {
  // content, userId, userName, postId
  content: string;
  userId: number;
  userName: string;
  postId: number;
  commentDate: string;
}
// 必填项校验
const rules = ref<FormRules<IRuleForm>>({
  content: [
    {
      required: true,
      message: "请输入评论内容",
      trigger: "blur",
    },
  ],
});
let commentInfo = reactive<IRuleForm>({
  content: "",
  userId: null,
  userName: "",
  postId: null,
  commentDate: "",
});
const submitComment = async (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate((valid) => {
    if (valid) {
      const nowdate = Date.now();
      const commentDate = moment(nowdate).format("YYYY-MM-DD HH:mm:ss");
      const post_id = props.postId;
      commentInfo.userId = user_id.value;
      commentInfo.userName = user_name.value;
      commentInfo.postId = post_id;
      commentInfo.commentDate = commentDate;
      isLoading.value = true;
      axios
        .post("http://127.0.0.1/comment", commentInfo)
        .then((res) => {
          window.location.reload();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      isLoading.value = false;
      return false;
    }
  });
};
function getUserInfo() {
  if (JSON.parse(sessionStorage.getItem("userInfo"))) {
    user.value = JSON.parse(sessionStorage.getItem("userInfo"));
    user_name.value = user.value.userName;
    user_id.value = user.value.userId;
  }
}
function get() {
  axios
    .get("http://127.0.0.1/comment")
    .then((res) => {
      commentData.value = res.data;
      commentData.value.forEach((item) => {
        item.comment_date = moment(item.comment_date).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });

      commentPost.value = commentData.value.filter((item) => {
        return item.post_id == post_id;
      });
      const slicePost = computed(() => commentPost.value.slice(0, 3));
      commentPost.value = slicePost.value;
    })
    .catch((err) => {
      console.log("获取数据失败" + err);
    });
}
</script>
<style lang="scss" scoped>
.comment {
  margin-top: 10px;
  .commentTitle {
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px;
  }
  .content {
    box-sizing: border-box;
    padding: 10px;
    background-color: rgba($color: #ffffff, $alpha: 0.8);
    border-radius: 20px;
    margin: 10px 0;
    .userContent {
      overflow: hidden;
      .userName {
        font-size: 16px;
      }
      .userSays {
        font-size: 14px;
      }
      .date {
        float: right;
      }
    }
  }

  .updateComment {
    .submit {
      font-size: 20px;
      box-sizing: border-box;
      padding: 5px 0;
    }
    .submitComment {
      width: 100vw;
    }
  }
}
</style>
