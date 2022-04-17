import React from "react";
import Axios from 'axios';
import { Card, CardBody, CardImg } from "reactstrap";

import { API_URL } from '../helper';

const ProductsPage = (props) => {

  const [productList, setProductList] = React.useState ([]);

  React.useEffect(() => {
    getProducts();
  },[])

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
    .then((response)=>{
      // jika berhasil mendapatkan response
      setProductList(response.data)
      console.log(productList)

    }).catch((error)=>{
      // jika gagal mendapatkan response
      console.log(error);
    })
  }

const printProducts = () => {
  return productList.map((value,index)=>{
    return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
      <Card className="border-0 shadow-sm">
        <CardImg src={value.images[0]}/>
        <CardBody>
          <h6 className="fw-bold">{value.nama}</h6>
          <h5 className="text-end fw-bold" style={{color:"blue"}}>IDR. {value.harga.toLocaleString()}</h5>
        </CardBody>
      </Card>
    </div>
  })
}

  return (
   
    <div>
      <div className="container py-3 my-2 my-md-4">
        <div className="row">
          <div className="col-12 col-md-4">
            Search
          </div>
          <div className="col-12 col-md-8">
            <div className="row">
              {printProducts()}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductsPage