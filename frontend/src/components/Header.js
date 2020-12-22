import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
  Modal,
  NavLink,
} from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

//login modal
import { Link } from "react-router-dom";
import Message from "./Message";
import Loader from "./Loader";
import { login } from "../actions/userActions";

import "../styles/header.css";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const [navbar, setNavbar] = useState(false);

  //login Modal
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const redirect = "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

    setShow(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const changeBackground = () => {
    if (window.scrollY >= 800) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <header>
      {userInfo ? null : <div className="background"></div>}
      <Navbar
        className={
          userInfo ? "navbar active" : navbar ? "navbar active" : "navbar"
        }
        fixed="top"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>PakFam</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo ? (
              <Route
                className="ml-auto"
                render={({ history }) => <SearchBox history={history} />}
              />
            ) : null}

            <Nav className="ml-auto">
              {userInfo ? (
                <LinkContainer to="/cart">
                  <Nav.Link>Download</Nav.Link>
                </LinkContainer>
              ) : null}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink onClick={handleShow} href="#">
                  <i className="fas fa-user"></i> Login
                </NavLink>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Photos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>downloads</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Login</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New User? (Currently disabled){" "}
              <Link to={"/register"} disabled>
                Register
              </Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
