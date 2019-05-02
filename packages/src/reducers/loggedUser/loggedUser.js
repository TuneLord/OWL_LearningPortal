const loggedUser = (isLogin = false, action) => {
  if (action.type === "LOGIN_ACCESS") {
    return action.payload;
  }

  return isLogin;
};

export default loggedUser;
