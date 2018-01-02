import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import user from './modules/user'
import role from './modules/role'
import login from './modules/login'

Vue.use(Vuex)

// 定义全局常量
const store = new Vuex.Store({
  state: {
    login: false,
    loading: true,
    error: '',
    success: '',
    info: '',
    session: {}
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

store.registerModule('user', user)
store.registerModule('role', role)
store.registerModule('login', login)

//统一错误处理
let errorObj = {name: '', number: 0}
store.subscribe((mutation, state) => {
  if (mutation.type === 'SET_ERROR') {
    let one = message({message: state.error, type: 'error', duration: 3000})
    if (errorObj.name === state.error) {
      errorObj.number++
    } else {
      errorObj.number = 0
      errorObj.name = ''
    }
    if (errorObj.number > 3) {
      one.close()
    }
    errorObj.name = state.error
  }
  if (mutation.type === 'SET_SUCCESS') {
    message({message: state.success, type: 'success', duration: 3000})
  }
  if (mutation.type === 'SET_INFO') {
    message({message: state.info, type: 'info', duration: 3000})
  }
})
export default store

