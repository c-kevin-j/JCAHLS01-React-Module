import React from "react";
import Axios from 'axios';
import { Card, CardBody, CardImg } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { API_URL } from '../helper';

const ProductsPage = (props) => {

  const navigate = useNavigate();
  const [productList, setProductList] = React.useState ([]);
  const [formFilter, setFormFilter] = React.useState ({
    filterNname:'',
    minPrice:0,
    maxPrice:Infinity,
    sortBy:''
  })

  React.useEffect(() => {
    getProducts();
  },[])

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
    .then((response)=>{
      // jika berhasil mendapatkan response
      setProductList(response.data)

    }).catch((error)=>{
      // jika gagal mendapatkan response
      console.log(error);
    })
  }

  const getFilteredProducts = () => {
    let {filterName, minPrice, maxPrice, sortBy} = formFilter
    let byName = filterName ? `&nama_like=${filterName}` : ''
    let byPrice = minPrice && maxPrice ? `&harga_gte=${minPrice}&harga_lte=${maxPrice}` : ''
    let sortRule = sortBy ? `&${sortBy}` : ''
    console.log(`${API_URL}/products?${byName}${byPrice}${sortRule}`)

    Axios.get(`${API_URL}/products?${byName}${byPrice}${sortRule}`)
    .then((response)=>{
      // jika berhasil mendapatkan response
      setProductList(response.data)
    }).catch((error)=>{
      // jika gagal mendapatkan response
      console.log(error);
    })
  }

const printProducts = () => {
  return productList.map((value,index)=>{
    return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
      <Card className="border-0 shadow-sm">
        <CardImg
          //cara 1
          // onClick={()=> navigate('/product/detail', {
          //   state: value,
          // })}

          //cara 2
          onClick={()=>navigate(`/product/detail?id=${value.id}`)}
          src={value.images[0]}/>
        <CardBody>
          <h6 className="fw-bold">{value.nama}</h6>
          <h5 className="text-end fw-bold" style={{color:"blue"}}>IDR. {value.harga.toLocaleString()}</h5>
        </CardBody>
      </Card>
    </div>
  })
}
  
  const handleInputFilter = (value,property) => {
    setFormFilter({...formFilter,[property]: value})
  }

  const handleFilter = () => {
    getFilteredProducts();
  }

  const handleReset = () => {
    setFormFilter({
      filterName:'',
      minPrice:0,
      maxPrice:Infinity,
      sortBy:''
    })
    getProducts();
  }

  return (
   
    <div>
      <div className="container py-3 my-2 my-md-4">
        <div className="row">
          <div className="col-12 col-md-4 fs-3">
            Filter
            <div className="fs-6 my-2">
              <div className="py-2">
                <label>
                  Name
                </label>
                <input type="text" class="form-control" placeholder="Cari Produk" value={formFilter.filterName}onChange={(event)=> handleInputFilter(event.target.value,"filterName")}/>
              </div>
              <div className="py-2">
                <label>
                  Harga
                </label>
                <div className="input-group">
                  <input type="number" class="form-control" placeholder="Minimum" value={formFilter.minPrice===0?'':formFilter.minPrice} onChange={(event)=> handleInputFilter(event.target.value,"minPrice")}/>
                  <input type="number" class="form-control" placeholder="Maximum" value={formFilter.maxPrice} onChange={(event)=> handleInputFilter(event.target.value,"maxPrice")}/>
                </div>
              </div>
              <div className="py-2">
                <label>Sort</label>
                <select className="form-select" value={formFilter.sortBy} onChange={(event)=> handleInputFilter(event.target.value,"sortBy")}>
                  <option value='' selected>-Sort by-</option>
                  <option value="_sort=harga&_order=asc">Harga Asc</option>
                  <option value="_sort=harga&_order=desc">Harga Desc</option>
                  <option value="_sort=nama&_order=asc">A-Z</option>
                  <option value="_sort=nama&_order=desc">Z-A</option>
                  <option value="reset">Reset</option>               
                </select>
              </div>
              <div className="py-2 text-end">
                <button className="btn btn-outline-warning mx-1" onClick={handleReset}>Reset</button>
                <button className="btn btn-primary" onClick={handleFilter}>Filter</button>
              </div>
            </div>
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