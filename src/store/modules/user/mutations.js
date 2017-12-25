import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.SET_USER_LIST](state, {userList}) {
    Vue.set(state, 'tableData', userList.list)
  }
}
