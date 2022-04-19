const INITIAL_STATE = {
  products:[]
}

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case "GET_PRODUCTS":
      console.log("DAPAT DATA DARI ACTION",action.payload)
      return {...state, products: action.payload};
    default:
        return state;
  }
}
