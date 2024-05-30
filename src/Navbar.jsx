import { Nav, Navbar, Container } from "react-bootstrap";

export const NavBarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <i className="fas fa-sms"></i> SMS Sender
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">
            <i className="fas fa-home"></i> Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
