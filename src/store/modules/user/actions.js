import user from '../../api/user'

export const queryUserList = ({commit}, data) => {
  return user.queryUserList(data);
}
