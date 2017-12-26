import http from '../../utils/http'

export default {
  /**
   * 更新邮件的忙碌开关状态
   * @param data {emailStatus: 'close'}
   * @returns {*}
   */
  queryUserList(data) {
    return http.get("/profile_v1/user/query/all", data);
  }
}
