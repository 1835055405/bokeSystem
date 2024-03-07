<template>
  <div></div>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const friendList = ref([]);
onMounted(() => {
  get();
});
const get = () => {
  if (window.sessionStorage.getItem("userInfo")) {
    const senderId = JSON.parse(
      window.sessionStorage.getItem("userInfo")
    ).userId;
    const params = {
      senderId,
    };
    axios
      .get("http://127.0.0.1/friendship", { params })
      .then((res) => {
        console.log(res);
        // friendList.value=res;
      })
      .catch((err) => {
        console.log("获取数据失败" + err);
      });
  } else {
    console.log("还未登录，请登录！");
  }
};
</script>
<style lang="scss" scoped></style>
