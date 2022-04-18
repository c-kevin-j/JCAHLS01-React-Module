import React from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../helper";
import { Collapse, Toast, ToastBody, ToastHeader } from "reactstrap";

const ProductDetail = (props) => {

  const { search } = useLocation()
  const [dbProduct, setDbProduct] = React.useState([])
  const [openCollapse, setOpenCollapse] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState("")
  const [selectedImage, setSelectedImage] = React.useState(0)
  let [counter, setCounter] = React.useState(0)
  const [openToast, setOpenToast] = React.useState(false)

  React.useEffect(() => {
    getDetail();
  }, [])

  const getDetail = () => {
    Axios.get(`${API_URL}/products${search}`)
      .then((response) => {
        setDbProduct(response.data[0])
      }).catch((error) => {
        console.log(error);
      })
  }


  const listImages = () => {
    return dbProduct.images.map((value, index) => {

      return <div className="col-3 col-md-12 pb-2">
        <img src={value} width="100%" alt={`$value.id}-${value.nama}-${index + 1}`} onClick={()=>setSelectedImage(index)} />
      </div>
    })
  }

  const productStock = () => {
    return dbProduct.stock.map((value) => {
      return <div onClick={() => {setSelectedType(value); setCounter(1);setOpenToast(false)}}>
        {value.type} : {value.qty}
      </div>
    })
  }

  const handleDecrement = () => {
    if (counter >= 1) {
      setCounter(counter--)
      setOpenToast(false)
    }
  }

  const handleIncrement = () => {
    if (counter <= selectedType.qty) {
      setCounter(counter++)
    } else {
      setOpenToast(true)
    }
  }

  return (
    <div className="container">
      <div className="position-absolute top-10 end-0" width="200px">
                        <Toast isOpen={openToast}>
                          <ToastHeader>
                            <button type="button" class="btn-close" onClick={()=>setOpenToast(false)}></button>
                          </ToastHeader>
                          <ToastBody icon="danger">
                            Jumlah pembelian melebihi jumlah stock
                          </ToastBody>
                        </Toast>
                        </div>
      {
        dbProduct.id 
          &&
          <>
          <div className="row">
            {/* Gambar Produk */}
            <div className="col-12 col-md-7">
              <div className="container">
                <div className="row justify-content-center py-2">
                  <div className="col-12 col-md-10 order-first order-md-last py-2">
                    <img src={dbProduct.images[selectedImage]} width="100%" alt="selected"/>
                  </div>
                  <div className="col-12 col-md-2 order-last order-md-first py-2">
                    <div className="row">
                      {listImages()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi Produk */}
            <div className="col-12 col-md-5">
              <div className="container px-5">
                <div >
                  <div className="fs-2 fw-bolder">
                    {dbProduct.nama}
                  </div>
                  <div>
                    {dbProduct.kategori}
                  </div>
                  <div className="fs-2 fw-bolder">
                    Rp {parseInt(dbProduct.harga).toLocaleString()}
                  </div>
                  <hr />
                  <div style={{ cursor: 'pointer'}} className="fw-bold" onClick={() => setOpenCollapse(!openCollapse)}> 
                    Tipe: {selectedType.type} 
                  </div>
                  <Collapse isOpen={openCollapse}>
                    {productStock()}
                  </Collapse>

                  <hr />
                  <div style={{ textAlign: "justify" }}>
                    {dbProduct.deskripsi}
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-6">
                      <label>Jumlah: </label>
                    </div>
                    <div className="col-6 text-end ">
                      <div className="row">
                        <div className="col">  
                          <button className="btn btn-sm btn-secondary" onClick={handleDecrement}>-</button>
                        </div>
                        <div className="col">
                          <label>
                            {counter}
                          </label>
                        </div>
                        <div className="col">
                          <button className="btn btn-sm btn-secondary" onClick={handleIncrement}>+</button>
                        </div>
                        {/* <div className="position-absolute top-0 end-0" width="200px">
                        <Toast isOpen={openToast}>
                          <ToastHeader>
                            <button type="button" class="btn-close" onClick={()=>setOpenToast(false)}></button>
                          </ToastHeader>
                          <ToastBody icon="danger">
                            Jumlah pembelian melebihi jumlah stock
                          </ToastBody>
                        </Toast>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-outline-secondary">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default ProductDetail;
