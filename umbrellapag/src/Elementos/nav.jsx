import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navibar() {

  const HandleSelect = (eventKey) => {
    alert(`${eventKey} foi apertado`)
  }

  return (
    <div>
    <Navbar bg="light">
      <Container style={{padding:"0px", margin:'0px 0px 0px 10px'}}>
        <img src={require("../foto/Menu.png")} height={'30px'} width={"30px"} alt='menu'/>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="me-auto" activeKey="1" onSelect={HandleSelect}>
            <NavDropdown title="" id="nav-dropdown">
              <NavDropdown.Item eventKey="1.1">Produtos</NavDropdown.Item>
              <NavDropdown.Item eventKey="1.2">Sobre nós</NavDropdown.Item>
              <NavDropdown.Item eventKey="1.3">Vagas</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="1.4">Contato</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div style={{width:'80%'}}></div>
        </Navbar.Collapse>
        <p style={{margin:'0px'}}>Pharmaceutica Umbrella</p>
      </Container>
    </Navbar>
    </div>)}