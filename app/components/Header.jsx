'use client'
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/login">Login</Nav.Link>
          <Nav.Link as={Link} href="/signUp">Sign Up</Nav.Link>
          <Nav.Link as={Link} href="/changepassword">Change Password</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
