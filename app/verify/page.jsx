'use client'
import React, {useState, useContext} from 'react'
import {Container, Form, Button, Col, Row} from 'react-bootstrap';
import {AuthContext} from '../contexts/auth.context';
import {useRouter} from 'next/navigation';
import Loader from '../loader'


const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [code, setCode] = useState('')
  const [errors, setErrors] = useState({username: "", code: "", auth: ""});
  const [loading, setLoading] = useState(false)

  const authContext = useContext(AuthContext)
  const router = useRouter();

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

      case 'code':
        setCode(value)
        if(!/^[a-z0-9]+$/i.test(value)) {
          setErrors(prevState => ({...prevState, code: "Invalid code format"}));

        } else {
          setErrors(prevState => ({...prevState, code: ""}));
        }
        break;

      default:
        break;
    }
  }
  const submitCodeHandler = async (event) => {
    event.preventDefault()
    console.log(authContext.authStatus)
    if(!username) {
      setErrors(prevState => ({...prevState, username: "Enter valid username"}));
      return;
    }
    if(!code) {
      setErrors(prevState => ({...prevState, code: "Enter valid code"}));
      return;
    }
    try {
      setLoading(true)
      await authContext.verifyCode(username, code)
      router.push('/login')
    } catch(err) {
      setLoading(false)
      setErrors(prevState => ({...prevState, auth: err.message}));
    }
  }
  if(loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col xs={12} md={8}>
          <Form  method="post" onSubmit={submitCodeHandler} >
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={controlsHandler} value={username} type="text" name="username" placeholder="Enter Useername name@example.com" />
              <p className="text-danger"> {errors.username} </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="code">
              <Form.Label>Verification Code</Form.Label>
              <Form.Control onChange={controlsHandler} value={code} type="text" name="code" placeholder="Enter verification code" />
              <p className="text-danger"> {errors.code} </p>
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