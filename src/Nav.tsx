import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AppBar() {
  return (
    <>
      <Navbar expand="lg" bg="light">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Barfindert360
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">
                Planes y precios
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Funcionalidad
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Tipo de Negocio
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Casos de éxito
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                ademy
              </Nav.Link>

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/SignIn">
                Sign in
              </Nav.Link>
              <Nav.Link as={Link} to="/SignUp">
                Sign up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default AppBar;
