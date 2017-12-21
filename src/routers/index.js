import Vue from 'vue'
import Router from 'vue-router'
import routes from './route.js'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes
  })
}
