import * as types from './mutation-types'
import * as gtypes from '../../mutation-types'
import email from '../../api/user'

export const updateEmailAutoClaimStatus = ({commit}, data) => {
  return new Promise(function (resolve) {
    user.updateEmailAutoClaimStatus(req)
      .then(
        response => {
          if (response.success) {
            commit(types.SET_EMAIL_AUTOCLAIM, data)
            resolve(response)
          } else {
            commit(gtypes.SET_ERROR, 'message.default_tips')
            resolve(response)
          }
        }
      ).catch((err) => {
      console.log(err)
    })
  })
}
