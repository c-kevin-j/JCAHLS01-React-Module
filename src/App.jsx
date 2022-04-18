import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
import NavbarComponent from './components/Navbar';
import {Routes, Route } from 'react-router-dom';
import ProductsAdmin from './pages/ProductsAdmin';
import ProductDetail from './pages/ProductDetail';


// FUNCTIONAL COMPONENT
// Initialize component
function App() {
  // function & data => misal ada data yang ingin digunakan
  let data = []
  //return html component
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/products" element={<ProductsPage />}/>
        <Route path="/products/admin" element={<ProductsAdmin />}/>
        <Route path="/product/detail" element={<ProductDetail />}/>
      </Routes>
    </div>
  );
}

// untuk mengexport komponen agar dapat ditampilkan oleh virtual DOM react
export default App;
