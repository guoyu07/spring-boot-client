import send from './http'
export default {
  getTokenId (postData) {
    let req = {
      data: postData,
      action: 'app.user.getToken'
    }
    return send.fetch(req, 'post')
  },
  getTokenById (postData) {
    let req = {
      data: postData,
      action: 'app.user.getConfigToken'
    }
    return send.fetch(req, 'post')
  },
  editUser (postData) {
    let req = {
      data: postData,
      action: 'app.user.editUser'
    }
    return send.fetch(req, 'post')
  }
}
