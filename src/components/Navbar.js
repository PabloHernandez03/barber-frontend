import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbarElement = document.querySelector(".navbar");
    setNavbarHeight(navbarElement.offsetHeight);
  }, []);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      bg="black"
      variant="dark"
      expand="lg"
      className="font-monospace sticky-top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" smooth duration={300} onClick={handleClose}>
          <img
            src={require("../img/logo.webp")}
            alt="Royal Style BarberStudio"
            width="40"
            style={{ margin: "5px" }}
          />
          <span className="d-none d-md-inline">Royal Style BarberStudio</span>
          <span className="d-inline d-md-none">Royal Style</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" smooth duration={300} offset={-navbarHeight} onClick={handleClose}>
              Inicio
            </Nav.Link>
            <Nav.Link as={ScrollLink} to="barberos" smooth duration={300} offset={-navbarHeight} onClick={handleClose}>
              Barberos
            </Nav.Link>
            <Nav.Link as={ScrollLink} to="servicios" smooth duration={300} offset={-navbarHeight} onClick={handleClose}>
              Servicios
            </Nav.Link>
            <Nav.Link as={ScrollLink} to="horario" smooth duration={300} offset={-navbarHeight} onClick={handleClose}>
              Horario
            </Nav.Link>
            <Nav.Link as={ScrollLink} to="ubicacion" smooth duration={300} offset={-navbarHeight} onClick={handleClose}>
              Ubicación
            </Nav.Link>
            <Nav.Link
              className="btn btn-success text-white"
              as={ScrollLink}
              to="agenda"
              smooth
              duration={300}
              offset={-navbarHeight}
              onClick={handleClose}
            >
              Agendar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
