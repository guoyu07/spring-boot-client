import axios from 'axios';

export default {
  /**
   * 更新邮件的忙碌开关状态
   * @param data {emailStatus: 'close'}
   * @returns {*}
   */
  queryUserList(data) {
    return axios.get("http://127.0.0.1:8011/profile_v1/user/query/all", {params: data});
  }
}
