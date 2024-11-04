import React, { useEffect } from "react";
import { Container, Navbar, Button } from "react-bootstrap";

const NotFoundPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fontStyle = `
    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 100;
      src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Th.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 300;
      src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Lt.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 400;
      src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2) format('woff2');
    }
    @font-face {
      font-family: 'Netflix Sans';
      font-weight: 500;
      src: url(https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Md.woff2) format('woff2');
    }
  `;

  const containerStyle = {
    minHeight: "100vh",
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("/img/bg-lost-in-space.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Netflix Sans', Helvetica, Arial, sans-serif",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 20px",
    transform: "translateY(-10%)",
  };

  const titleStyle = {
    fontSize: "4rem",
    fontWeight: "500",
    marginBottom: "1rem",
    letterSpacing: "-0.5px",
  };

  const descriptionStyle = {
    fontSize: "1.4rem",
    fontWeight: "300",
    marginBottom: "2rem",
    opacity: "0.9",
    letterSpacing: "0.1px",
  };

  const errorCodeWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  const errorCodeContainer = {
    display: "flex",
    alignItems: "center",
    transform: "scale(1.5)",
  };

  const redLineStyle = {
    width: "2px",
    height: "25px",
    background: "#E50914",
    marginRight: "15px",
  };

  const errorCodeStyle = {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "200",
    fontSize: "24px",
    letterSpacing: "2px",
  };

  const errorCodeNumberStyle = {
    fontWeight: "500",
    marginLeft: "8px",
    letterSpacing: "1px",
    color: "white",
  };

  const sourceStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "1.4em",
    fontWeight: "100",
    letterSpacing: ".1em",
    lineHeight: "1.5vw",
    margin: "2.5vw 4.8vw",
    textShadow: "0 1px 2px rgba(0,0,0,.57)",
  };

  return (
    <>
      <style>{fontStyle}</style>
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
        </Container>
      </Navbar>
      <div style={containerStyle}>
        <Container style={contentStyle}>
          <div style={{ maxWidth: "800px" }}>
            <h1 style={titleStyle}>Lost your way?</h1>
            <p style={descriptionStyle}>
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </p>
            <Button href="/" variant="light" size="lg">
              Netflix Home
            </Button>
            <div style={errorCodeWrapper}>
              <div style={errorCodeContainer}>
                <div style={redLineStyle} />
                <span style={errorCodeStyle}>
                  Error Code <span style={errorCodeNumberStyle}>NSES-404</span>
                </span>
              </div>
            </div>
          </div>
        </Container>

        <div style={sourceStyle}>
          FROM{" "}
          <strong
            style={{
              color: "hsla(0,0%,90%,.77)",
              letterSpacing: "normal",
              marginLeft: ".2em",
            }}
          >
            LOST IN SPACE
          </strong>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
