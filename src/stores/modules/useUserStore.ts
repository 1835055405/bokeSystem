// 每一个存储的模块，命名规则use开头，store结尾
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  const userInfo = ref({
    userId: null,
    userName: null,
    password: null,
  });
  let loginSave = (info: object) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1/login", info)
        .then((res) => {
          userInfo.value.userName = res.data.data.username;
          userInfo.value.password = res.data.data.pwd;
          userInfo.value.userId = res.data.data.userId;
          resolve(userInfo.value);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
  let signUp = (info: object) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1/signUp", info)
        .then((res) => {
          userInfo.value.userName = res.data.data.username;
          userInfo.value.password = res.data.data.pwd;
          userInfo.value.userId = res.data.data.userId;
          resolve(userInfo.value);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };
  let logOut = () => {};
  return {
    userInfo,
    loginSave,
    signUp,
    logOut,
  };
});
