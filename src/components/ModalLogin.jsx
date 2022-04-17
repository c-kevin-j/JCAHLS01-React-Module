import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, InputGroup, InputGroupText} from "reactstrap";

const ModalLogin = (props) => {
  let email=""
  let password = ""

  const buttonLogin = () => {
    props.handleLogin(email,password)
  }

  //Cara 2
  const [inForm, setInform] = React.useState({
    email: '',
    password: ''
  })

  const handleInput = (value, property) => {
    setInform({...inForm,[property]: value})
  }

  const handleLogin = () => {
    alert(`${inForm.email} ${inForm.password}`)
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