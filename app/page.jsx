'use client'
import React, {useEffect} from 'react'
import {useContext} from 'react'
import {AuthContext} from './contexts/auth.context'
import {useState} from 'react'
import {Container, Form, Button, Col, Row} from 'react-bootstrap';

const HomePage = () => {
  const authCtx = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState({attrInfo: "", authStatus: "", sessionInfo: ""})
  useEffect(() => {
    setCurrentUser({
      attrInfo: JSON.stringify(authCtx.attrInfo),
      authStatus: JSON.stringify(authCtx.authStatus),
      sessionInfo: JSON.stringify(authCtx.sessionInfo)
    })
  }, [authCtx.attrInfo, authCtx.authStatus, authCtx.sessionInfo])

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col xs={12} md={6}>
          <p>{currentUser.attrInfo}</p>
          <p>{currentUser.authStatus}</p>
          <p>{currentUser.attrInfo}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage