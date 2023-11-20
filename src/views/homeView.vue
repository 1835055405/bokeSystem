<template>
  <div>hello world</div>
</template>
<script setup lang="ts">
import { useUserInfoStore } from "../stores/modules/userInfo";
const store = useUserInfoStore();
store.changeNum();
console.log(store.name);
console.log(store.num);
console.log(import.meta.env.VITE_APP_URL);
</script>
<style lang="scss" scoped></style>
../stores/modules/useUserInfo
