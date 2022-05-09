import axios from "axios"
import { API_URL } from "../../helper"

export const getProductsAction = (data) => {
  console.log("DATA DARI COMPONENT UI", data)
  return {
    type:"GET_PRODUCTS",
    payload: data
  }
}

export const getProducts = () => {
  return async (dispatch) => {
    axios.get(`${API_URL}/products`)
    .then((response)=>{
      dispatch(getProductsAction(response.data))
    }).catch((error)=>{
      console.log(error)
    })
  }
}

export const filterSort = (byName, byPrice, sortRule) => {
  return async (dispatch) => {
    axios.get(`${API_URL}/products?${byName}${byPrice}${sortRule}`)
            .then((res) => {
                // jika berhasil mendapatkan response
                dispatch(getProductsAction(res.data))
            }).catch((error) => {
                // jika gagal mendapatkan response
                console.log(error);
            })
  }
}

export const getDetail = (search) => {
  return async (dispatch) => {
 
      axios.get(`${API_URL}/products${search}`)
      .then((response) => {
        // jika berhasil mendapatkan response
        return (response.data[0])
      }).catch((error) => {
        // jika tidak berhasil mendapatkan response
        console.log(error);
      })  
    }
}

export const paginateProduct = (paginate, limit) => {
  return async (dispatch) => {
    axios.get(`${API_URL}/products?_page=${paginate}&_limit=${limit}`)
      .then((response) => {
        // jika berhasil mendapatkan response
        dispatch(getProductsAction(response.data))
      }).catch((error) => {
        // jika gagal mendapatkan response
        console.log(error);
      })
  }
}

export const deleteProduct = (id) => {
  return async (dispatch) => {
    axios.delete(`${API_URL}/products/${id}`)
      .then((response) => {

      }).catch((error) => {
        console.log(error)
      })
  }
}