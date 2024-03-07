<template>
  <div class="searchBlock">
    <el-input
      class="inpSearch"
      type="text"
      name=""
      id=""
      v-model="beforeSearch"
      clearable
      :prefix-icon="Search"
    />
    <el-button class="search" @click="goSearch(beforeSearch)">搜索</el-button>
  </div>
  <ul v-for="(item, index) in postData" :key="index">
    <li>
      {{ item.title }}
    </li>
    <li>
      {{ item.content }}
    </li>
    <li>
      {{ item.user_name }}
    </li>
    <li>{{ item.publish_date }}</li>
  </ul>
</template>
<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
const router = useRouter();
const route = useRoute();
import moment from "moment";
let postData = ref([]);

console.log(route);
const beforeSearch = ref("");
onMounted(() => {
  beforeSearch.value =
    JSON.stringify(route.params.info).replace(/^"|"$/g, "") || "";
  get(beforeSearch.value);
});
const get = (searchInfo) => {
  let info = route.params.info;
  if (searchInfo) {
    info = searchInfo;
  }
  const params = {
    info,
  };
  axios
    .get("http://127.0.0.1/search", { params })
    .then((res) => {
      postData.value = res.data.reverse();
      postData.value.forEach((item) => {
        item.publish_date = moment(item.publish_date).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      });
      console.log(postData.value);
    })
    .catch((err) => {
      console.log("获取数据失败" + err);
    });
};
function goSearch(info) {
  console.log(info);
  if (route.name === "search") {
    get(info);
  } else {
    router.push({ name: "search", params: { info } });
  }
}
</script>
<style lang="scss" scoped>
.inpSearch {
  width: 80%;
}
.search {
  width: 20%;
}
</style>
