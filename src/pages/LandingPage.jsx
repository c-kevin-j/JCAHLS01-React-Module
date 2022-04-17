import React from 'react'; // untuk mengaktifkan library react
import Banner from '../components/Banner';
import Axios from 'axios';
import {Button} from 'reactstrap'
import { API_URL } from '../helper';

/**
 * React Data Management:
 * 1️⃣. state : 
 * - untuk memanage data pada suatu file component
 * - kita akan menyimpan data pada state ketika data tersebut mempengaruhi tampilan
 * 
 * 2️⃣. props : untuk mengelola data agar dapat digunakan oleh component lain => spesifiknya mentransfer data dari parent component ke child component
 * 
 */


// CLASS COMPONENT
// Initialize component
// let counter = 0;
// class LandingPage extends React.Component {
//   // Urutan render component 1️⃣ Constructor
//   // constructor untuk memanage data yang akan digunakan pada component react
//   constructor(props) {
//     console.log("1. constructor")
//     super(props);
//     // local data management
//     this.state = {
//       dbBanner: [],
//       dbProducts: [],
//       product1: null,
//       product2: null,
//       product3: null,
//     }
//   }

//   // Urutan render component 3️⃣ componentDidMount
//   // untuk menjalankan fungsi yang pertama kali ketika component dirender
//   componentDidMount() {
//     this.getBanner();
//     this.getProducts();
//   }

//   getBanner = () => {
//     Axios.get(`${API_URL}/banner`)
//     .then((response)=>{
//       // jika berhasil mendapatkan response
//       this.setState({ dbBanner: response.data })
//     }).catch((error)=>{
//       // jika gagal mendapatkan response
//       console.log(error);
//     })
//   }

//   getProducts = () => {
//     Axios.get(`${API_URL}/products`)
//     .then((response)=>{
//       this.setState({ dbProducts: response.data })
//       this.setState({ product1: response.data[0] })
//       this.setState({ product2: response.data[1] })
//       this.setState({ product3: response.data[2] })
//       console.log(this.state.dbProducts[0].images[0])
//     }).catch((error)=>{
//       console.log(error);
//     })
//   }

//   // render mengenerate component HTML => seperti return pada functional component
//   // Urutan render component 2️⃣ render()
//   render() {
//     console.log("2. render")
//     console.log(this.state.product1.brand)
//     // return html component
//     return (
//       <div>
//         <Banner />
//         <div className="container">
//             <div className="row">
//               <div className="col-12 col-md-4 px-3 py-4 text-center">
//                   <div className="my-2">
//                     <div>
//                       <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width='150px' className="rounded-circle"></img>  
//                     </div>
//                   </div>
//                   <div className="my-2 fs-2 text-center text-muted">
//                   Heading
//                   </div>
//                 <div className="fs-5 text-center text-muted">
//                   Some representative placeholder content for the three columns of text below the carousel. This is the first column.
//                 </div>
//                 <div className="py-3 text-center">
//                   <Button color="secondary" size="lg">
//                     View Details
//                   </Button>
//                 </div>
//             </div>

//             <div className="col-12 col-md-4 px-3 py-4 text-center">
//               <div className="my-2">
//                     <div>
//                       <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width='150px' className="rounded-circle"></img>  
//                     </div>
//                   </div>
//                   <div className="my-2 fs-2 text-center text-muted">
//                   Heading
//                   </div>
//                 <div className="fs-5 text-center text-muted">
//                   Some representative placeholder content for the three columns of text below the carousel. This is the first column.
//                 </div>
//                 <div className="py-3 text-center">
//                   <Button color="secondary" size="lg">
//                     View Details
//                   </Button>
//                 </div>
//             </div>

//             <div className="col-12 col-md-4 px-3 py-4 text-center">
//                   <div className="my-2">
//                     <div>
//                       <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" width='150px' className="rounded-circle"></img>  
//                     </div>
//                   </div>
//                   <div className="my-2 fs-2 text-center text-muted">
//                   Heading
//                   </div>
//                 <div className="fs-5 text-center text-muted">
//                   Some representative placeholder content for the three columns of text below the carousel. This is the first column.
//                 </div>
//                 <div className="py-3 text-center">
//                   <Button color="secondary" size="lg">
//                     View Details
//                   </Button>
//                 </div>
//             </div>

//           </div>
//         </div>

//         <div className="container py-4">
//         <hr/>
//           <div className="row">
//             <div className="col-12 col-md-8 ">
//               <div className="fs-1 text-muted">First featurette heading. It’ll blow your mind.</div>
//               <div className="fs-4 fw-light">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</div>
//             </div>
//             <div className="col-12 col-md-4">
              
//               <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80" width="500px"/>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

const LandingPage = (props) => {

  const [dbProduct, setDbProduct] = React.useState ([]);

  // Urutan render component 3️⃣ componentDidMount
  // untuk menjalankan fungsi yang pertama kali ketika component dirender
  React.useEffect(() => {
    getProducts();
  },[])

  const getProducts = () => {
    Axios.get(`${API_URL}/products`)
    .then((response)=>{
      setDbProduct(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  
    // return html component
    return (
      <div>
        <Banner />
        <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 px-3 py-4 text-center">
                  <div className="my-2">
                    <div>
                      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" width='150px' className="rounded-circle"></img>  
                    </div>
                  </div>
                  <div className="my-2 fs-2 text-center text-muted">
                  Heading
                  </div>
                <div className="fs-5 text-center text-muted">
                  Some representative placeholder content for the three columns of text below the carousel. This is the first column.
                </div>
                <div className="py-3 text-center">
                  <Button color="secondary" size="lg">
                    View Details
                  </Button>
                </div>
            </div>

            <div className="col-12 col-md-4 px-3 py-4 text-center">
              <div className="my-2">
                    <div>
                      <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width='150px' className="rounded-circle"></img>  
                    </div>
                  </div>
                  <div className="my-2 fs-2 text-center text-muted">
                  Heading
                  </div>
                <div className="fs-5 text-center text-muted">
                  Some representative placeholder content for the three columns of text below the carousel. This is the first column.
                </div>
                <div className="py-3 text-center">
                  <Button color="secondary" size="lg">
                    View Details
                  </Button>
                </div>
            </div>

            <div className="col-12 col-md-4 px-3 py-4 text-center">
                  <div className="my-2">
                    <div>
                      <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" width='150px' className="rounded-circle"></img>  
                    </div>
                  </div>
                  <div className="my-2 fs-2 text-center text-muted">
                  Heading
                  </div>
                <div className="fs-5 text-center text-muted">
                  Some representative placeholder content for the three columns of text below the carousel. This is the first column.
                </div>
                <div className="py-3 text-center">
                  <Button color="secondary" size="lg">
                    View Details
                  </Button>
                </div>
            </div>

          </div>
        </div>

        {
          dbProduct!=''
          ? 
          <div className="container py-4">
          <hr/>
          <div className="row align-items-center">
            <div className=" col-12 col-md-8">
              <div className="fs-2 text-muted"> {dbProduct[0].nama}</div>
              <div className="fs-4 fw-light">{dbProduct[0].deskripsi}</div>
            </div>
            <div className="col-12 col-md-4 text-center ">
              <img className="img-fluid" src={dbProduct[0].images[0]} />
            </div>
          </div>

          <hr/>
          <div className="row align-items-center ">
            <div className="col-12 col-md-4 text-center align-middle">
              <img className="img-fluid" src={dbProduct[1].images[0]} />
            </div>
            <div className="col-12 col-md-8 pt-4">
              <div className="fs-1 text-muted"> {dbProduct[1].nama}</div>
              <div className="fs-4 fw-light">{dbProduct[1].deskripsi}</div>
            </div>
          </div>

          <hr/>
          <div className="row align-items-center">
            <div className="col-12 col-md-8 pt-4">
              <div className="fs-1 text-muted"> {dbProduct[2].nama}</div>
              <div className="fs-4 fw-light">{dbProduct[2].deskripsi}</div>
            </div>
            <div className="col-12 col-md-4 text-center align-middle">   
              <img className="img-fluid" src={dbProduct[2].images[0]} />
            </div>
          </div>
        
        </div>
          : 
          null
        }

        
      </div>
    )
  }


export default LandingPage;

