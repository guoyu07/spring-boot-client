import http from '../../utils/http'

export default {
  /**
   * 查询用户列表
   * @param data
   * @returns {*}
   */
  queryUserList(data) {
    return http.get("/profile_v1/user/query", data);
  },
  /**
   * 根据id删除一个用户
   * @param data
   * @returns {*}
   */
  deleteUserById(data) {
    return http.post("/profile_v1/user/delete", {id: data.id}, '删除成功');
  },
  /**
   * 添加一个用户
   * @param data
   * @returns {*}
   */
  addUser(data) {
    var reqData = {
      username: data.username,
      realname: data.realname,
      password: data.password,
      phone: data.phone
    }
    return http.post("/profile_v1/user/add", reqData, '添加成功');
  },
  /**
   * 更新一个用户
   * @param data
   * @returns {*}
   */
  updateUser(data) {
    var reqData = {
      id: data.id,
      username: data.username,
      realname: data.realname,
      password: data.password,
      phone: data.phone
    }
    return http.post("/profile_v1/user/update", reqData, '添加成功');
  }
}
