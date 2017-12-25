import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let popCount = 0

// 登录页
const login = resolve => require(['components/pages/login/index.vue'], resolve)

// 业务页
const index = r => require.ensure([], () => r(require('components/pages/index.vue')), 'group-index-main')
const workbench = r => require.ensure([], () => r(require('components/pages/workbenches/index.vue')), 'group-index')
const user = r => require.ensure([], () => r(require('components/pages/user/index.vue')), 'group-index')


const routers = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
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
        component: workbench
      },
      {
        path: 'user',
        name: 'user',
        component: user
      }
    ]
  }
]

export default routers
