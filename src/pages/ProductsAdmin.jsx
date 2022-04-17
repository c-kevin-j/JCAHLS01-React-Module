import React from "react";
import Axios from 'axios';
import { API_URL } from '../helper';
import { Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ModalDetail from "../components/ModalDetail";


const ProductsAdmin = (props) => {

  const [dbProducts, setDbProducts] = React.useState([])
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedIdx, setSelectedIdx] = React.useState(null)

  React.useEffect(()=>{
    getProducts()
  },[])

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
    .then((response)=>{
      setDbProducts(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const printProducts = () => {
    return dbProducts.map((value,index) => {
      let stockProduct = 0
      value.stock.forEach((val) => stockProduct += val.qty)

      return <tr key={value.id}  className="align-middle">
          <td>{index+1}</td>
          <td><img alt={`$value.id}-${value.nama}`} width="150px" src={value.images[0]} /></td>
          <td><p className="fw-bold">{value.nama}</p>
          <p>{value.kategori}</p></td>
          <td className="text-center">{stockProduct}</td>
          <td className="text-center">Rp {value.harga.toLocaleString()}</td>
          <td>
            <div className="d-grid gap-1">
              <button type="button" className="btn btn-secondary btn-sm" onClick={()=>handleDetail(index)}>Detail</button>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>handleDelete(value.id)}>Delete</button>
            </div>
          </td>
      </tr>
    })
  }

  const handleDelete = (id) => {
    // 1. Menghapus data pada server berdasarkan parameter id data produk
    Axios.delete(`${API_URL}/products/${id}`)
    .then((response)=>{
      // 2. Jika berhasil, get ulang data
      getProducts()
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleDetail = (index) => {
    setSelectedIdx(index)
    setOpenModal(!openModal)
  }

  const handleToggle = () => {
    setSelectedIdx(null)
    setOpenModal(!openModal)
  }

  return (
    <div className="container py-4">
      <h3>Products Admin</h3>
      {
        selectedIdx >= 0 && selectedIdx !=null ? 
        <ModalDetail
        openDetail={openModal}
        toggle={handleToggle}
        data={dbProducts[selectedIdx]}
        /> 
        :
        null
      }
      <div className="row">
        <div className="col-3">

        </div>
        <div className="col-9">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Products</th>
                <th>Name</th>
                <th>Stocks</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {printProducts()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

}

export default ProductsAdmin;