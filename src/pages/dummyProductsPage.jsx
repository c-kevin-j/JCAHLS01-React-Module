import React from "react";
import Axios from 'axios';
import { Card, CardBody, CardImg } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { API_URL } from '../helper';
import { useSelector } from "react-redux";


const ProductsPage = (props) => {

  const navigate = useNavigate();
  const [productList, setProductList] = React.useState([]);
  const [formFilter, setFormFilter] = React.useState({
    filterName: '',
    minPrice: 0,
    maxPrice: Infinity,
    sortBy: ''
  })
  const [sortBy, setSortBy] = React.useState('')
  // const [filterName, setFilterName] = React.useState('')
  // const [filterMin, setFilterMin] = React.useState(0)
  // const [filterMax, setFilterMax] = React.useState(0)

  const { products } = useSelector((state)=>{
    return{
      products: state.productsReducer.products
    }
  })

  React.useEffect(() => {
    getProducts();
  }, [])

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        // jika berhasil mendapatkan response
        setProductList(response.data)

      }).catch((error) => {
        // jika gagal mendapatkan response
        console.log(error);
      })
  }

  const getFilteredProducts = () => {
    let { filterName, minPrice, maxPrice, sortBy } = formFilter
    let byName = filterName ? `&nama_like=${filterName}` : ''
    let byPrice = minPrice && maxPrice ? `&harga_gte=${minPrice}&harga_lte=${maxPrice}` : ''
    let sortRule = ''
    switch(sortBy){
      case "HargaAsc":
        sortRule = `&_sort=harga&_order=asc`;
        break;
      case "HargaDesc":
        sortRule = `&_sort=harga&_order=desc`;
        break;
      case "NameAsc":
        sortRule = `&_sort=nama&_order=asc`;
        break;
      case "NameDesc":
        sortRule = `&_sort=nama&_order=desc`;
        break;
    }

    Axios.get(`${API_URL}/products?${byName}${byPrice}${sortRule}`)
      .then((response) => {
        // jika berhasil mendapatkan response
        setProductList(response.data)
      }).catch((error) => {
        // jika gagal mendapatkan response
        console.log(error);
      })
  }

  const handleSort = (event) => {
    let property = event.target.value.split("-")[0];
    let order = event.target.value.split("-")[1];

    Axios.get(`${API_URL}/products?_sort=${property}&_order=${order}`)
    .then((res)=>{
      setProductList(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const printProducts = () => {
    return products.map((value, index) => {
      return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
        <Card className="border-0 shadow-sm">
          <CardImg
            //cara 1
            // onClick={()=> navigate('/product/detail', {
            //   state: value,
            // })}

            //cara 2
            onClick={() => navigate(`/product/detail?id=${value.id}`)}
            src={value.images[0]} />
          <CardBody>
            <h6 className="fw-bold">{value.nama}</h6>
            <h5 className="text-end fw-bold" style={{ color: "blue" }}>IDR. {value.harga.toLocaleString()}</h5>
          </CardBody>
        </Card>
      </div>
    })
  }

  const handleInputFilter = (value, property) => {
    setFormFilter({ ...formFilter, [property]: value })
  }


  // // Cara 1
  // const handleFilter = () => {
  //   let filterQuery = `?`;
  //   if (filterName) {
  //     if (filterMax > 0 && filterMin > 0) {
  //       // Kondisi jika form nama dan harga terisi
  //       filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`;
  //     } else {
  //       // Kondisi jika form nama saja yang terisi
  //       filterQuery += `nama=${filterName}`;
  //     }
  //   } else if (filterMax > 0 && filterMin > 0) {
  //     filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`;
  //   }

  //   Axios.get(`${API_URL}/products${filterQuery}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setProductList(res.data);
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  // }

  // // Cara 2
  // const handleFilter = async () => {
  //   try {
  //     let filterQuery = `?`;
  //     if (filterName) {
  //       if (filterMax > 0 && filterMin > 0) {
  //         // Kondisi jika form nama dan harga terisi
  //         filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`;
  //       } else {
  //         // Kondisi jika form nama saja yang terisi
  //         filterQuery += `nama=${filterName}`;
  //       }
  //     } else if (filterMax > 0 && filterMin > 0) {
  //       filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`;
  //     }

  //     let response = await Axios.get(`${API_URL}/products${filterQuery}`);

  //     setProductList(response.data)

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleReset = () => {
    setFormFilter({
      filterName: '',
      minPrice: 0,
      maxPrice: Infinity,
      sortBy: ''
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
                <input type="text" class="form-control" placeholder="Cari Produk" value={formFilter.filterName} onChange={(event) => handleInputFilter(event.target.value, "filterName")} />
              </div>
              <div className="py-2">
                <label>
                  Harga
                </label>
                <div className="input-group">
                  <input type="number" class="form-control" placeholder="Minimum" value={formFilter.minPrice === 0 ? '' : formFilter.minPrice} onChange={(event) => handleInputFilter(event.target.value, "minPrice")} />
                  <input type="number" class="form-control" placeholder="Maximum" value={formFilter.maxPrice} onChange={(event) => handleInputFilter(event.target.value, "maxPrice")} />
                </div>
              </div>
              <div className="py-2">
                <label>Sort</label>
                <select className="form-select" value={formFilter.sortBy} onChange={(event) => handleInputFilter(event.target.value, "sortBy")}>
                  <option value='' selected>-Sort by-</option>
                  <option value="HargaAsc">Harga Asc</option>
                  <option value="HargaDesc">Harga Desc</option>
                  <option value="NamaAsc">A-Z</option>
                  <option value="NamaDesc">Z-A</option>
                </select>
              </div>
              <div className="py-2 text-end">
                <button className="btn btn-outline-warning mx-1" onClick={handleReset}>Reset</button>
                <button className="btn btn-primary" onClick={getFilteredProducts}>Filter</button>
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

