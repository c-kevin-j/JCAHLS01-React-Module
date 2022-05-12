import React from "react";
import Axios from 'axios';
import { API_URL } from '../helper';
import { Button } from "reactstrap";
import ModalAdminProduct from "../components/ModalAdminProduct";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction, getProducts, filterSort, paginateProduct, deleteProduct } from "../redux/actions/productsAction";

const ProductsAdmin = (props) => {

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedIdx, setSelectedIdx] = React.useState(null)
  const [formFilter, setFormFilter] = React.useState({
    filterName: '',
    minPrice: 0,
    maxPrice: 0,
  })
  const [sortBy, setSortBy] = React.useState('')
  const [paginate, setPaginate] = React.useState(1)
  const [limit, setLimit] = React.useState(5)
  const [productsLength, setProductsLength] = React.useState(0)
  const [openAddProduct, setOpenAddProduct] = React.useState(false)

  const { products } = useSelector((state) => {
    return {
      products: state.productsReducer.products
    }
  })

  React.useEffect(() => {
    getProducts();
    getAllProducts();
  }, [])

  const getProducts = (paginate=1) => {
    // Axios.get(`${API_URL}/products?_page=${paginate}&_limit=${limit}`)
    //   .then((response) => {
    //     // jika berhasil mendapatkan response
    //     dispatch(getProductsAction(response.data))
    //   }).catch((error) => {
    //     // jika gagal mendapatkan response
    //     console.log(error);
    //   })
      dispatch(paginateProduct(paginate,limit))
  }

  const getAllProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((response) => {
        // jika berhasil mendapatkan response
        setProductsLength(response.data.length)
      }).catch((error) => {
        // jika gagal mendapatkan response
        console.log(error);
      })
  }

  const printProducts = () => {

    return products.map((value, index) => {

      let stockProduct = 0
      value.stock.forEach((val) => stockProduct += val.qty)

        return <tr key={value.id} className="align-middle">
          <td>{paginate>1?(paginate-1)*limit+index+1:index+1}</td>
          <td><img alt={`$value.id}-${value.nama}`} width="150px" src={value.images[0]} /></td>
          <td><p className="fw-bold">{value.nama}</p>
            <p>{value.kategori}</p></td>
          <td className="text-center">{stockProduct}</td>
          <td className="text-center">Rp {value.harga.toLocaleString()}</td>
          <td>
            <div className="d-grid gap-1">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDetail(index)}>Detail</button>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(value.id)}>Delete</button>
            </div>
          </td>
        </tr>
    })
  }

  const handleDelete = (id) => {
    // // 1. Menghapus data pada server berdasarkan parameter id data produk
    // Axios.delete(`${API_URL}/products/${id}`)
    //   .then((response) => {
    //     // 2. Jika berhasil, get ulang data
    //   }).catch((error) => {
    //     console.log(error)
    //   })
      dispatch(deleteProduct(id))
      getProducts()
  }

  const handleDetail = (index) => {
    setSelectedIdx(index)
    setOpenModal(!openModal)
  }

  const handleToggle = () => {
    setSelectedIdx(null)
    setOpenModal(!openModal)
  }

  const getFilteredProducts = () => {
    let { filterName, minPrice, maxPrice } = formFilter
    let byName = filterName ? `&nama_like=${filterName}` : ''
    let byPrice = ''
    if (minPrice && maxPrice) {
      byPrice = `&harga_gte=${minPrice}&harga_lte=${maxPrice}`
    } else if (minPrice) {
      byPrice = `&harga_gte=${minPrice}`
    } else if (maxPrice) {
      byPrice = `&harga_lte=${maxPrice}`
    }
    let sortRule = ''

    switch (sortBy) {
      case "HargaAsc":
        sortRule = `&_sort=harga&_order=asc`;
        break;
      case "HargaDesc":
        sortRule = `&_sort=harga&_order=desc`;
        break;
      case "NamaAsc":
        sortRule = `&_sort=nama&_order=asc`;
        break;
      case "NamaDesc":
        sortRule = `&_sort=nama&_order=desc`;
        break;
    }
    // Axios.get(`${API_URL}/products?${byName}${byPrice}${sortRule}`)
    //   .then((response) => {
    //     // jika berhasil mendapatkan response
    //     dispatch(getProductsAction(response.data))
    //   }).catch((error) => {
    //     // jika gagal mendapatkan response
    //     console.log(error);
    //   })
    dispatch(filterSort(byName, byPrice, sortRule))
  }

  const handleSort = (value) => {
    let { filterName, minPrice, maxPrice } = formFilter
    let byName = filterName ? `&nama_like=${filterName}` : ''
    let byPrice = ''
    if (minPrice && maxPrice) {
      byPrice = `&harga_gte=${minPrice}&harga_lte=${maxPrice}`
    } else if (minPrice) {
      byPrice = `&harga_gte=${minPrice}`
    } else if (maxPrice) {
      byPrice = `&harga_lte=${maxPrice}`
    }
    setSortBy(value)
    let sortRule = ''
    switch (value) {
      case "HargaAsc":
        sortRule = `&_sort=harga&_order=asc`;
        break;
      case "HargaDesc":
        sortRule = `&_sort=harga&_order=desc`;
        break;
      case "NamaAsc":
        sortRule = `&_sort=nama&_order=asc`;
        break;
      case "NamaDesc":
        sortRule = `&_sort=nama&_order=desc`;
        break;
    }

    // Axios.get(`${API_URL}/products?${byName}${byPrice}${sortRule}`)
    //   .then((res) => {
    //     dispatch(getProductsAction(res.data))
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    dispatch(filterSort(byName, byPrice, sortRule))
  }

  const handleInputFilter = (value, property) => {
    setFormFilter({ ...formFilter, [property]: value })
  }

  const handleReset = () => {
    setFormFilter({
      filterName: '',
      minPrice: 0,
      maxPrice: Infinity,
      sortBy: ''
    })
    getProducts();
  }


  const handlePaginate = (paginate) => {
    setPaginate(paginate);
    getProducts(paginate);
  }

  const printBtPagination = () => {
    let btn = []
    for (let i = 0; i < Math.ceil(productsLength / 5); i++) {
        btn.push(<Button
            outline
            color="primary"
            onClick={() => handlePaginate(i + 1)}
        >
            {i + 1}
        </Button>)
    }
    return btn;
}

  return (
    <div className="container py-4">
      <div className="row">
        <h3 className="col-11">Products Admin</h3>
        <div className="col-1 text-end">
          <button type="button" className="btn btn-success" onClick={()=>setOpenAddProduct(!openAddProduct)}>+</button>
          <ModalAdminProduct 
            openModal={openAddProduct}
            toggle={()=>setOpenAddProduct(!openAddProduct)}
            type="add"
          />
        </div>
      </div>
      {
        selectedIdx >= 0 && selectedIdx != null ?
          <ModalAdminProduct
            openModal={openModal}
            toggle={handleToggle}
            data={products[selectedIdx]}
            type="edit"
          />
          :
          null
      }
      <div className="row">
        <div className="col-3 fs-3">
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
                <input type="number" class="form-control" placeholder="Maximum" value={formFilter.maxPrice === 0 ? '' : formFilter.maxPrice} onChange={(event) => handleInputFilter(event.target.value, "maxPrice")} />
              </div>
            </div>
            <div className="py-2">
              <label>Sort</label>
              <select className="form-select" value={sortBy} onChange={(event) => handleSort(event.target.value)}>
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
          <div className="btn-group">
            {printBtPagination()}
            {/* <button type="button" class="btn btn-outline-primary" onClick={()=>handlePaginate(1)}>1</button>
            <button type="button" class="btn btn-outline-primary" onClick={()=>handlePaginate(2)}>2</button>
            <button type="button" class="btn btn-outline-primary" onClick={()=>handlePaginate(3)}>3</button> */}
          </div>
        </div>
      </div>
    </div>
  )

}

export default ProductsAdmin;