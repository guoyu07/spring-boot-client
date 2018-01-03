import login from '../../api/login'
import {Message} from 'element-ui'

export const loginByUsername = ({commit}, data) => {

  return new Promise((resolve, reject) => {
    login
      .loginByUsername(data)
      .then(res => {
        if (res.success) {
          Message({
            type: 'success',
            message: '登录成功',
            duration: 2 * 1000
          })
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
