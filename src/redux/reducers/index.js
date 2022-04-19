import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { usersReducer } from "./usersReducer"

export const globalStore = combineReducers({
  productsReducer,
  usersReducer
})

