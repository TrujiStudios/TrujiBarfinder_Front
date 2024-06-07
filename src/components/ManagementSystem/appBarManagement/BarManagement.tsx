import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useAuth } from "../../../AuthContext";
import axios from "axios";
import { styles } from "../../../themes/barMAnagerThemes";

import "./styles.css";

function BarManagement() {
  // const { logout } = useAuth();

  const handleLogout = () => {
    axios.post(
      "http://localhost:5000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    // logout();
  };
  return (
    <>
      <Navbar expand="lg" style={styles.Headers}>
        <Container>
          <Navbar.Brand style={styles.navar} as={Link} to="/dashboard">
            Barfindert360
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={styles.navar} as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link style={styles.navar} as={Link} to="/dashboard/vender">
                Vender
              </Nav.Link>

              {/* Inicio */}
              <NavDropdown
                title="Productos"
                id="basic-nav-dropdown"
                className="custom-nav-dropdown"
              >
                <NavDropdown.Item
                  // style={styles.navar}
                  style={styles.navar}
                  as={Link}
                  to="/dashboard/category"
                >
                  Categorias
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={styles.navar}
                  as={Link}
                  to="/dashboard/product"
                >
                  Productos
                </NavDropdown.Item>
                <NavDropdown.Item style={styles.navar} href="#action/3.3">
                  Promociones
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item style={styles.navar} href="#action/3.4">
                  inventario
                </NavDropdown.Item>
              </NavDropdown>

              {/* Fin */}

              <NavDropdown title="Configuracion" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Información de negocio
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard/tablesdos">
                  Menú digital
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard/tables">
                  Mesas
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Usuarios</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Acceso de usuarios a mesas
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Suscribir otro Negocio
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              {/* Fin */}

              {/* inicio */}
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
              {/* Fin */}
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/signIn" onClick={handleLogout}>
                Cerrar sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Outlet /> */}
    </>
  );
}

export default BarManagement;
