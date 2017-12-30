import Vue from 'vue';
import App from './App';
import {createRouter} from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
import './assets/iconfont/iconfont.css'
import "babel-polyfill";
import store from './store'
import {sync} from 'vuex-router-sync'

const router = createRouter()
router.afterEach(route => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
  }
});
sync(store, router)
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.config.silent = process.env.NODE_ENV === 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'
