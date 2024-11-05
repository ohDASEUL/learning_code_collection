import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url("img/bg-lost-in-space.png")`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Netflix Sans",
      }}
    >
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="img/Netflix_Logo.png"
              width="92"
              height="25"
              className="d-inline-block align-top"
              alt="Netflix logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container
        className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
        style={{
          maxWidth: "800px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "6em", fontWeight: 500 }}>Lost your way?</h1>
        <p style={{ fontSize: "2.2em", fontWeight: 300 }}>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <Button
          href="#home"
          variant="light"
          style={{ fontSize: "1.6rem", fontWeight: 500, lineHeight: "2.4rem" }}
        >
          Netflix Home
        </Button>
        <p style={{ fontSize: "2.4em", fontWeight: 100, lineHeight: "2.2em" }}>
          Error Code <strong>NSES-404</strong>
        </p>
      </Container>
    </div>
  );
};

export default NotFoundPage;
