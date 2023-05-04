'use client'
import React, {useState, useContext} from 'react'
import {AuthContext} from '../contexts/auth.context'
import {useRouter} from 'next/navigation';
import Loader from '../loader'
import {Container, Form, Button, Col, Row} from 'react-bootstrap';

const ChangePassword = () => {
    const [errors, setErrors] = useState({password: "", newPassword: "", auth: ""});
    const [reset, setReset] = useState(false)
    const [password, setPassowrd] = useState('')
    const [newPassword, setNewPassowrd] = useState('')
    const authContext = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const router = useRouter();


    const controlsHandler = (event) => {
        const {name, value} = event.target
        switch(name) {
            case 'password':
                setPassowrd(value)
                if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
                    setErrors(prevState => ({...prevState, password: 'Invalid password'}));
                } else {
                    setErrors(prevState => ({...prevState, password: ''}));
                }
                break;

            case 'newPassword':
                setNewPassowrd(value)
                if(!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
                    setErrors(prevState => ({
                        ...prevState,
                        newPassword:
                            " Use strong Password min 8 letter password, with at least a symbol, upper and lower case letters and a number",
                    }));

                } else {
                    setErrors(prevState => ({...prevState, newPassword: ""}));
                }
                break;

            default:
                break;
        }
    }
    const signOutHandler = async () => {
        try {
          await authContext.signOut()
          router.push('/login')
        } catch (err) {
          if (err instanceof Error) {
            setErrors(prevState => ({...prevState, auth: err.message}));
          }
        }
      }
    const onSubmitChangePassword = async () => {
        try {
            setLoading(true)
            await authContext.changePassword(password, newPassword)
            setReset(true)
        } catch(err) {
            setLoading(false)
            setErrors(prevState => ({...prevState, auth: err.message}));
        }
    }

    if(loading) {
        return <Loader />;
    }
    const passwordReset = (
        <>
            <h5>Password Changed</h5>
            <Button onClick={signOutHandler} variant="primary" type="button">
                Submit
            </Button>
        </>
    )

    const updatePassword = (
        <Col xs={12} md={6}>
            <Form method="post" onSubmit={onSubmitChangePassword} >
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control onChange={controlsHandler} value={password} type="password" name="password" placeholder="Enter old password" />
                    <p className="text-danger"> {errors.password} </p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control onChange={controlsHandler} value={newPassword} type="password" name="newPassword" placeholder="New Password" />
                    <p className="text-danger"> {errors.newPassword} </p>
                </Form.Group>
                <p className="text-danger"> {errors.auth} </p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Col>
    )
    return (
        <Container>
            <Row className='d-flex justify-content-center'>
                <h1 className='text-center'> Change Password </h1>

                {!reset ? updatePassword : passwordReset}
            </Row>
        </Container>
    )
}

export default ChangePassword