import login from '../../api/login'
import {Message} from 'element-ui'
import * as gtypes from '../../mutation-types'

export const loginByUsername = ({commit}, data) => {

  return new Promise((resolve, reject) => {
    login
      .loginByUsername(data)
      .then(res => {
        if (res.success) {
          commit(gtypes.SET_LOGIN, res.data.session);
          resolve(res);
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 2 * 1000
          })
        }
      }).catch(err => {
      console.log("err===>", err);
    });
  })
}

export const logout = ({commit}, data) => {

  return new Promise((resolve, reject) => {
    login
      .logout(data)
      .then(res => {
        if (res.success) {
          resolve(res);
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 2 * 1000
          })
        }
      }).catch(err => {
      console.log("err===>", err);
    });
  })
}
