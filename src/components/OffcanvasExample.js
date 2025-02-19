import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ReactComponent as Logo } from "../assets/logo.svg";
import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function OffcanvasExample({ type, user,setIsLoggedIn }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleWriteClick = () => {
    navigate("/writeboard");
  };

  // const handleLogoutClick = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   navigate("/");
  //   window.location.reload();
  // };

  // const handleMyPageClick = () => {
  //   navigate(`/mypage/${user.id}`);
  // };
  return (
    <>
      <Navbar sticky="top" key='md' expand='md' className=" mb-3 justify-content-between">
        <Container className="flex" style={{ width: "80%", minWidth: "400px" }}>

          {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} className='border-0 mr-20'/> */}
          <Navbar.Brand href="#" className='px-1 m-0'><Logo /></Navbar.Brand>

          {/* <div className='flex-grow-1'></div> */}
          {/* <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className=''>

              <Nav className="ms-10 fs-5 fw-bold">
                <Nav.Link href="#action1">카테고리</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas> */}
          {/* <Form className="d-flex w-[50%]">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 "
              aria-label="Search"
            />
          </Form> */}


          <InputGroup className="" style={{ width: "40%", padding: "1px", border: "1px solid", borderRadius: "20px" }}>
            <Form.Control
              placeholder="검색"
              aria-describedby="basic-addon2"
              style={{ border: "0px", outline: "none", boxShadow: "none", borderRadius: "20px" }}
            />
            <Button variant="outline-secondary" id="button-addon2" style={{ border: "0px", borderRadius: "20px", outline: "none", boxShadow: "none" }} >
              <svg aria-hidden="true" fill="currentColor" focusable="false" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="24" className="css-7kp13n">
                <path clipRule="evenodd" d="M14.9401 16.2929C13.5799 17.3622 11.8644 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.833 17.3835 13.522 16.3466 14.871L20.7071 19.2315C21.0976 19.622 21.0976 20.2552 20.7071 20.6457C20.3166 21.0362 19.6834 21.0362 19.2929 20.6457L14.9401 16.2929ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg"></path>
              </svg>
            </Button>
          </InputGroup>
          {user ? (<Button variant="dark">{user}</Button>):(<Button variant="dark" onClick={handleLoginClick}>로그인</Button>)
          }
  
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;