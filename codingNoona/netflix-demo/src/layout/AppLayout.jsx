import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <Navbar className="bg-dark">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src="img/Netflix_Logo.png"
                  width="93"
                  height="25"
                  className="d-inline-block align-top"
                  alt="Netflix logo"
                />
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" className="text-light">
                Home
              </Nav.Link>
              <Nav.Link href="/movies" className="text-light">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
