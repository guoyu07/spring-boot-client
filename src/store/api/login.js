import http from '../../utils/https'

export default {
  /**
   * 登录系统
   */
  loginByUsername(data) {
    var reqData = {
      username: data.username,
      password: data.password
    };
    return http.post("/profile_v1/login", reqData);
  },
  /**
   * 登出系统
   */
  logout(data) {
    return http.post("/profile_v1/logout", data);
  }
}
