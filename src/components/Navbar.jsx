import React from "react"
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavbarText, Button, ButtonGroup } from 'reactstrap'
import ModalLogin from "./ModalLogin"

import {Link, useNavigate} from 'react-router-dom';

const NavbarComponent = (props) => {

  const navigate = useNavigate();

  const [openCollapse, setOpenCollapse] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)


  const handleLogin = (inputEmail, inputPassword) => {
    console.log("email",inputEmail)
    console.log("password",inputPassword)
  }

  return (
    <div>
      <Navbar color='light' light expand="md">
        <NavbarBrand style={{ cursor: "pointer" }}onClick={()=>navigate("/")}>
          <span className='fw-bold'>
            Commerce
          </span>
        </NavbarBrand>
        <NavbarToggler onClick={() => setOpenCollapse(!openCollapse)} />
        <Collapse navbar isOpen={openCollapse}>
          <Nav
            className='me-auto'
            navbar
          >
            <NavItem>
              <Link to="/products" className="nav-link">
                <span>
                  Products
                </span>
              </Link>
            </NavItem>
            <NavItem>
              <span className='nav-link'>
                Promo
              </span>
            </NavItem>
          </Nav>
          <NavbarText>
            <ButtonGroup>
              <Button color='primary' onClick={() => setOpenModal(!openModal)}>
                Login
              </Button>
              <ModalLogin 
                openModal = {openModal}
                toggleOpen={() => setOpenModal(!openModal)}
                handleLogin = {handleLogin}
              />
              {/* <Modal isOpen={openModal}>
                <ModalHeader >
                  Login Form
                </ModalHeader>
                <ModalBody>
                  <span>Login {email}</span>
                  <Input type="email" onChange={(event)=> email = event.target.value}/>
                  <span>Password</span>
                  <Input type="password" onChange={(event)=> password = event.target.value}/>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </ModalFooter>
              </Modal> */}

              <Button color='secondary' outline onClick={()=>navigate("/register")}>
                Register
              </Button>
            </ButtonGroup>
          </NavbarText>
        </Collapse>
      </Navbar>

    </div>
  )
}

export default NavbarComponent