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
// const userAdd = r => require.ensure([], () => r(require('components/pages/user/userAdd.vue')), 'group-index')
// const userEdit = r => require.ensure([], () => r(require('components/pages/user/userEdit.vue')), 'group-index')
const role = r => require.ensure([], () => r(require('components/pages/role/index.vue')), 'group-index')


const routers = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: login,
    meta: {title: '登录-后台系统'}
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
        component: workbench,
        meta: {title: '主页-后台系统'}
      },
      {
        path: 'user',
        component: user,
        meta: {title: '用户管理-后台系统'}
      },
      {
        path: 'role',
        name: 'role',
        component: role,
        meta: {title: '角色管理-后台系统'}
      }
    ]
  }
]

export default routers
