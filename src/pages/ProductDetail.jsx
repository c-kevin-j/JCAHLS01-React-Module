import React from 'react';
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button, Collapse, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom'

const ProductDetail = (props) => {
  const navigate = useNavigate();
  const { state, search } = useLocation()

  const [detail, setDetail] = React.useState({});
  const [thumbnail, setThumbnail] = React.useState(0);
  const [selectedType, setSelectedType] = React.useState({});
  const [openType, setOpenType] = React.useState(false);
  let [qty, setQty] = React.useState(1);
  const [openToast, setOpenToast] = React.useState(false);

  React.useEffect(() => {
    getDetail()
  }, []);


  const getDetail = () => {
    console.log(search)
    Axios.get(`${API_URL}/products${search}`)
      .then((response) => {
        // jika berhasil mendapatkan response
        setDetail(response.data[0])
      }).catch((error) => {
        // jika tidak berhasil mendapatkan response
        console.log(error);
      })
  }

  const renderImages = () => {
    let { images } = detail
    return images.map((item, index) => {
      return (
        <div className='col-3 col-md-12'>
          <img className="select-image mb-1 shadow bg-white rounded" src={item}
            key={index}
            width="100%"
            onClick={() => setThumbnail(index)}
            style={{ borderBottom: thumbnail == index && "3px solid #407AB1" }}
          />
        </div>
      )
    })
  }

  const handleIncrement = () => {
    let temp = qty;
    if (temp < selectedType.qty) {
      temp++
      setQty(temp)
    } else {
      setOpenToast(true)
    }
  }
  
  const handleDecrement = () => {
    let temp = qty
    setOpenToast(false)
    if (temp > 1) {
      temp--
      setQty(temp)
    }
  }

  return (
    <div>
      <div className="position-fixed top-10 end-0" >
        <Toast isOpen={openToast}>
          <ToastHeader>
            <button type="button" class="btn-close" onClick={() => setOpenToast(false)}></button>
          </ToastHeader>
          <ToastBody icon="danger">
            Jumlah pembelian melebihi jumlah stock
          </ToastBody>
        </Toast>
      </div>
      <div className="container row p-5 m-auto bg-white rounded">
        {
          detail.id &&
          <>
            <div className="row col-md-8 text-center">
              <div className="col-12 order-md-2 col-md-10">
                <img className="shadow-sm bg-white rounded" src={detail.images[thumbnail]} width="100%" />
              </div>
              <div className="col-12 order-md-1 col-md-2">
                <div className='row my-2 my-md-0'>
                  {renderImages()}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div style={{ borderBottom: '1.5px solid gray', color: "#49505D" }}>
                <h4 style={{ fontWeight: 'bolder' }}>{detail.nama}</h4>
                <h6 className="text-mute">{detail.kategori}</h6>
                <h2 style={{ fontWeight: 'bolder', color: "#9E887E" }}>Rp {detail.harga.toLocaleString()}</h2>
              </div>
              <div style={{ borderBottom: '1.5px solid gray' }}>
                <div
                  style={{ cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => setOpenType(!openType)} >
                  Type: {selectedType.type}</div>
                <Collapse isOpen={openType}>
                  {
                    detail.stock.map((item, index) => {
                      return (
                        <div>
                          <Button outline color="secondary" size="sm"
                            style={{ width: '100%', border: 'none', textAlign: 'left' }}
                            onClick={() => {
                              setSelectedType(item)
                              setQty(1)
                              setOpenToast(false)
                            }
                            }
                          > {item.type} : {item.qty}</Button>
                        </div>
                      )
                    })
                  }
                </Collapse>
              </div>
              <p className="my-3" style={{ textAlign: "justify" }}>
                {detail.deskripsi}
              </p>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Jumlah :</span>
                <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                  <Button onClick={handleDecrement} className="material-icons p-1 text-white shadow-sm" style={{ cursor: 'pointer', backgroundColor: "#9C867B", borderRadius: "45px" }} >
                    -
                  </Button>
                  <span size="sm" style={{ width: "40%", fontSize: "24px", fontWeight: "bolder", textAlign: "center", border: 0 }}>{qty}</span>
                  <Button onClick={handleIncrement} className="material-icons p-1 text-white shadow-sm" style={{ cursor: 'pointer', backgroundColor: "#9C867B", borderRadius: "45px" }} >
                    +
                  </Button>
                </span>
              </div>
              <Button type="button" color="secondary" outline style={{ width: '100%' }} >Add to cart</Button>
            </div>
          </>
        }
      </div>
    </div >
  )
}

export default ProductDetail;