import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let popCount = 0

// 登录页
const login = resolve => require(['components/business-modules/login/index.vue'], resolve)

// 业务页
const index = r => require.ensure([], () => r(require('components/ui-modules/index.vue')), 'group-index-main')
const workbench = r => require.ensure([], () => r(require('components/business-modules/workbenches/index.vue')), 'group-index')


const routers = [{
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    title: 'login'
  }
}, {
  path: '/index',
  component: index,
  children: [
    {
      path: '',
      redirect: 'workbench'
    },
    {
      path: 'workbench',
      name: 'workbench',
      component: workbench,
      meta: {
        title: 'workbench'
      }
    }
  ]
}, {
  path: '*',
  redirect: to => {
    // 方法接收 目标路由 作为参数
    // return 重定向的 字符串路径/路径对象
    popCount++
    if (to.query.sessionId) {
      window.sessionStorage.setItem('sessionId', to.query.sessionId)
      return './index/workbench'
    } else if (to.path === '/') {
      return './login'
    }
    let path = to.path.split('/')
    for (let i = 0; i < popCount; i++) {
      path.pop()
    }
    return path.join('/')
  }
}]

export default routers
