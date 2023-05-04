'use client'
import React, {useState, useContext} from 'react'
import {Container, Form, Button, Col, Row} from 'react-bootstrap';
import {AuthContext} from '../contexts/auth.context';
import {useRouter} from 'next/navigation';
import Loader from '../loader'


const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({username: "", password: "", auth: ""});
  const authContext = useContext(AuthContext)
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const controlsHandler = (event) => {
    const {name, value} = event.target
    switch(name) {
      case 'username':
        setUsername(value)
        if(value.trim().length < 4) {
          setErrors(prevState => ({...prevState, username: 'Invalid username address'}));
        } else {
          setErrors(prevState => ({...prevState, username: ''}));
        }
        break;

      case 'userPassword':
        setPassword(value)
        if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
          setErrors(prevState => ({
            ...prevState,
            password:
              " Use strong Password min 8 letter password, with at least a symbol, upper and lower case letters and a number",
          }));

        } else {
          setErrors(prevState => ({...prevState, password: ""}));
        }
        break;

      default:
        break;
    }
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    if(!password) {
      setErrors(prevState => ({...prevState, password: "Enter Valid Password"}));
      return;
    }
    if(!username) {
      setErrors(prevState => ({...prevState, username: "Enter Valid Username"}));
      return;
    }
    try {
      setLoading(true)
      await authContext.signInWithEmail(username, password)
      router.push('/');
    } catch(err) {
      setLoading(false)
      if(err.code === 'UserNotConfirmedException') {
        setErrors(prevState => ({...prevState, auth: 'Code hasn' / 't been confirmed yet'}));
      } else {
        setErrors(prevState => ({...prevState, auth: err.message}));
      }
    }
  }
  if(loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col xs={12} md={8}>
          <Form  method="post" onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={controlsHandler} value={username} type="text" name="username" placeholder="Enter Useername name@example.com" />
              <p className="text-danger"> {errors.username} </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={controlsHandler} value={password} type="password" name="userPassword" placeholder="Password" />
              <p className="text-danger"> {errors.password} </p>
            </Form.Group>
            <p className="text-danger"> {errors.auth} </p>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage