import Vue from 'vue';
import App from './App';
import {createRouter} from './routers'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';浅绿色主题
import axios from 'axios';
import "babel-polyfill";
import store from './store'
import {sync} from 'vuex-router-sync'

const router = createRouter()


sync(store, router)
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.config.silent = process.env.NODE_ENV === 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'
