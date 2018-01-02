import login from '../../api/login'

export const loginByUsername = ({commit}, data) => {
  return login.loginByUsername(data);
}
