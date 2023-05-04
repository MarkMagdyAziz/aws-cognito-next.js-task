'use client'
import Link from 'next/link';
import {useContext} from 'react';
import {Nav,Navbar,Button,Container} from 'react-bootstrap';
import {AuthContext} from '../contexts/auth.context';
import {useRouter} from 'next/navigation';

const Header = () => {
  const authCtx = useContext(AuthContext)
  const router = useRouter();
  const logoutHandler = () =>{
    authCtx.signOut()
    router.push('/login');
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/login">Login</Nav.Link>
          <Nav.Link as={Link} href="/signUp">Sign Up</Nav.Link>
          <Nav.Link as={Link} href="/changepassword">Change Password</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Button variant="warning" onClick={logoutHandler} >Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
