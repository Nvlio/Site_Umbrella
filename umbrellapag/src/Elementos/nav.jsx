import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';


export default function Navibar() {



  return (
    <div>
      <Navbar bg="light">
        <Container style={{ padding: "0px", margin: '0px 0px 0px 10px' }}>
          <img src={require("../foto/Menu.png")} height={'30px'} width={"30px"} alt='menu' />
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey="1">
              <NavDropdown title="" id="nav-dropdown">
                <LinkContainer to={"/Prod"}><NavDropdown.Item>Produtos</NavDropdown.Item></LinkContainer>
                <LinkContainer to={"/About"}><NavDropdown.Item eventKey="1.2">Sobre nós</NavDropdown.Item></LinkContainer>
                <LinkContainer to={"/Jobs"}><NavDropdown.Item eventKey="1.3">Vagas</NavDropdown.Item></LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to={"/Contact"}><NavDropdown.Item eventKey="1.4">Contato</NavDropdown.Item></LinkContainer>
              </NavDropdown>
            </Nav>
            <div style={{ width: '80%' }}></div>
          </Navbar.Collapse>
          <LinkContainer to={"/"}><Navbar.Brand>Pharmaceutica Umbrella</Navbar.Brand></LinkContainer>
          {/* cadastro e login vai ficar aqui*/}
        </Container>
      </Navbar>
    </div>)
}