import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import NavbarComponent from './components/Navbar';
import {Routes, Route } from 'react-router-dom';
import ProductsAdmin from './pages/ProductsAdmin';
import ProductDetail from './pages/ProductDetail';
import Axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from './helper';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getProductsAction, getProducts } from './redux/actions/productsAction';
import { loginAction, keepLogin } from './redux/actions/usersAction';
import TransactionsAdminPage from './pages/TransactionsAdmin';
import CartPage from './pages/Cart';
import TransactionsPage from './pages/Transactions';
import NotFoundPage from './pages/404';


// FUNCTIONAL COMPONENT
// Initialize component
function App() {

  // untuk mengeksekusi action pada redux, dan menghubungkan ke reducer
  const dispatch = useDispatch();
  
  // function & data => misal ada data yang ingin digunakan
  const { role } = useSelector((state)=>{
    return{
      role: state.usersReducer.role
    }
  })

  // const getProducts = () => {
  //   Axios.get(`${API_URL}/products`)
  //   .then((response)=>{
  //     dispatch(getProductsAction(response.data))
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

  // const keepLogin = () => {
  //   let token = localStorage.getItem("tokenIdUser")
  //   console.log(token)
  //   if (token) {
  //     Axios.get(`${API_URL}/users?id=${token}`)
  //     .then((res)=>{
  //       localStorage.setItem("tokenIdUser", res.data[0].id)
  //       dispatch(loginAction(res.data[0]))
  //     }).catch((error)=>{
  //       console.log(error)
  //     })
  //   }
  // }

  React.useEffect(() => {
    dispatch(getProducts());
    dispatch(keepLogin());
  }, [])

  //return html component
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/products" element={<ProductsPage />}/>
        <Route path="/product/detail" element={<ProductDetail />}/>
        {
          role==="admin"?
          <>
            <Route path="/products/admin" element={<ProductsAdmin />}/>
            <Route path="/transactions/admin" element={<TransactionsAdminPage />}/>
          </>
          :
          <>
            <Route path="/cart" element={<CartPage />}/>
            <Route path="/transactions" element={<TransactionsPage />}/>
          </>
        }
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

// untuk mengexport komponen agar dapat ditampilkan oleh virtual DOM react
export default App;
