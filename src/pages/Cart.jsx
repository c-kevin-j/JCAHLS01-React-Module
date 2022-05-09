import Axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../helper";
import { useDispatch } from "react-redux";
import { updateCart, updateCartAction } from "../redux/actions/usersAction";

const CartPage = (props) => {

  const dispatch = useDispatch()

  const { id, cart } = useSelector((state)=>{
    return{
      id: state.usersReducer.id,
      cart: state.usersReducer.cart
    }
  })

  const { products } = useSelector((state) => {
    return {
        products: state.productsReducer.products
    }
  })

  const [totalPayment, setTotalPayment] = React.useState(0);

  // React.useEffect(() => {
  //   initialTotalPayment();
  // }, [])

  // const initialTotalPayment = () => {
  //   let total = 0;
  //   cart.forEach((val)=>{
  //     total += parseInt(val.harga * val.qty)
  //   })
  //   setTotalPayment(total)
  // }

  const handleIncrement = (cartIdx) => {
    console.log(cart)
    try{
      let maxStock = 0
      for (let i=0;i<products.length;i++){
        if (products[i].id === cart[cartIdx].idProduct){
          for (let j=0;j<products[i].stock.length;j++){
            if (products[i].stock[j].type === cart[cartIdx].type){
              maxStock = products[i].stock[j].qty
            }
          }
        }
      }

      let tempQty = cart[cartIdx].qty;
      
      if (tempQty == maxStock){
        alert("Stock tidak cukup")
      } else {
        tempQty++;
        
        cart[cartIdx].qty = tempQty
        // setTotalPayment(totalPayment + parseInt(cart[cartIdx].harga));
        // Axios.patch(`${API_URL}/users/${id}`, {
        //   cart
        // }).then((res) => {
        //   // console.log(res.data)
        //   dispatch(updateCartAction(res.data.cart))
        // }).catch((err) => {
        //   console.log(err)
        // })

        dispatch(updateCart(id,cart))
        printCart();
      }
    } catch(error) {
      console.log(error)
    }
  }

  const handleDecrement = (cartIdx) => {
    try{
      let tempQty = cart[cartIdx].qty;
      tempQty--;
      // setTotalPayment(totalPayment - parseInt(cart[cartIdx].harga));
      cart[cartIdx].qty = tempQty

      if (cart[cartIdx].qty==0){
        handleDelete(cartIdx)
      } else {
        // Axios.patch(`${API_URL}/users/${id}`, {
        //   cart
        // }).then((res) => {
        //   // console.log(res.data)
        //   dispatch(updateCartAction(res.data.cart))
        // }).catch((err) => {
        //   console.log(err)
        // })

        dispatch(updateCart(id,cart))
        printCart();
      }
    } catch(error) {
      console.log(error)
    }
  }
  
  const handleDelete = (cartIdx) => {
    // setTotalPayment(totalPayment - parseInt(cart[cartIdx].harga*cart[cartIdx].qty));
    cart.splice(cartIdx,1)
    
    // Axios.patch(`${API_URL}/users/${id}`, {
    //   cart
    // }).then((res) => {
    //   // console.log(res.data)
    //   dispatch(updateCartAction(res.data.cart))
    // }).catch((err) => {
    //   console.log(err)
    // })
    dispatch(updateCart(id,cart))
    printCart();
  }

  let total = 0

  const printCart = () => {
    total=0
    return cart.map((val,idx)=>{
      let subTotal = parseInt(val.harga) * parseInt(val.qty);
      total+=subTotal
      return <div className="pb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-2">
                  <img src={val.img} className="img-fluid"alt=""/>
                </div>
                <div className="col-2 fw-bold">
                  <div>
                    {val.nama}
                  </div>
                  <div>
                    Rp {val.harga.toLocaleString()}
                  </div>
                </div>
                <div className="col-2 text-center align-middle fw-light">
                  {val.type}
                </div>
                <div className="col-2 text-center">
                  <div className="row">
                    <span className="col cursor-pointer" onClick={()=>handleDecrement(idx)}> - </span>
                    <input type="text" value={val.qty} className="col"/>
                    <span className="col cursor-pointer" onClick={()=>handleIncrement(idx)}> + </span>
                  </div>
                </div>
                <div className="col-2 ">
                  Rp {subTotal.toLocaleString()}
                </div>
                <div className="col-2">
                  <button type="button" className="btn btn-warning btn-sm" onClick={()=>handleDelete(idx)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    })
  }

  const cardTotalPayment = () => {
    
    return <div className="card shadow">
    <div className="card-body">
      <h4>Total Payment</h4>
      <h4 className="fw-bold">
        Rp {cart!==[] ? total.toLocaleString() : null}
      </h4>
      <label className="py-2">Biaya Pengiriman</label>
      <input type="text" className="form-control"/>
      <label className="py-2">Notes</label>
      <textarea className="form-control"/>
      <div className="text-end pt-3">
        <button type="button" className="btn btn-success">
          Checkout
        </button>
      </div>
    </div>
  </div>
  }

  return <>
    <div className="container">
      <h2 className="text-center pb-3">Keranjang Belanja</h2>
      <div className="row">
        <div className="col-9">
          {printCart()}
        </div>
        <div className="col-3">
          {cardTotalPayment()}
          {/* <div className="card shadow">
            <div className="card-body">
              <h4>Total Payment</h4>
              <h4 className="fw-bold">
                Rp {cart!==[] ? totalPayment.toLocaleString() : null}
              </h4>
              <label className="py-2">Biaya Pengiriman</label>
              <input type="text" className="form-control"/>
              <label className="py-2">Notes</label>
              <textarea className="form-control"/>
              <div className="text-end pt-3">
                <button type="button" className="btn btn-success">
                  Checkout
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </>
}

export default CartPage;