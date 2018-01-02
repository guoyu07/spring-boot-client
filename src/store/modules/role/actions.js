import role from '../../api/role'

export const queryRoleList = ({commit}, data) => {
  return role.queryRoleList(data);
}
export const getCache = ({commit}, type) => {
  return role.getCache(type);
}
export const queryRoleById = ({commit}, data) => {
  return role.queryRoleById(data);
}
export const deleteRole = ({commit}, data) => {
  return role.deleteRoleById(data);
}
export const addRole = ({commit}, data) => {
  return role.addRole(data);
}
export const updateRole = ({commit}, data) => {
  return role.updateRole(data);
}
