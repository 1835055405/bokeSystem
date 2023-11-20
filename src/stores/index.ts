import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import { useUserStore } from "./modules/useUserStore";
// !创建pinia

const pinia = createPinia();
// !定义piniaStore 仓库对象

interface IUser {
  [propName: string]: any;
}
const piniaStore: IUser = {};

// !定义安装函数的对象
const store = {
  install(app: any) {
    app.use(pinia.use(piniaPersist));
    piniaStore.useUserStore = useUserStore();
  },
};

export { store, piniaStore };
