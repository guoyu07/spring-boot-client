import http from '../../utils/http'

export default {
  /**
   * 查询角色列表
   * @param data
   * @returns {*}
   */
  getCache(data) {
    return http.get("/profile_v1/cache/" + data.type, data);
  },
  /**
   * 查询角色列表
   * @param data
   * @returns {*}
   */
  queryRoleList(data) {
    return http.get("/profile_v1/role/query", data);
  },
  /**
   * 查询角色列表
   * @param data
   * @returns {*}
   */
  queryRoleById(data) {
    return http.get("/profile_v1/role/query/" + data.id, data);
  },
  /**
   * 根据id删除一个角色
   * @param data
   * @returns {*}
   */
  deleteRoleById(data) {
    return http.post("/profile_v1/role/delete", {id: data.id}, '删除成功');
  },
  /**
   * 添加一个角色
   * @param data
   * @returns {*}
   */
  addRole(data) {
    var reqData = {
      displayName: data.displayName,
      permission: data.permission
    }
    return http.post("/profile_v1/role/add", reqData, '添加成功');
  },
  /**
   * 更新一个角色
   * @param data
   * @returns {*}
   */
  updateRole(data) {
    var reqData = {
      id: data.id,
      displayName: data.displayName,
      permission: data.permission
    }
    return http.post("/profile_v1/role/update", reqData, '添加成功');
  }
}
