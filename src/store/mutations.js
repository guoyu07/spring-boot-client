import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.SET_LOGIN](state, data) {
    Vue.set(state, 'login', true);
    Vue.set(state, 'session', data);
  },
  [types.SET_INIT_DICDATA](state, {dicMap}) {
    if (state.session.dicMap) {
      Object.assign(state.session.dicMap, dicMap)
    } else {
      state.session.dicMap = dicMap
    }
  },
  [types.SET_TYPE_DICDATA](state, {type, data}) {
    if (!state.session.dicMap) {
      Vue.set(state.session, 'dicMap', {})
    }
    Vue.set(state.session.dicMap, type, data)
  }
}

