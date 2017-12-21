import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.SET_LOGIN](state, data) {
    Vue.set(state, 'login', data.success)
    Vue.set(state, 'session', data)
  }
}

