const INITIAL_STATE = {
  id: null,
  username: "",
  email: "",
  password: "",
  role: "",
  cart: []
}

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("DAPAT DATA DARI ACTION", action.payload)
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
}
