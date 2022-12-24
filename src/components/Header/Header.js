import React, { useEffect } from "react";
import {
  Container, Form, FormControl, Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../../redux/actions/userActions";





function Header({setSearch}) {

  const dispatch = useDispatch();

  const userLogin = useSelector((state)=> state.userLogin);
  const {userInfo} = userLogin;
  const navigate = useNavigate;
  
  const handleLogout = ()=>{
    dispatch(logout());
  };
  useEffect(() => {}, [userInfo,navigate]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand><Link to="/">Note Book</Link></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="m-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e)=> setSearch(e.target.value)}
                />
              </Form>
          </Nav>
          <Nav>
                <Link to="/myNotes" style={{padding:"8px",display:"block",textDecoration:"none"}}>My Notes</Link>
                {/* If User is Logged in then Drop Down Menu Otherwise Login Button */}
                  {userInfo ? 
                    <NavDropdown
                  id="collapsible-nav-dropdown"
                  title={userInfo.name}
                >
                      <NavDropdown.Item>
                        <Link to="/profile">
                        <img alt="Profile"
                            src={`${userInfo.pic}`}
                            width="25"
                            height="25"
                            style={{ marginRight: 10 }}
                          />
                        </Link>
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                   onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                : <Link to="/login" className="text-white" style={{padding:"8px"}}>Login</Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
