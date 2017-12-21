import * as types from './mutation-types'
import Vue from 'vue'
import store from './'

export const login = ({commit, state, rootState, dispatch}, user) => {
  return loginApi.loginToAuthCenter(user)
    .then(response => {
      if (data.success) {

      } else {

      }
    }).catch((err) => {
      console.log(err)
    })
}
