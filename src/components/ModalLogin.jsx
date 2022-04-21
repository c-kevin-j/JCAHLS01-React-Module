import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, InputGroup, InputGroupText} from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/usersAction";

const ModalLogin = (props) => {
  // let email=""
  // let password = ""

  // const buttonLogin = () => {
  //   props.handleLogin(email,password)
  // }
  const dispatch = useDispatch();

  //Cara 2
  const [inForm, setInform] = React.useState({
    email: '',
    password: ''
  })

  const handleInput = (value, property) => {
    setInform({...inForm,[property]: value})
  }

  const handleLogin = () => {
    if (inForm.email==="" || inForm.password ===""){
      alert("Fill in all form")
    } else {
      if (inForm.email.includes("@")){
        Axios.get(`${API_URL}/users?email=${inForm.email}`)
            .then((response) => {
                // jika berhasil mendapatkan response
                if (inForm.password === response.data[0].password){
                  // menyimpan data token pada browser
                  localStorage.setItem("tokenIdUser", response.data[0].id)
                  dispatch(loginAction(response.data[0]))
                  props.toggleOpen()
                } else {
                  alert("Password Salah")
                }
            }).catch((error) => {
                // jika tidak berhasil mendapatkan response
                alert("Email tidak terdaftar")
                console.log(error);
            })
      } else {
        alert("Email wrong")
      }
    }
  }

  const [showPassword, setShowPassword] = React.useState(false)

// CARA 1  
//   return (
//     <Modal isOpen={props.openModal}>
//       <ModalHeader>
//         Login With Your Account
//       </ModalHeader>
//       <ModalBody>
//         <FormGroup>
//           <Label>Email</Label>
//           <Input type="email" onChange={(event)=> email = event.target.value}/>

//         </FormGroup>
//         <FormGroup>
//           <Label>Password</Label>

//           <Input type="password" onChange={(event)=> password = event.target.value}/>
//         </FormGroup>
//           <a className="btn px-0 text-muted">Forgot Password ?</a>
//       </ModalBody>
//       <ModalFooter>
//         <Button type ="button" className="w-100" color="primary" onClick={buttonLogin}>
//           Login
//         </Button>
//       </ModalFooter>
//     </Modal>
//   )
// }

return (
  <Modal isOpen={props.openModal} toggle={props.toggleOpen}>
    <ModalHeader>
      Login With Your Account
    </ModalHeader>
    <ModalBody>
      <FormGroup>
        <Label>Email</Label>
        {/* <Input type="email" onChange={(event)=> email = event.target.value}/> */}
        <Input type="email" value={inForm.email} onChange={(event)=> handleInput(event.target.value,"email")}/>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <InputGroup>
          <Input type={showPassword ? "text" : "password"} value={inForm.password} onChange={(event)=> handleInput(event.target.value,"password")}/>
          <InputGroupText className="btn btn-secondary" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </InputGroupText>
        </InputGroup>
        {/* <Input type="password" onChange={(event)=> password = event.target.value}/> */}
      </FormGroup>
      <div className="text-end">  
        <a className="btn px-0 text-muted">Forgot Password ?</a>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button type="button" className="w-100" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </ModalFooter>
  </Modal>
)
}

export default ModalLogin;