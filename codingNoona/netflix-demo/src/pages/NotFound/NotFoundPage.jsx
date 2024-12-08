import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{ backgroundColor: "#000000", height: "68px", width: "100%" }}
      >
        <Navbar style={{ height: "100%", padding: "0 4%" }}>
          <Container fluid style={{ margin: 0, padding: 0 }}>
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
      </div>
      <div
        className="position-relative"
        style={{ flex: 1, overflow: "hidden" }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url("img/bg-lost-in-space.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            top: 0,
            left: 0,
          }}
        />
        <Container
          className="h-100 d-flex flex-column align-items-center justify-content-center"
          style={{
            maxWidth: "800px",
            textAlign: "center",
            color: "#fff",
            position: "relative",
          }}
        >
          <h1 style={{ fontSize: "6em", fontWeight: 500 }}>Lost your way?</h1>
          <p style={{ fontSize: "2.2em", fontWeight: 300 }}>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Button
            href="./"
            variant="light"
            style={{
              fontSize: "1.6rem",
              fontWeight: 500,
              lineHeight: "2.4rem",
            }}
          >
            Netflix Home
          </Button>
          <p
            style={{
              fontSize: "2.4em",
              fontWeight: 100,
              lineHeight: "2.2em",
              marginTop: "1em",
            }}
          >
            Error Code <strong>NSES-404</strong>
          </p>
        </Container>
      </div>
    </div>
  );
};

export default NotFoundPage;
