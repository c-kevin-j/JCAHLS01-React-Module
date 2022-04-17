import React, { useState, useEffect } from "react";
import { UncontrolledCarousel } from "reactstrap";
import Axios from 'axios';

const API_URL = "http://localhost:5000";

const Banner = (props) => {

  const [bannerList, setBannerList] = useState ([
    // {
    //   key: 1,
    //   src: 'https://a.m.dana.id/danaweb/promo/1649482098-DANA-CARD-NIVAL-2.png'
    // },
    // {
    //   key: 2,
    //   src: 'https://i2.wp.com/sobatpromo.com/wp-content/uploads/2020/06/Promo-Spesial-Pengguna-Baru-DANA-Bonus-Voucher-Belanja-40.png'
    // },
    // {
    //   key: 3,
    //   src: 'https://i2.wp.com/sobatpromo.com/wp-content/uploads/2020/06/Promo-Spesial-Pengguna-Baru-DANA-Bonus-Voucher-Belanja-40.png'
    // },
  ])

  // componentDidMount pada functional component
  useEffect(() => {
    getBanner();
  },[])

  const getBanner = () => {
    Axios.get(`${API_URL}/banner`)
    .then((response)=>{
      // jika berhasil mendapatkan response
      console.log("From functional component:",response.data);
      setBannerList( response.data )
    }).catch((error)=>{
      // jika gagal mendapatkan response
      console.log(error);
    })
  }

    
  return(
      <UncontrolledCarousel 
        items={bannerList}
      />
  )
}

export default Banner;