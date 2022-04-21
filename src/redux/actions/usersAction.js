
export const loginAction = (data) => {
  console.log("DATA DARI COMPONENT UI", data)
  return {
    type: "LOGIN_SUCCESS",
    payload: data
  }
}

export const logoutAction = () => {
  localStorage.removeItem("tokenIdUser")
  return {
    type: "LOGOUT"
  }
}