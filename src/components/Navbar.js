import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={require("../img/logo.webp")} alt="Royal Style BarberStudio" width="40" className="rounded-circle" style={{ margin: "5px" }}/>
          Royal Style BarberStudio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/barberos">
              Barberos
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/horario">
              Horario
            </Nav.Link>
            <Nav.Link as={Link} to="/ubicacion">
              Ubicación
            </Nav.Link>
            <Nav.Link
              className="btn btn-success text-white"
              as={Link}
              to="/agenda"
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
