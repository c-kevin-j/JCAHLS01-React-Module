import axios from "axios"
import { API_URL } from "../../helper"

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

export const userLogin = (inForm , props) => {
  return async (dispatch) => {
    axios.get(`${API_URL}/users?email=${inForm.email}`)
            .then((response) => {
                // jika berhasil mendapatkan response
                if (inForm.password === response.data[0].password){
                  // menyimpan data token pada browser
                  localStorage.setItem("tokenIdUser", response.data[0].id)
                  dispatch(loginAction(response.data[0]))
                  props.toggleOpen()
                } else {
                  alert("Password Salah")
                }
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                alert("Email tidak terdaftar")
                console.log(error);
            })
  }
}

export const userRegister = (username, email, password) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${API_URL}/users`, {
        username,
        email,
        password,
        role: "user",
        cart: []
      })
      console.log ("Respon register", res.data)
      localStorage.setItem("tokenIdUser", res.data.id)
      dispatch(loginAction(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      
      // memeriksa adanya token
      if(token){
        let res = await axios.get(`${API_URL}/users?id=${token}`)
        // memeriksa apakah ada data
        if (res.data.length === 1) {
          // menyimpan ulang data
          localStorage.setItem("tokenIdUser", res.data[0].id);
          // memperbarui reducer
          dispatch(loginAction(res.data[0]))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCart = (id, cart) => {
  return async (dispatch) => {
    axios.patch(`${API_URL}/users/${id}`, {
      cart
    }).then((res) => {
      // console.log(res.data)
      dispatch(updateCartAction(res.data.cart))

    }).catch((err) => {
      console.log(err)
    })
  }
}