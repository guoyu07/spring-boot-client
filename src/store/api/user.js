import http from '../../utils/http'

export default {
  /**
   * 查询用户列表
   * @param data
   * @returns {*}
   */
  queryUserList(data) {
    return http.get("/profile_v1/user/query/all", data);
  },
  /**
   * 根据id删除一个用户
   * @param data
   * @returns {*}
   */
  deleteUserById(data) {
    return http.post("/profile_v1/user/delete", {id: data.id}, '删除成功');
  }
}
