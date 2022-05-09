import React from "react";
import Axios from 'axios';
import { Card, CardBody, CardImg } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { API_URL } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAction, getProducts, filterSort } from '../redux/actions/productsAction';


const ProductsPage = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productList, setProductList] = React.useState([]);
    const [formFilter, setFormFilter] = React.useState({
        filterName: '',
        minPrice: 0,
        maxPrice: 0,
    })
    const [sortBy, setSortBy] = React.useState('')

    const { products } = useSelector((state) => {
        return {
            products: state.productsReducer.products
        }
    })

    React.useEffect(() => {
        dispatch(getProducts());
    }, [])

    // const getProducts = () => {
    //     Axios.get(`${API_URL}/products`)
    //         .then((response) => {
    //             // jika berhasil mendapatkan response
    //             dispatch(getProductsAction(response.data))

    //         }).catch((error) => {
    //             // jika gagal mendapatkan response
    //             console.log(error);
    //         })
    // }

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
        //     .then((res) => {
        //         // jika berhasil mendapatkan response
        //         dispatch(getProductsAction(res.data))
        //     }).catch((error) => {
        //         // jika gagal mendapatkan response
        //         console.log(error);
        //     })
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
        //     .then((res) => {
        //         dispatch(getProductsAction(res.data))
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        dispatch(filterSort(byName, byPrice, sortRule))
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
        dispatch(getProducts());
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

// import React from 'react';
// import Axios from 'axios';
// import { Card, CardBody, CardImg, FormGroup, Input, Label, Button, Collapse } from 'reactstrap';
// import { API_URL } from '../helper';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProductsAction } from '../redux/actions/productsAction';

// const ProductsPage = (props) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [dbProducts, setDbProducts] = React.useState([]);
//     const [filterName, setFilterName] = React.useState("");
//     const [filterMin, setFilterMin] = React.useState("");
//     const [filterMax, setFilterMax] = React.useState("");
//     const [orderData, setOrderData] = React.useState("null");

//     React.useEffect(() => {
//         getProducts();
//     }, []);

//     const { products } = useSelector((state) => {
//         return {
//             products: state.productsReducer.products
//         }
//     })

//     const getProducts = () => {
//         Axios.get(`${API_URL}/products`)
//             .then((response) => {
//                 // jika berhasil mendapatkan response
//                 console.log("From Component :", response.data);
//                 // setDbProducts(response.data)
//                 dispatch(getProductsAction(response.data))
//             }).catch((error) => {
//                 // jika tidak berhasil mendapatkan response
//                 console.log(error);
//             })
//     }

//     const printProducts = () => {
//         return products.map((value, index) => {
//             return <div key={value.id} className="col-12 col-md-6 col-lg-4 p-2">
//                 <Card className='border-0 bg-transparent'>
//                     <CardImg
//                         onClick={() => navigate(`/product/detail?id=${value.id}`)}

//                         // onClick={() => navigate('/product/detail', {
//                         //     state: value
//                         // })}
//                         className='shadow'
//                         style={{ borderRadius: "15px" }}
//                         src={value.images[0]} />
//                     <CardBody>
//                         <h6 className='fw-bold text-center my-0'>{value.nama}</h6>
//                         <p className='text-muted text-center my-0'>{value.kategori}</p>
//                         <h4 className='fw-bold text-center' style={{ color: "#9E887E" }}>
//                             IDR. {value.harga.toLocaleString()}
//                         </h4>
//                     </CardBody>
//                 </Card>
//             </div>
//         })
//     }

//     const handleReset = () => {
//         getProducts();
//         setFilterName("");
//         setFilterMin("");
//         setFilterMax("");
//         setOrderData("null");
//     }

//     // console.log(filterMin, filterMax)

//     // Cara 1
//     // const handleFilter = () => {
//     //     let filterQuery = `?`;
//     //     if (filterName) {
//     //         if (filterMax > 0 && filterMin > 0) {
//     //             // Kondisi jika form nama dan harga terisi
//     //             filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`;
//     //         } else {
//     //             // Kondisi jika form nama saja yang terisi
//     //             filterQuery += `nama=${filterName}`;
//     //         }
//     //     } else if (filterMax > 0 && filterMin > 0) {
//     //         filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`;
//     //     }

//     //     Axios.get(`${API_URL}/products${filterQuery}`)
//     //         .then((res) => {
//     //             console.log(res.data);
//     //             setDbProducts(res.data);
//     //         }).catch((err) => {
//     //             console.log(err)
//     //         })
//     // }

//     // Cara 2
//     const handleFilter = async () => {
//         try {
//             let filterQuery = `?`;
//             if (filterName) {
//                 if (filterMax > 0 && filterMin > 0) {
//                     // Kondisi jika form nama dan harga terisi
//                     filterQuery += `nama=${filterName}&harga_gte=${filterMin}&harga_lte=${filterMax}`;
//                 } else {
//                     // Kondisi jika form nama saja yang terisi
//                     filterQuery += `nama=${filterName}`;
//                 }
//             } else if (filterMax > 0 && filterMin > 0) {
//                 filterQuery += `harga_gte=${filterMin}&harga_lte=${filterMax}`;
//             }

//             let response = await Axios.get(`${API_URL}/products${filterQuery}`);

//             // setDbProducts(response.data)
//             dispatch(getProductsAction(response.data))

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleSort = (event) => {
//         console.log(event.target.value);
//         if (event.target.value != "null") {
//             setOrderData(event.target.value);
//             let property = event.target.value.split("-")[0];
//             let order = event.target.value.split("-")[1];
//             Axios.get(`${API_URL}/products?_sort=${property}&_order=${order}`)
//                 .then((res) => {
//                     console.log(res.data);
//                     // setDbProducts(res.data);
//                     dispatch(getProductsAction(res.data))
//                 }).catch((err) => {
//                     console.log(err)
//                 })
//         }
//     }


//     return (
//         <div>
//             <div className='container py-3'>
//                 <div className='row'>
//                     <div className='col-12 col-md-3'>
//                         <h5 style={{ color: "#4A505E" }}>Filter</h5>
//                         <Collapse isOpen={true}>
//                             <div className='row' style={{ justifyContent: "space-around" }}>
//                                 <FormGroup>
//                                     <Label>Nama</Label>
//                                     <Input type="text" value={filterName} id="text" onChange={(e) => setFilterName(e.target.value)} placeholder="Cari produk" />
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Label>Harga</Label>
//                                     <div className="d-flex">
//                                         <Input type="number" id="numb1" value={filterMin} onChange={(e) => setFilterMin(e.target.value)} placeholder="Minimum" />
//                                         <Input type="number" id="numb2" value={filterMax} onChange={(e) => setFilterMax(e.target.value)} placeholder="Maksimum" />
//                                     </div>
//                                 </FormGroup>
//                                 <FormGroup>
//                                     <Label>Sort</Label>
//                                     <Input type="select" value={orderData} style={{ width: "250px" }} onChange={handleSort}>
//                                         <option value="null">Pilih order</option>
//                                         <option value="harga-asc">Harga Asc</option>
//                                         <option value="harga-desc">Harga Desc</option>
//                                         <option value="nama-asc">A-Z</option>
//                                         <option value="nama-desc">Z-A</option>
//                                     </Input>
//                                 </FormGroup>

//                             </div>
//                             <div className="pt-2" style={{ textAlign: "end" }}>
//                                 <Button outline color="warning" type='button' onClick={handleReset} >Reset</Button>
//                                 <Button type='button'
//                                     style={{ marginLeft: 16 }}
//                                     color="primary" onClick={handleFilter}>
//                                     Filter
//                                 </Button>
//                             </div>
//                         </Collapse>
//                     </div>
//                     <div className='col-12 col-md-9'>
//                         <div className='row'>
//                             {printProducts()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductsPage;