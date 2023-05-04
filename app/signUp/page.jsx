'use client'
import React, {useState, useContext, useEffect} from 'react'
import {Container, Form, Button, Col, Row} from 'react-bootstrap';
import {AuthContext} from '../contexts/auth.context';
import {useRouter} from 'next/navigation';
import Loader from '../loader'
const SingUpPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [gender, setGender] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({email: "", password: "", username: "", givenName: "", familyName: "", gender: "", phoneNumber: "", auth: ""});

  const authContext = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {

    setEmail('')
    setPassword('')
    setUsername('')
    setGivenName('')
    setFamilyName('')
    setGender('')
    setPhoneNumber('')

  }, [])

  const controlsHandler = (event) => {
    const {name, value} = event.target
    switch(name) {
      case 'email':
        setEmail(value)

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          setErrors(prevState => ({...prevState, email: 'Invalid email address'}));
        } else {
          setErrors(prevState => ({...prevState, email: ''}));
        }
        break;

      case 'username':
        setUsername(value)

        if(value.trim().length < 4) {
          setErrors(prevState => ({...prevState, username: 'Invalid username'}));
        } else {
          setErrors(prevState => ({...prevState, username: ''}));
        }
        break;

      case 'familyName':
        setFamilyName(value)
        if(!/^[a-zA-Z]+$/.test(value)) {
          setErrors(prevState => ({
            ...prevState, familyName: "Name should be only characters"
          }));

        } else {
          setErrors(prevState => ({...prevState, familyName: ""}));
        }
        break;

      case 'givenName':
        setGivenName(value)
        if(!/^[a-zA-Z]+$/.test(value)) {
          setErrors(prevState => ({
            ...prevState, givenName: "Given name should be only characters"
          }));

        } else {
          setErrors(prevState => ({...prevState, givenName: ""}));
        }
        break;

      case 'gender':
        setGender(value)
        if(!/^[a-zA-Z]+$/.test(value)) {
          setErrors(prevState => ({
            ...prevState, gender: "Select Gender"
          }));

        } else {
          setErrors(prevState => ({...prevState, gender: ""}));
        }
        break;

      case 'gender':
        setGender(value)
        if(!/^[a-zA-Z]+$/.test(value)) {
          setErrors(prevState => ({
            ...prevState, gender: "Select Gender"
          }));

        } else {
          setErrors(prevState => ({...prevState, gender: ""}));
        }
        break;

      case 'phoneNumber':
        setPhoneNumber(value)
        if(!/^\+?[0-9]{1,3}[0-9]{3}[0-9]{3}[0-9]{4}$/.test(value)) {
          setErrors(prevState => ({
            ...prevState, phoneNumber: "Invalid Phone number !"
          }));

        } else {
          setErrors(prevState => ({...prevState, phoneNumber: ""}));
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
    setErrors(prevState => ({...prevState, auth: ""}));
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log('email', email, 'password', password, 'username', username, 'givenName', givenName, 'familyName', familyName, 'gender', gender, 'phoneNumber', phoneNumber)
    if(!email || !password || !username || !givenName || !familyName || !gender || !phoneNumber) {
      setErrors(prevState => ({...prevState, auth: "All fields should be filled"}));
      return;
    }
    try {
      setLoading(true)
      await authContext.signUp(username, email, password, givenName, familyName, gender, phoneNumber)
      router.push('/verify')
    } catch(err) {
      if(err instanceof Error) {
        setLoading(false)

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
      <h1 className='text-center'> Sing Up </h1>
        <Col xs={12} md={6}>
          <Form  method="post" onSubmit={submitHandler} >
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={controlsHandler} value={email} type="email" name="email" placeholder="Enter Email name@example.com" />
              <p className="text-danger"> {errors.email} </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={controlsHandler} value={username} type="text" name="username" placeholder="Enter Username" />
              <p className="text-danger"> {errors.username} </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="givenName">
              <Form.Label>Given Name</Form.Label>
              <Form.Control onChange={controlsHandler} value={givenName} type="text" name="givenName" placeholder="Enter Given Name" />
              <p className="text-danger"> {errors.givenName} </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="familyName">
              <Form.Label>Family Name</Form.Label>
              <Form.Control onChange={controlsHandler} value={familyName} type="text" name="familyName" placeholder="Enter Family Name" />
              <p className="text-danger"> {errors.familyName} </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control onChange={controlsHandler} value={phoneNumber} type="text" name="phoneNumber" placeholder="Enter Phone Number" />
              <p className="text-danger"> {errors.phoneNumber} </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select onChange={controlsHandler} value={gender} name="gender" >
                <option>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              <p className="text-danger"> {errors.gender} </p>
            </Form.Group>


            <Form.Group className="mb-3" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={controlsHandler} value={password} type="password" name="userPassword" placeholder="Password" />
              <p className="text-danger"> {errors.password} </p>
            </Form.Group>
            <p className="text-danger"> {errors.auth} </p>

            <Button variant="primary" type="submit">
              SignUp
            </Button>
            <br/><br/>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default SingUpPage