
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

export const updateCartAction = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data
  }
}