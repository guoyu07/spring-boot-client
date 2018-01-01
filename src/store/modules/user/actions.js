import user from '../../api/user'

export const queryUserList = ({commit}, data) => {
  return user.queryUserList(data);
}
export const deleteUser = ({commit}, data) => {
  return user.deleteUserById(data);
}
export const addUser = ({commit}, data) => {
  return user.addUser(data);
}
export const updateUser = ({commit}, data) => {
  return user.updateUser(data);
}
