import user from '../../api/user'

export const queryUserList = ({commit}, data) => {
  return user.queryUserList(data);
}
export const deleteUser = ({commit}, data) => {
  return user.deleteUserById(data);
}
