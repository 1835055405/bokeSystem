import router from './index'

// 白名单页面直接进入
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  // finish progress bar
  //   NProgress.done()
})